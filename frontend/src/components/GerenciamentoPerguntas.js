import React, { useState, useContext } from 'react';
import NovaPergunta from './NovaPergunta';
import EditarPergunta from './EditarPergunta';
import { AuthContext } from "../context/auth";
import axios from "axios";

const GerenciamentoPerguntas = ({ clubeInicial, temaInicial, voltarAoTema }) => {
    const [onCriarPergunta, setCriarPergunta] = useState(null);
    const [onEditarPergunta, setEditarPergunta] = useState(null);
    const [perguntas, setPerguntas] = useState(temaInicial.perguntas); // Estado local para perguntas
    const { user } = useContext(AuthContext); // pegar usuário atual

    const handleNovaPergunta = tema => {
        setCriarPergunta(tema);
    }

    const handleEditarPergunta = pergunta => {
        setEditarPergunta(pergunta);
    }

    const atualizarPerguntas = (novasPerguntas) => {
        setPerguntas(novasPerguntas);
        temaInicial.perguntas = novasPerguntas; // Atualiza o tema inicial com as novas perguntas
    }

    const excluirPergunta = (perguntaId) => {
        // Recuperar token do localStorage
        const token = user?.token || localStorage.getItem("user")?.token;

        // Verificar se token está disponível
        if (!token) {
            alert("Usuário não autenticado.");
            return;
        }

        // Mostrar pop-up de confirmação
        const confirmacao = window.confirm("Tem certeza que deseja excluir esta pergunta?");

        if (!confirmacao) {
            return; // Se o usuário clicar em "Cancelar", interrompe a execução
        }

        const perguntasAtualizadas = perguntas.filter(pergunta => pergunta.cod !== perguntaId);
        atualizarPerguntas(perguntasAtualizadas); // Atualiza o estado local

        const temas = clubeInicial.temas.map(tema => tema.cod === temaInicial.cod ? { ...tema, perguntas: perguntasAtualizadas } : tema);
        const updatedClub = {
            cod: clubeInicial.cod,
            nome: clubeInicial.nome,
            imagem: clubeInicial.imagem,
            temas: temas,
        }

        axios
            .put(`http://localhost:4242/api/clube/${clubeInicial.cod}`, updatedClub, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                console.log("Pergunta excluída com sucesso:", res.data);
            })
            .catch((error) => console.error(error));
    }

    if (onCriarPergunta) {
        return <NovaPergunta onVoltarClick={() => setCriarPergunta(null)} tema={onCriarPergunta} clube={clubeInicial} atualizarPerguntas={atualizarPerguntas} />;
    }

    if (onEditarPergunta) {
        return <EditarPergunta onVoltarClick={() => setEditarPergunta(null)} pergunta={onEditarPergunta} tema={temaInicial} clube={clubeInicial} />;
    }

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1>Perguntas do Tema: {temaInicial.nome}</h1>
                <div className='lista-clubes'>
                    {perguntas.map((pergunta, index) => (
                        <div key={index} className="clube-container">
                            <span>Pergunta: {pergunta.questao}</span>
                            <button style={{ marginRight: '15px' }} onClick={() => handleEditarPergunta(pergunta)}>Editar</button>
                            <button onClick={() => excluirPergunta(pergunta.cod)}>Excluir</button>
                        </div>
                    ))}
                </div>

                <div className='botao-canto'>
                    <button onClick={voltarAoTema}>Voltar aos Temas</button>
                </div>
                <div className='botao-nav'>
                    <button onClick={() => handleNovaPergunta(temaInicial)}>Nova Pergunta</button>
                </div>
            </div>
        </div>
    );
};

export default GerenciamentoPerguntas;
