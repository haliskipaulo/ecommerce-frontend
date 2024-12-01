import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './ProductDataForm.css';

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        price:'',
        stock:''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [updateData, setUpdateData] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
    });
    const [showProducts, setShowProducts] = useState(false);
    const [error, setError] = useState('');
    //criar um objeto para busca de produtos pelo ID

    //Tratar o evento change dos campos do form
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeUpdate = async (e) => {
        const { name, value } = e.target;
        setUpdateData({
            ...updateData,
            [name]: value,
        });
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:8080/products/deleteproduct/${formData.id}`);

            if (response.status === 200) {
                setResponseMessage('Produto deletado com sucesso!');
                
                fetchProducts();
            } else {
                setResponseMessage('Erro ao deletar o produto.');
            }
        } catch (error) {
            setResponseMessage('Erro ao deletar o produto.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/products/updateproduct/${updateData.id}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.status === 200) {
                setResponseMessage('Produto atualizado com sucesso!');
                // Opcional: atualizar a lista de produtos
                fetchProducts();
            } else {
                setResponseMessage('Erro ao atualizar o produto.');
            }

        }
        catch (error) {
            setResponseMessage('Erro ao atualizar o produto.');
        }
    };

    //Tratar o salvar / grava dados
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/products/newproduct',
                formData,{
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
            if(response.status === 200){
                setResponseMessage('Produto salvo com sucesso!');
            }
            else{
                setResponseMessage('Erro ao salvar o produto.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar ao servidor');
        }

    };

    const handleClear = () =>{
        setFormData({
            name:'',
            description:'',
            price:'',
            stock:''
        });
        setResponseMessage('');
    };



    const handleSearch = async () =>{
        try {
            const response = await axios.get(`http://localhost:8080/products/${formData.id}`);
            setProducts([response.data]);
            if (response.status === 200) {
                const product = response.data;
                
                setFormData({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                });

                setResponseMessage('Produto encontrado!');
            } else {
                setResponseMessage('Produto não encontrado.');
            }
        } catch (error) {
            setError('Erro ao buscar produto');
        }
    };

    const fetchProducts = async () =>{
        try {
            const response = await axios.get('http://localhost:8080/products/allproducts');
            setProducts(response.data);
            setShowProducts(true);
        } catch (error) {
            setError('Erro ao carregar produtos');
        }
    };

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


    // Cadastrar produto
    // Ver todos os produtos
    // Atualizar produto
    // Deletar produto

    return (
        <div>
            <div className = "user-account-form">
                <h2>Cadastro de Produtos</h2>
                <form onSubmit={handleSave} className="form-group">
                    <div>
                        <label>Nome do produto:</label>
                        <input
                            className="form-control input-narrow"
                            type = "text"
                            name = "name"
                            value={formData.name}
                            onChange={handleChange}
                            required>
                        </input>
                    </div>

                    <div>
                        <label>Descrição:</label>
                        <input
                            className="form-control input-narrow"
                            type = "text"
                            name = "description"
                            value={formData.description}
                            onChange={handleChange}
                            required>
                        </input>
                    </div>

                    <div>
                        <label>Preço:</label>
                        <input
                            className="form-control input-narrow"
                            type = "number"
                            name = "price"
                            value={formData.price}
                            onChange={handleChange}
                            required>
                        </input>
                    </div>

                    <div>
                        <label>Estoque:</label>
                        <input
                            className="form-control input-narrow"
                            type = "number"
                            name = "stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required>
                        </input>
                    </div>
                    <div>
                        <button type="submit" className = "btn btn-primary btn-block mt-3" onClick={handleSave}>Salvar</button>
                        <button type="button" className = "btn btn-secondary btn-block mt-3" onClick = {handleClear}>Limpar</button>

                    </div>  
                </form>
            </div>
            <br></br>
            <br></br>
            <div className="user-account-form">
                <h2>Ver produtos</h2>
                <button type="button" className = "btn btn-primary btn-block mt-3" onClick={fetchProducts}>Listar produtos</button>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Estoque</th>
                                <th>Preço</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-sucess"
                                            onClick={() => handleCart(product.id)}
                                        > Adicionar ao carrinho</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="user-account-form" onSubmit={handleUpdate}>
                <h2>Atualizar Produto</h2>
                <form className="form-group"> 
                    <div>
                        <label>Id do produto:</label>
                        <input
                            className="form-control input-narrow"
                            type = "number"
                            name = "id"
                            value={updateData.id}
                            onChange={handleChangeUpdate}
                            required
                        />
                    </div>
                    <div>
                        <label>Nome do produto:</label>
                        <input
                            className="form-control input-narrow"
                            type = "text"
                            name = "name"
                            value={updateData.name}
                            onChange={handleChangeUpdate}
                            required
                        />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <input
                            className="form-control input-narrow"
                            type = "text"
                            name = "description"
                            value={updateData.description}
                            onChange={handleChangeUpdate}
                            required
                        />
                    </div>
                    <div>
                        <label>Preço:</label>
                        <input
                            className="form-control input-narrow"
                            type = "number"
                            name = "price"
                            value={updateData.price}
                            onChange={handleChangeUpdate}
                            required
                        />
                    </div>
                    <div>
                        <label>Estoque:</label>
                        <input
                            className="form-control input-narrow"
                            type = "number"
                            name = "stock"
                            value={updateData.stock}
                            onChange={handleChangeUpdate}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary mt-3">Modificar produto</button>
                    </div>
                </form>

            </div>
            <br></br>
            <br></br>
            <div className="user-account-form" onSubmit={handleDelete}>
                <h2>Deletar Produto</h2>
                <form className="form-group">
                    <div>
                        <label>Id do produto:</label>
                        <input
                            className="form-control input-narrow"
                            type = "number"
                            name = "id"
                            value={formData.id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-danger mt-3">Deletar produto</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ProductDataForm;