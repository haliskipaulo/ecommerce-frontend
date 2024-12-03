import React, { useState } from 'react';
import './App.css';
import UserAccountForm from './register/UserAccountForm';
import ProductDataForm from './product/ProductDataForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './login/LoginForm';
import SupplierLogin from './supplier/SupplierLogin';
import SupplierRegister from './supplier/SupplierRegister';


function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    window.location.href = '/';
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Landing Page</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('createAccount')}>Criar conta</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('login')}>Login</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('logout')}>Sair</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('produtos')}>Produtos</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('supplierRegister')}>Cadastro de fornecedor</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('supplierLogin')}>Login de fornecedor</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container text-center mt-5">
        {currentPage === 'landing' && (
          <div>
            <h1 className="display-4">Segundo Bimestre</h1>
            <h2 className="display-4">Front-end Ecommerce</h2>
          </div>
        )}

        {currentPage === 'createAccount' && (
          <div className="mt-4">
            <UserAccountForm />
          </div>
        )}

        {currentPage === 'login' && (
          <div className="mt-4">
            <LoginForm />
          </div>
        )}

        {currentPage === 'logout' && (
          <div className="mt-4">
            <h2>Logout</h2>
              <p>Você tem certeza que deseja sair?</p>
              <button onClick={handleLogout} className="btn btn-danger mt-3">
                Confirmar Logout
            </button>
          </div>
        )}

        {currentPage === 'produtos' && (
          <div className="mt-4">
            <ProductDataForm/>
          </div>
        )}

        {currentPage === 'supplierRegister' && (
          <div className="mt-4">
            <SupplierRegister />
          </div>
        )}

        {currentPage === 'supplierLogin' && (
          <div className="mt-4">
            <SupplierLogin />
          </div>
        )}

      </div>


    </div>
  );
}

export default App;
