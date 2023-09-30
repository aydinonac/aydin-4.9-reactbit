import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Categories from './Categories'

const BASE_API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/items"

// All of the edit functions for Admin only. Users should only be able to select and/or purchase

export default function Items() {
  const {state} = useLocation();
  const {selectedCat, selectedName} = state;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category_id, setCategory_id] = useState(selectedCat)
  const [selectItem, setSelectItem] = useState(null)
  const [purchaseItem, setPurchaseItem] = useState(false)
  const [catItems, setCatItems] = useState([])
  console.log(selectedCat)
  console.log(selectedName)
  //hydrate = brings in data, makes available to be rendered in browser (like displaying in console)//
  useEffect(() => {
      fetchItems()
  }, [])

// fetch and filter items related to specific category
  const fetchItems = async() => { 
    const response = await fetch(BASE_API_ENDPOINT)
    const data = await response.json()
    setCatItems(data.filter(findCat))
    // setItems(data)
  }
  console.log(items)
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
    console.log(response)
    if (response.ok) {
      fetchItems()
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
    if (response.ok) {fetchItems()}
  }

  const handleUpdate = async() => {
    if (!editItem) return;
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
      setEditItem(false)
      }
  }

  return(
    <div>
      <h1>Category {selectedCat} : {selectedName}</h1>
      <form>
        <label>Enter the name:
          <input
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {/* <label>Enter category id number:
          <input
            type="text" 
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </label> */}
        <label>Enter the price:
          <input
            type="text" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>Enter description:
          <input
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </form>
      {/* todo...edit other details */}

      {editItem? <button onClick={handleUpdate}>Update</button> : <button onClick={handleCreate}>Create</button>}
      
      <ul>
        {catItems.map(item => (
          <li>{item.name + " (Category_id:  " +  item.category_id + ") "}
          <button onClick = {() => handleSelect(item.id)}>Select</button>
          <button onClick = {() => handleDelete(item.id)}>Delete</button>
          <button onClick = {() => handlePurchase(item.id)}>Purchase</button>
          <button onClick = {() => {
            setName(item.name)
            setPrice(item.price)
            setDescription(item.description)
            // setCategoryId(item.category_id)
            setEditItem(item)
          }}>Edit Item</button>
          </li>
        ))}
      </ul>
      <button onClick={() => {navigate('/');}}>Back</button> 
    </div>
  )
}
