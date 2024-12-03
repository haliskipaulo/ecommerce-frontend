import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products/allproducts');
      setProducts(response.data);
    } catch (error) {
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setResponseMessage("Você precisa estar logado ");
        return;
      }

      const item = {
        productId: productId,
        quantity: 1,
      };

      const response = await axios.post("http://localhost:8080/carts/add/", item, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert('Produto adicionado com sucesso');
      } else {
        console.error(response);
        alert('Erro ao adicionar ao carrinho');
      }

    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
    }

  };

  return (
    <div className="all-products">
      <h3>Produtos</h3>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
              <p><strong>Estoque:</strong> {product.stock}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllProducts;