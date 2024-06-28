import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom/dist';
import EditarCoordenador from './EditarCoordenador'; // Importar o componente de edição
import { AuthContext } from "../context/auth";
import axios from "axios";

const GerenciamentoCoordenadores = ({ onVoltarClick, onNovoCoordenador}) => {
    const { user } = useContext(AuthContext); // pegar usuário atual
    const [coordenadoresLocais, setCoordenadoresLocais] = useState([]);
    const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(null);
    const token = user?.token || localStorage.getItem("user")?.token; // Recuperar token do localStorage
    


    useEffect(() => {
        // Verificar se token está disponível
        if(!token) {
            alert("Usuário não autenticado.");
            return;
        }

        axios
        .get("http://localhost:4242/api/coordenador/coordenador", {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then((res) => {
        setCoordenadoresLocais(res.data);
        })
        .catch((error) => console.error(error));
    }, []);

    const excluirCoordenador = (coordenadorLogin) => {
        if(coordenadorLogin == "admin") {
            alert("Root admin não pode ser excluído.");
            return;
        }

        if(coordenadorLogin == user.username){
            alert("Você não pode se excluir!");
            return;
        }

        // Verificar se token está disponível
        if(!token) {
            alert("Usuário não autenticado.");
            return;
        }

        // Mostrar pop-up de confirmação
        const confirmacao = window.confirm("Tem certeza que deseja excluir este coordenador?");

        if (!confirmacao) {
            return; // Se o usuário clicar em "Cancelar", interrompe a execução
        }

        axios
        .delete(`http://localhost:4242/api/coordenador/coordenador/${coordenadorLogin}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log("Coordenador excluído com sucesso:", res.data);
            setCoordenadoresLocais(coordenadoresLocais.filter((coordenador) => coordenador.login !== coordenadorLogin));
        })
        .catch((error) => console.error(error));
    };


    if (coordenadorSelecionado) {
        return (
            <EditarCoordenador
                coordenador={coordenadorSelecionado}
                onVoltarClick={() => setCoordenadorSelecionado(null)}
            />
        );
    }

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1>Coordenadores</h1>
                <div className='lista-coordenadores'>
                    {coordenadoresLocais.map((coordenador) => (
                        <div key={coordenador.cod} className="coordenador-container">
                            <span>{coordenador.login}</span>
                            <div>
                                <button style={{ marginRight: '15px' }} onClick={() => setCoordenadorSelecionado(coordenador)}>Editar</button>
                                <button onClick={() => excluirCoordenador(coordenador.login)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to='/gerenciamento'>
                    <div className='botao-canto'>
                        <button onClick={onVoltarClick}>Voltar</button>
                    </div>
                </Link>
                <Link to='/novo-coordenador'>
                    <div className='botao-nav'>
                        <button onClick={onNovoCoordenador}>Novo Coordenador</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default GerenciamentoCoordenadores;
