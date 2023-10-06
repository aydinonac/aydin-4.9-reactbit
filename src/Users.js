import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './Users.css';

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
      <span className='usSpan1'><b>Users: </b></span>   
      <button  className='usButton1'
        onClick={() => {navigate('/');}}>Back</button> 
      <ul className='usUl1'>
        {users.map(user => (
          <li><span className='usSpan2'>{user.firstName} {user.lasttName}, {user.address}, {user.email}, {user.pwd}, {user.tel}</span>
            <span>
              <button  className='usButton3' onClick = {() => handleDelete(user.id)}>Delete</button>
              <button  className='usButton3' onClick = {() => {
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
      {editUser? <button onClick={handleUpdate} className='usButton2'>
        Update the details below then <b>CLICK</b>  this button to edit this User:</button> 
        : <button onClick={handleCreate} className='usButton2'>
        Put the details below then <b>CLICK</b> this button to add a new User:</button>}

      <form className='usButton2'>
        
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