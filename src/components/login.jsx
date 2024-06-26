import React, { useState, useContext, useEffect} from 'react'
import { BoxContext } from "../context-providers/BoxContext";
import { API_ENDPOINT } from '../utils';
import './css/login.css';

const Login = () => {
  const [userName, setUser] = useState('')
  const [userError, setUserError] = useState('')
  const {goToPage, setItems, addBoxes} = useContext(BoxContext)

  useEffect(() => {
    localStorage.clear()
  }); 


  const onButtonClick = () => {
    setUserError('')
  
    if ('' === userName) {
      setUserError('Please enter your username')
      return
    }

    // retrieve the items from the server
    fetch (`${API_ENDPOINT}/entry/${userName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Network response was not ok: status ${response.status}`)
      })
      .then((data) => {
        localStorage.setItem('clientId', userName)
        setItems(data.items)
        addBoxes(data.items.length)
        goToPage('AddItems')
      })
      .catch((error) => { 
        setUserError('Please enter your username')
        console.error('There has been a problem with your fetch operation:', error) }
      )
    }
  
  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={userName}
          placeholder="Enter your username here"
          onChange={(ev) => setUser(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{userError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login