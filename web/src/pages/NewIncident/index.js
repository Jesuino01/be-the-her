import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  
  const history = useHistory()

  const ongId = localStorage.getItem('ongId')

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile')
    } catch (error) {
      alert('Erro ao cadastrar novo incidente, tente novamente!')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para a home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Título do caso" 
          />
          <textarea
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Descrição"
          />
          <input
            value={value} 
            onChange={e => setValue(e.target.value)} 
            placeholder="Valor em reais"
          />

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}