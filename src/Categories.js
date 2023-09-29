import React, {useState, useEffect} from 'react';
import Items from './Items'
import { useParams, useNavigate } from 'react-router-dom';

const API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/categories"
const BASE_API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com"

function Categories() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [editCategory, setEditCategory] = useState(null)
  const [name, setName] = useState('')
  const [selectCategory, setSelectCategory] = useState(null)
  const navigate = useNavigate();
   
  // hydrate = brings in data, makes available to be rendered in browser (like displaying in console)//
  useEffect(() => {
      fetchCategories()
  }, [])

  const fetchCategories = async() => {
    const response = await fetch(API_ENDPOINT)
    const data = await response.json()
    setCategories(data)
  }

  const handleCreate = async() => {
    const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({name})
    })
    if (response.ok) {
        fetchCategories()
        setName("")
        setEditCategory(null)
    }
  }

  const handleDelete = async(categoryId) => {
    const response = await fetch(`${API_ENDPOINT}/${categoryId}`,{
        method: "DELETE"
    })
    if (response.ok) {fetchCategories()}
  }

  const handleUpdate = async() => {
    if (!editCategory) return;
    const response = await fetch(`${API_ENDPOINT}/${editCategory.id}`, {
        method: "PUT",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({name})
    })
  if (response.ok) {
    fetchCategories()
    setName("")
    setEditCategory(null)
    }
  }
  // To be done...go to Items component with parameter of category.id
  const handleSelect = (categoryId) => {
    
    console.log("category_id", categoryId)
      
  //     const response = await fetch(`${BASE_API_ENDPOINT}/items/${categoryId}`)
  //     const data = await response.json()
  //     console.log("data", data)
  //     if (response.ok) {setItems(data)}
  //     console.log(items)
    }

    return(
      <div>
        <h1>Categories CRUD</h1>
        <input 
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            placeholder = "CategoryName"
        />

        {editCategory? <button onClick={handleUpdate}>Update</button> : <button onClick={handleCreate}>Create</button>}
          
        <ul>
          {categories.map(category => (
            <li>{category.name}
        <button onClick={() => {navigate('/items');}}>Select</button> 
        <button onClick = {() => handleDelete(category.id)}>Delete</button>
            <button onClick = {() => {
                setName(category.name)
                setEditCategory(category)
            } }>Edit Category</button>
            </li>
          ))}
        </ul>
      </div>
    )
}
export default Categories