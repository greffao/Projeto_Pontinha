import React, { useState } from 'react';
import NovaPergunta from './NovaPergunta';
import EditarPergunta from './EditarPergunta';

const GerenciamentoPerguntas = ({ temaInicial, voltarAoTema }) => {
    const [onCriarPergunta, setCriarPergunta] = useState(null);
    const [onEditarPergunta, setEditarPergunta] = useState(null);

    const handleNovaPergunta = tema => {
        setCriarPergunta(tema);
    }

    const handleEditarPergunta = pergunta => {
        setEditarPergunta(pergunta);
    }

    if(onCriarPergunta) {
        return <NovaPergunta onVoltarClick={() => setCriarPergunta(null)} tema={onCriarPergunta}/>;
    }

    if(onEditarPergunta) {
        // console.log(onEditarPergunta);
        return <EditarPergunta onVoltarClick={() => setEditarPergunta(null)} pergunta={onEditarPergunta}/>;
    }

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1>Perguntas do Tema: {temaInicial.nome}</h1>
                <div className='lista-clubes'>
                    {temaInicial.perguntas.map((pergunta, index) => (
                        <div key={index} className="clube-container">
                            <span>Pergunta: {pergunta.questao}</span>
                            <button style={{ marginRight: '15px' }} onClick={() => handleEditarPergunta(pergunta)}>Editar</button>
                            <button onClick={() => console.log("Excluir pergunta")}>Excluir Pergunta</button>
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