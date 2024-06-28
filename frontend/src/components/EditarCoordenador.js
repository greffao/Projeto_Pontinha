import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom/dist';
import { AuthContext } from "../context/auth";
import axios from "axios";

const EditarCoordenador = ({ coordenador, onVoltarClick }) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
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

    const handleSenhaConfirmadaChange = (e) => {
        setSenhaConfirmada(e.target.value);
    };

    const validarSenha = (senha) => {
        // Critérios de validação de senha
        if (senha.length < 8) {
            return false; // Senha precisa ter pelo menos 8 caracteres
        }
    
        // Verifica se há pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial
        const regexMaiuscula = /[A-Z]/;
        const regexMinuscula = /[a-z]/;
        const regexNumero = /[0-9]/;
        const regexEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/; // Exemplo de caracteres especiais, você pode ajustar conforme necessário
    
        if (!regexMaiuscula.test(senha)) {
            return false; // Senha precisa conter pelo menos uma letra maiúscula
        }
    
        if (!regexMinuscula.test(senha)) {
            return false; // Senha precisa conter pelo menos uma letra minúscula
        }
    
        if (!regexNumero.test(senha)) {
            return false; // Senha precisa conter pelo menos um número
        }
    
        if (!regexEspecial.test(senha)) {
            return false; // Senha precisa conter pelo menos um caractere especial
        }
    
        return true; // A senha atende a todos os critérios
    };

    const handleSalvar = () => {
        if (login && senha) {
            if (!validarSenha(senha)) {
                alert('A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'); // Mensagem com os requisitos da senha
                return;
            }

            if(senha != senhaConfirmada) {
                alert('Digite a mesma senha duas vezes!');
                return;
            }

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
                <input
                    type="password"
                    value={senhaConfirmada}
                    onChange={handleSenhaConfirmadaChange}
                    placeholder="Confirme sua senha"
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
