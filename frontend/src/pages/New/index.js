import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {
  const [thumbnail, setthumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => (thumbnail ? URL.createObjectURL(thumbnail) : null),

    [thumbnail]);

  async function handSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id },
    });
    history.push('/dashboard');
  }

  return (
    <form onSubmit={handSubmit}>
      <label
        id="tumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumnail' : ''}
      >
        <input type="file" onChange={(event) => setthumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />

      </label>
      <label htmlFor="company">Company</label>
      <input
        id="company"
        placeholder="incredible company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />

      <label htmlFor="techs">Techs</label>
      <input
        id="techs"
        placeholder="Techs used in the company"
        value={techs}
        onChange={(event) => setTechs(event.target.value)}
      />

      <label htmlFor="price">Price</label>
      <input
        id="price"
        placeholder="Techs used in the company"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">Register</button>

    </form>

  );
}
