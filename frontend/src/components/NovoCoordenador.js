import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom/dist';
import { AuthContext } from "../context/auth";
import axios from "axios";

const NovoCoordenador = ({ adicionarCoordenador }) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const { user } = useContext(AuthContext); // pegar usuário atual
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };

    const handleCancelar = () => {
        navigate("/gerenciamento-coordenadores");
    }

    const handleCriarCoordenador = () => {
        if (login && senha) { // Verifica se ambos login e senha não estão vazios
            const novoCoordenador = {
                // id: coordenadores.length + 1, // Atribui um novo ID baseado no comprimento do array
                login: login,
                senha: senha,
            };
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
            .post(`http://localhost:4242/auth/register`, novoCoordenador, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                // isso foi algo que tentei, não funcionou direito, mas agora meio que tá funcionando sim
                // quero entender como rola, mas por enquanto deixa quieto
                const adicionarCoordenador = location.state?.adicionarCoordenador;
                if (adicionarCoordenador) {
                    adicionarCoordenador(novoCoordenador);
                }
                alert("Coordenador adicionado com sucesso:", res.data);
                navigate("/gerenciamento-coordenadores");
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
            alert('Por favor, insira o login e a senha para o coordenador.'); // Alerta se os campos estiverem vazios
        }
    };

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1 className="titulo-coordenadores">Novo Coordenador</h1>
                <input
                    type="text"
                    value={login}
                    onChange={handleLoginChange}
                    placeholder="Login do Coordenador"
                    className="input-coordenador"
                />
                <input
                    type="password"
                    value={senha}
                    onChange={handleSenhaChange}
                    placeholder="Senha do Coordenador"
                    className="input-coordenador"
                />
                <Link to='/gerenciamento-coordenadores'>
                    <div className='botao-canto'>
                        <button onClick={handleCancelar}>Cancelar</button>
                    </div>
                </Link>
                <div className='botao-nav'>
                    <button onClick={handleCriarCoordenador}>Criar Novo Coordenador</button>
                </div>
            </div>
        </div>
    );
}

export default NovoCoordenador;
