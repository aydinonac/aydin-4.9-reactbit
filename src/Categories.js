import React, {useState, useEffect} from 'react';
import Items from './Items'
import { useParams, useNavigate } from 'react-router-dom';
import './Categories.css';

const API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/categories"
const BASE_API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/items"

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

  return(
    <div style = {{background: "skyblue"}}>
      <div>
        {/* Heading */}
        <br/>
        <span className="catSpan1"><b>Market-place</b></span>   
        <button className="catButton1"
          onClick={() => {navigate('/users');}}>Go to Users</button> 
        <p className='catP1'>
          Welcome to Market-place - the perfect place for all your 'Pet' shopping needs.
          We hope that you will find exactly what you are looking for.
          All of our products are top quality with very competitive prices and discounts.
          Just select a category, below, and you can browse through our range of items.
          Happy shopping!</p>
      </div>

      <div>
        {/* Bee section */}
        <h1 className='catH1'>Bee Categories</h1>
        <ul className='catUl1'>
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
              <hr></hr>
            </li>
            
          ))}
        </ul>
        <br/>
        <span className='catSpan2'>
          Add or update a category
          <input
            style={{margin: "10px", fontSize: "15px"}} 
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            placeholder = "CategoryName"
          />
        
        {editCategory? <button onClick={handleUpdate}>Update</button> : <button onClick={handleCreate}>Create</button>}
        </span>
      </div>

      <div>
        {/* Dog section */}
        <h1 className='catH1'>Dog Categories 
          <span className='catSpan3'>({"....."} To be done)</span></h1>
       
        <h1 className='catH1'>Bird Categories
          <span className='catSpan3'>({"....."} To be done)</span></h1>
        
        <h1 className='catH1'>Cat Categories
          <span className='catSpan3'>({"....."} To be done)</span></h1>
       
        <h1 className='catH1'>Hedge-hog Categories
         <span className='catSpan3'>({"....."} To be done)</span></h1>  
      </div>
    </div> 
  )
}
export default Categories