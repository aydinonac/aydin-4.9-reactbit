import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const REG_API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/"

function Register_Login() {
  const [users, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async() => {
    const response = await fetch(REG_API_ENDPOINT)
    const data = await response.json()
    setUsers(data)
  }

  const handleRegister = async() => {
    const response = await fetch(REG_API_ENDPOINT, {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({
          email,
          pwd
        })
    })
    console.log(response)
    if (response.ok) {
      fetchUsers()
    }
  }
  
  const handleLogin = async() => {}

  return (
    <div>
      <button onClick={handleCreate}
        style={{margin: "10px", border: "2px solid blue", color: "white", background: "dodgerblue", padding: "5px"}}>
        Click after entering datails above:</button>
        
      <form>

        <label style={{margin: "10px"}} >Enter your email:{"......."}
          <input
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br/>
        </label>

        <label style={{margin: "10px"}} >Enter your password: {"...."}
          <input
            type="text" 
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          /><br/>
        </label>

      </form>

    </div>
  )
}

