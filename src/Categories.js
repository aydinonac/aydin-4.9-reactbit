import React, {useState, useEffect} from 'react';
import Items from './Items'
import { useParams, useNavigate } from 'react-router-dom';

const API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/categories"
const BASE_API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/items"

function Categories() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [editCategory, setEditCategory] = useState(false)
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

    return(
      <div style = {{background: "skyblue"}}>
        <h1 style={{color: "blue", padding: "10px"}}>BeeBuy Categories</h1>
 
        <ul style={{border: "2px solid maroon",  background: "lightgreen", padding: "5px", margin: "10px"}}>
          {categories.map(category => (
            <li><span style={{color: "blue", fontSize: "25px"}}>{category.name}</span>
              <button style={{margin: "5px"}} onClick={() => {navigate('/items', {
              state: {selectedCat: category.id, selectedName: category.name}
                });
              }}>Select</button> 
              <button style={{margin: "5px"}} onClick = {() => handleDelete(category.id)}>Delete</button>
              <button style={{margin: "5px"}} onClick = {() => {
                setName(category.name)
                setEditCategory(category)
              }}>Edit Category</button>
            </li>
          ))}
        </ul>
        <br/>
        <p style={{margin: "10px", border: "2px solid blue", color: "white", background: "dodgerblue", padding: '5px'}}>
          Complete the details below to add or update a category</p>
          <input
            style={{margin: "10px", fontSize: "15px"}} 
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            placeholder = "CategoryName"
        />

        {editCategory? <button onClick={handleUpdate}>Update</button> : <button onClick={handleCreate}>Create</button>}
         
      </div>
    )
}
export default Categories