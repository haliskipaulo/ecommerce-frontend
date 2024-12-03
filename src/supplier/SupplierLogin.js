import React, { useState } from 'react';
import axios from 'axios';
import './Supplier.css';

const SupplierLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/suppliers/login',
        formData,{
          headers:{
            'Content-Type':'application/json'
          }
        });

      const token = response.data.Token;

      localStorage.setItem('authToken', token);

      if(response.status === 200){
        setResponseMessage('Login efetuado com sucesso!');
      }
      else{
        setResponseMessage('Erro ao efetuar login.');
      }
    } catch (error) {
      setResponseMessage('Failed to connect to server.');
    }
  };

  return (
    <div className="login-user-form">
      <h3>Entre como um fornecedor</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <label>Email:</label>
          <input 
            className="form-control input-narrow"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            className="form-control input-narrow"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Entrar</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );

};

export default SupplierLogin;