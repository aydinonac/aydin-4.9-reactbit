import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Categories from './Categories'
import './Items.css';

const BASE_API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/items"

// All of the edit functions for Admin only. Users should only be able to select and/or purchase

export default function Items() {
  const {state} = useLocation();
  const {selectedCat, selectedName} = state;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category_id, setCategory_id] = useState(selectedCat)
  const [selectItem, setSelectItem] = useState(null)
  const [purchaseItem, setPurchaseItem] = useState(false)
  const [catItems, setCatItems] = useState([])
 
  //hydrate = brings in data, makes available to be rendered in browser (like displaying in console)//
  useEffect(() => {
      fetchItems()
  }, [])

// fetch and filter items related to specific category
  const fetchItems = async() => { 
    const response = await fetch(BASE_API_ENDPOINT)
    const data = await response.json()
    setCatItems(data.filter(findCat))
  }
  const findCat = (cat) => {
    return cat.category_id === selectedCat
  }

  const handleCreate = async() => {
    const response = await fetch(BASE_API_ENDPOINT, {
      method: "POST",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({
        name,
        price,
        description,
        category_id 
      })
    })
    if (response.ok) {
      fetchItems()
      setEditItem(null)
    }
  }
// To be done...show different views...
  const handleSelect = async(categoryId) => {}

// To be done...payment system???...
  const handlePurchase = async(categoryId) => {}

  const handleDelete = async(itemId) => {
    const response = await fetch(`${BASE_API_ENDPOINT}/${itemId}`,{
      method: "DELETE"
    })
    console.log(itemId)
    if (response.ok) {fetchItems()}
  }

  const handleUpdate = async() => {
    if (!editItem) return;
    console.log(name);
    const response = await fetch(`${BASE_API_ENDPOINT}/${editItem.id}`, {
      method: "PUT",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({
        name,
        price,
        description,
        category_id
      })
    })
    if (response.ok) {
      fetchItems()
      setName('')
      setPrice('')
      setDescription('')
      setCategory_id('')
      setEditItem(null)
    }
  }

  return(
    <div style = {{background: "skyblue"}}><br/>
      <span className='itSpan1'><b>Bee: {selectedName}</b></span>   
      <button className='itButton1' onClick={() => {navigate('/');}}>Back</button> 
      <ul className='itUl1'>
         {catItems.map(item => (
          <li><span className='itSpan2'>{item.name}</span><br/><span>{item.description}</span>
            <p><button style={{margin: "10px"}} onClick = {() => handleSelect(item.id)}>Select</button>
            <button  style={{margin: "10px"}} onClick = {() => handleDelete(item.id)}>Delete</button>
            <button  style={{margin: "10px"}} onClick = {() => {
              setName(item.name)
              setPrice(item.price)
              setDescription(item.description)
              setCategory_id(item.category_id)
              setEditItem(item)
            }}>Edit Item</button>
            <button  style={{margin: "10px"}} onClick = {() => handlePurchase(item.id)}>Purchase</button>
            </p>
          </li>
        ))}
      </ul>
      <br/>

      <form className='itForm1'>
        
        <label style={{margin: "10px"}} >Enter the name:{"......... "}
          <input style={{width: "300px"}}
            type="STRING" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br/>
        </label>

        <label style={{margin: "10px"}} >Enter the price: {".........."}
          <input style={{width: "300px"}}
            type="DECIMAL(10,2)" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          /><br/>
        </label>
       
        <label style={{margin: "10px"}} >Enter the description:{" "}
          <input style={{width: "300px"}}
            type="TEXT" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

      </form>

      {editItem? <button onClick={handleUpdate} className='itButton2'>
        Update the details above then <b>CLICK</b> this button to edit this item:</button> 
        : <button onClick={handleCreate} className='itButton2'>
        Complete the details above then <b>CLICK</b> this button to add a new item:</button>}
    </div>
  )
}