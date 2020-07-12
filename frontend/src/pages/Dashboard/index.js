import React, {useEffect , useState} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom'
import './styles.css';

export default function Dashboard(){
  const [spots, setSpots] = useState([]) 

  useEffect(() =>{
    async function loadSpots(){
      const user_id = localStorage.getItem('user')
      const response = await api.get('/dashboard', {
        headers: {user_id}
      })
      
      setSpots(response.data)

    }
    loadSpots();
  }, [])



  return (
    <>
    <ul className="spot-list">
      {spots.map(spot => (
        <li key={spot._id}>
          <header style = {{ background: `url(${spot.thumbnail_url})`}}/>
          <strong>{spot.company}</strong>
          <span>{spot.price ? `$ ${spot.price}/Day`: `Free`}</span>
        </li>
      ))}

    </ul>
    <Link to = "/new"> 
    <button className="btn">Register new spot</button>


    </Link>
    </>
  )
}