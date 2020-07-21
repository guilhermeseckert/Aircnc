import React, { useEffect, useState,  useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import socketio from 'socket.io-client';
import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [request, setRequest] = useState([])

  const user_id = localStorage.getItem('user');
  const socket = useMemo(() =>socketio('http://localhost:3333', {
    query:{ user_id}
  }), [user_id]);

  useEffect(()=>{
   
    socket.on('booking_request', data =>{
      setRequest({...request, data})
    })
   
  }, [request, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id },
      });

      setSpots(response.data);
    }
    loadSpots();
  }, []);

  return (
    <>
    <ul className = "notifications">
      {request.map (request => (
        <li key={request._id}>
          <p>
      <strong>{request.user.email}</strong> request a spot <strong>{request. spot.company}</strong> data : {request.date}
          </p>
          <button>Acept</button>
          <button>Reject</button>

        </li>
      ))}
    </ul>
      <ul className="spot-list">
        {spots.map((spot) => (
          <li key={spot._id}>
            <header style={{ background: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `$ ${spot.price}/Day` : 'Free'}</span>
          </li>
        ))}

      </ul>
      <Link to="/new">
        <button className="btn">Register new spot</button>

      </Link>
    </>
  );
}
