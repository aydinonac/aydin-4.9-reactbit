import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/items"

// All of the edit functions for Admin only. Users should only be able to select and/or purchase

export default function Items(selectedCat) {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [editItem, setEditItem] = useState({})
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category_id, setCategory_id] = useState('')
    const [selectItem, setSelectItem] = useState(null)
    const [purchaseItem, setPurchaseItem] = useState(false)
    const [catItems, setCatItems] = useState([])

    //hydrate = brings in data, makes available to be rendered in browser (like displaying in console)//
    useEffect(() => {
        fetchItems()
    }, [])

// todo...only want items related to specific category
    const fetchItems = async() => { 
      const response = await fetch(BASE_API_ENDPOINT)
      const data = await response.json()
      setItems(data)
      console.log([items])
      setCatItems(items.filter(findCat))
      function findCat(cat) {
        return (
          cat.category_id === 7
        )}
      console.log([catItems])
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
            setName("")
            setEditItem({})
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
        setName("")
        setEditItem(null)
        }
    }

    return(
        <div>
            <h1>Items CRUD</h1>
            <input 
                value = {name}
                onChange = {(e) => setName(e.target.value)}
                placeholder = "Item Name"/>
            {/* todo...edit other details */}

            {setEditItem? <button onClick={handleUpdate}>Update</button> : <button onClick={handleCreate}>Create</button>}
            
            <ul>
                {catItems.map(item => (
                    <li>{item.name + " (Category:  " +  item.category_id + ") "}
                    <button onClick = {() => handleSelect(item.id)}>Select</button>
                    <button onClick = {() => handleDelete(item.id)}>Delete</button>
                    <button onClick = {() => handlePurchase(item.id)}>Purchase</button>
                    <button onClick = {() => {
                        setName(item.name)
                        setPrice(item.price)
                        setDescription(item.description)
                        setCategory_id(item.category_id)
                        setEditItem(item)
                    } }>Edit Item</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => {navigate('/');}}>Back</button> 
        </div>
    )
}
