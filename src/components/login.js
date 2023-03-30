import {useState} from 'react'
import {Link} from 'react-router-dom'
import '../components/login.css'
import myImage from '../assets/bg.jpg';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event){
    event.preventDefault()
    const response = await fetch("https://mernsignup.herokuapp.com/login",{
      method: 'post',
    headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data =await response.json()
    if(data.user){
      localStorage.setItem('token', data.user)
      alert('Login successful')
      window.location.href='https://knowu-09.web.app'
    }else{      alert('Please check your uername and password')
  }
    console.log(data)
  }
  return (
    <div className="login">
      <div >
      <img className='photo' src={myImage}/>
      </div>
      <h1> LOGIN HERE </h1>
      <form onSubmit={loginUser} className="foram">
        <div className="username">
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/>
        </div>
        <div className="password">
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your Password"/>
        </div>
        <div className="btn">
        <button className='but' type="submit">Log in</button>
        </div>
            {/* <Link to="/register"> */}
        <h2>Don't have an account?</h2>
            {/* </Link> */}
      </form>

    </div>
  );
}

export default Login;