import React, { useState, useEffect } from 'react';
import NovaPergunta from './NovaPergunta';

const GerenciamentoPerguntas = ({ temaInicial, voltarAoTema }) => {
    const [onCriarPergunta, setCriarPergunta] = useState(null);

    const handleNovaPergunta = tema => {
        setCriarPergunta(tema);
    }

    if(onCriarPergunta) {
        return <NovaPergunta onVoltarClick={() => setCriarPergunta(null)} tema/>;
    }

    return (
        <div className='quadrado'>
            <h1 className="titulo-clubes">Perguntas do Tema: {temaInicial.nome}</h1>
            <div className='lista-clubes'>
                {temaInicial.perguntas.map((pergunta, index) => (
                    <div key={index} className="clube-container"> {/* Uso do índice como key */}
                        <span>Pergunta: {pergunta.questao}</span>
                        <div>
                            {/* Passando o índice para funções de editar e excluir */}
                            <button style={{ marginRight: '15px' }} onClick={() => console.log("Editar pergunta")}>Editar</button>
                            <button onClick={() => console.log("Excluir pergunta")}>Excluir Pergunta</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='botao-canto'>
                <button onClick={voltarAoTema}>Voltar aos Temas</button>
            </div>
            <div className='botao-cantoR'>
                <button onClick={() => handleNovaPergunta(temaInicial)}>Nova Pergunta</button>
            </div>
        </div>
    );
};

export default GerenciamentoPerguntas;