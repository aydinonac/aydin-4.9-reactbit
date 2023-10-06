import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const USERS_API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/users"

export default function Users() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lasttName, setLasttName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [tel, setTel] = useState(0)
  const [editUser, setEditUser] = useState(false)
  const navigate = useNavigate();
   
  // hydrate = brings in data, makes available to be rendered in browser (like displaying in console)//
  useEffect(() => {
      fetchUsers()
  }, [])

  const fetchUsers = async() => {
    const response = await fetch(USERS_API_ENDPOINT)
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }

  const handleCreate = async() => {
    const response = await fetch(USERS_API_ENDPOINT, {
      method: "POST",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({
        firstName,
        lasttName,
        address,
        email,
        pwd,
        tel
      })
    })
    console.log(response)
    if (response.ok) {
      fetchUsers()
      setFirstName('')
      setLasttName('')
      setAddress('')
      setEmail('')
      setPwd('')
      setTel(0)
      setEditUser(false)
    }
  }

  const handleDelete = async(userId) => {
    const response = await fetch(`${USERS_API_ENDPOINT}/${userId}`,{
      method: "DELETE"
    })
    if (response.ok) {fetchUsers()}
  }

  const handleUpdate = async() => {
    if (!editUser) return;
    const response = await fetch(`${USERS_API_ENDPOINT}/${editUser.id}`, {
      method: "PUT",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({
        firstName,
        lasttName,
        address,
        email,
        pwd,
        tel
      })
    })
    if (response.ok) {
      fetchUsers()
      setFirstName('')
      setLasttName('')
      setAddress('')
      setEmail('')
      setPwd('')
      setTel(0)
      setEditUser(false)
    }
  }

  return(
    <div style = {{background: "skyblue"}}><br/>
      <span style={{color: "blue", padding: "20px", fontSize: "35px"}}><b>Users: </b></span>   
      <button  style={{fontSize: "20px", background: "lightGreen", marginLeft: "305px"}}
        onClick={() => {navigate('/');}}>Back</button> 
      <ul style={{listStyleType: "none", border: "2px solid maroon",
        background: "#eedddd", padding: "5px", margin: "10px", fontFamily: "helvetica"}}>
        
        {users.map(user => (
          <li><span style={{lineHeight: "0.8", color: "darkblue", fontSize: "16px"}}>{user.firstName} {user.lasttName}, {user.address}, {user.email}, {user.pwd}, {user.tel}</span>
            <span>
              <button  style={{lineHeight: "0.8", margin: "10px"}} onClick = {() => handleDelete(user.id)}>Delete</button>
              <button  style={{lineHeight: "0.8", margin: "10px"}} onClick = {() => {
                setFirstName(user.firstName)
                setLasttName(user.lasttName)
                setAddress(user.address)
                setEmail(user.email)
                setPwd(user.pwd)
                setTel(user.tel)
                setEditUser(user)
              }}>Edit</button>
            </span>
            <hr></hr>
          </li>
        ))}
      </ul>
      <br/>
      {editUser? <button onClick={handleUpdate} 
        style={{fontSize: "16px", margin: "10px", border: "2px solid blue", color: "white", background: "dodgerblue", padding: "5px"}}>
        Update the details below then <b>CLICK</b>  this button to edit this User:</button> 
        : <button onClick={handleCreate}
        style={{fontSize: "16px", margin: "10px", border: "2px solid blue", color: "white", background: "dodgerblue", padding: "5px"}}>
        Put the details below then <b>CLICK</b> this button to add a new User:</button>}

      <form style={{fontFamily: "helvetica", border: "2px solid blue", color: "white", background: "dodgerblue", padding: "5px", margin: "10px"}}>
        
        <label style={{margin: "10px"}} >Enter firstName:{"........ "}
          <input style={{width: "300px"}}
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          /><br/>
        </label>
        
        <label style={{margin: "10px"}} >Enter lastName:{"........ "}
          <input style={{width: "300px"}}
            type="text" 
            value={lasttName}
            onChange={(e) => setLasttName(e.target.value)}
          /><br/>
        </label>
        
        <label style={{margin: "10px"}} >Enter address: {"..........."}
          <input style={{width: "300px"}}
            type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          /><br/>
        </label>
       
        <label style={{margin: "10px"}} >Enter email:{" "}{".............. "}
          <input style={{width: "300px"}}
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br/>
        </label>
       
        <label style={{margin: "10px"}} >Enter pwd:{" "}{"................ "}
          <input style={{width: "300px"}}
            type="text" 
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          /><br/>
        </label>
        
        <label style={{margin: "10px"}} >Enter tel:{" "}{"................... "}
          <input style={{width: "300px"}}
            type="integer" 
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </label>

      </form>
    </div>
  )
}