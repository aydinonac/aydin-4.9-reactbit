import React, {useState, useEffect} from 'react';

const API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/categories"


function App() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [name, setName] = useState('')

    //hydrate = brings in data, makes available to be rendered in browser (like displaying in console)//
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
            setSelectedCategory(null)
        }
    }

    const handleDelete = async(categoryId) => {
        const response = await fetch(`${API_ENDPOINT}/${categoryId}`,{
            method: "DELETE"
        })
        if (response.ok) {fetchCategories()}
    }

    const handleUpdate = async() => {
        if (!selectedCategory) return;
        const response = await fetch(`${API_ENDPOINT}/${selectedCategory.id}`, {
            method: "PUT",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({name})
        })
    if (response.ok) {
        fetchCategories()
        setName("")
        setSelectedCategory(null)
        }
    }

    return(
        <div>
            <h1>Categories CRUD</h1>
            <input 
                value = {name}
                onChange = {(e) => setName(e.target.value)}
                placeholder = "CategoryName"
            />

            {selectedCategory? <button onClick={handleUpdate}>Update</button> : <button onClick={handleCreate}>Create</button>}
            
            <ul>
                {categories.map(category => (
                    <li>{category.name}
                    <button onClick = {() => handleDelete(category.id)}>Delete</button>
                    <button onClick = {() => {
                        setName(category.name)
                        setSelectedCategory(category)
                    } }>Select</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default App