import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom/dist';
import { AuthContext } from "../context/auth";
import axios from "axios";

const EditarCoordenador = ({ coordenador, onVoltarClick }) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const { user } = useContext(AuthContext); // pegar usuário atual
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Tirei isso aqui para não mostrar qual o tamanho da senha
        if (coordenador) {
            setLogin(coordenador.login);
            // setSenha(coordenador.senha);
        }
    }, [coordenador]);

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };

    const handleSalvar = () => {
        if (login && senha) {
            const coordenadorEditado = { login, senha };

            setLogin(''); // Limpa o campo de entrada
            setSenha(''); // Limpa o campo de entrada

            // Recuperar token do localStorage
            const token = user?.token || localStorage.getItem("user")?.token;

            // Verificar se token está disponível
            if(!token) {
                alert("Usuário não autenticado.");
                return;
            }

            axios
            .put(`http://localhost:4242/api/coordenador/coordenador/${coordenador.login}`, coordenadorEditado, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                const adicionarCoordenador = location.state?.adicionarCoordenador;
                if (adicionarCoordenador) {
                    adicionarCoordenador(coordenadorEditado);
                }
                alert("Coordenador editado com sucesso:", res.data);
                onVoltarClick();
                navigate('/gerenciamento-coordenadores');
            })
            .catch((error) => {
                // pega mensagem do erro do backend e mostra se tiver
                if (error.response && error.response.data) {
                    alert(error.response.data);
                } else {
                    alert("Erro ao adicionar coordenador.");
                }
            });
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1 className="titulo-coordenadores">Editar Coordenador</h1>
                <input
                    type="text"
                    value={login}
                    onChange={handleLoginChange}
                    placeholder="Novo Login do Coordenador"
                    className="input-coordenador"
                />
                <input
                    type="password"
                    value={senha}
                    onChange={handleSenhaChange}
                    placeholder="Novo Senha do Coordenador"
                    className="input-coordenador"
                />
                <Link to='/gerenciamento-coordenadores'>
                    <div className='botao-canto'>
                        <button onClick={onVoltarClick}>Cancelar</button>
                    </div>
                </Link>
                <div className='botao-nav'>
                    <button onClick={handleSalvar}>Salvar</button>
                </div>
            </div>
        </div>
    );
}

export default EditarCoordenador;
