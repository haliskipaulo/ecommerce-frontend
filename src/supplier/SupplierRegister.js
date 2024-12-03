import React, { useState } from 'react';
import axios from 'axios';
import './Supplier.css';

const SupplierRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    cnpj: '',
    productType: '',
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
      const response = await axios.post('http://localhost:8080/suppliers/newsupplier',
        formData,{
          headers:{
            'Content-Type':'application/json'
          }
        });

      if(response.status === 200){
        setResponseMessage('Conta criada!');
      }
      else{
        setResponseMessage('Erro ao criar a conta.');
      }

    } catch (error) {
      setResponseMessage('Failed to connect to server.');
    }
  };

  return (
    <div className="user-account-form">
            <h3>Crie sua conta de fornecedor</h3>
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
                    <label>CNPJ:</label>
                    <input 
                        className="form-control input-narrow"
                        type="text" 
                        name="cnpj" 
                        value={formData.cnpj} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Tipo de produto:</label>
                    <input 
                        className="form-control input-narrow"
                        type="text" 
                        name="product_type" 
                        value={formData.product_type} 
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
                <button type="submit" className="btn btn-primary btn-block mt-3">Criar conta</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
  );
};

export default SupplierRegister;