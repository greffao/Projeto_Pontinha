import React, { useState } from 'react';

import Titulo from './components/Titulo'
import Home from './components/Home'
import Footer from './components/Footer';
import QuemSomos from './components/QuemSomos';
import Jogo from './components/Jogo';
import AreaCoordenacao from './components/AreaCoordenacao';
import GerenciamentoClubes from './components/GerenciamentoClubes';
import NovoClube from './components/NovoClube';
import GerenciamentoTemas from './components/GerenciamentoTemas';

/*Variável global temporária enquanto a gente
não tem o BD*/
const clubes = [
    { 
        id: 1, 
        nome: 'Inglês', 
        emoji: '📚', 
        temas: [
            {
                nome: 'Animais',
                perguntas: [
                    { questao: 'Qual é o nome desse animal?', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
        ]
    },
    {
        id: 2,
        nome: 'História',
        emoji: '🏛️',
        temas: [
            {
                nome: 'Civilizações Antigas',
                perguntas: [
                    { questao: 'Qual civilização construiu as pirâmides?', alternativas: ['Egípcios', 'Maias', 'Incas', 'Aztecas'], imagemUrl: 'piramides-egito.webp' },
                    { questao: 'Em que continente estava localizada a Grécia Antiga?', alternativas: ['Europa', 'Ásia', 'África', 'América'], imagemUrl: 'grecia-antiga.webp' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        temas: [
            {
                nome: 'Corpo Humano',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
];

function App() {
    /*Definição dos estados de cada componente, usando hook 'useState'*/
    const [mostrarJogo, setMostrarJogo] = useState(false);
    const [mostrarQuemSomos, setMostrarQuemSomos] = useState(false);
    const [mostrarAreaCoordenacao, setMostrarAreaCoordenacao] = useState(false);
    const [mostrarGerenciamentoClubes, setMostrarGerenciamentoClubes] = useState(false);
    const [mostrarNovoClube, setMostrarNovoClube] = useState(false);
    const [mostrarGerenciamentoTemas, setMostrarGerenciamentoTemas] = useState(false);

    /*Funções que lidam com os eventos de click em cada botão e altera
    a visibilidade de certos componentes*/

    const handleJogarClick = () => {
        setMostrarJogo(true);
        setMostrarQuemSomos(false);
        setMostrarAreaCoordenacao(false);
        setMostrarGerenciamentoClubes(false);
        setMostrarNovoClube(false);
        setMostrarGerenciamentoTemas(false);
    };

    const handleQuemSomosClick = () => {
        setMostrarJogo(false);
        setMostrarQuemSomos(true);
        setMostrarAreaCoordenacao(false);
        setMostrarGerenciamentoClubes(false);
        setMostrarNovoClube(false);
        setMostrarGerenciamentoTemas(false);
    };

    const handleAreaCoordenacaoClick = () => {
        setMostrarJogo(false);
        setMostrarQuemSomos(false);
        setMostrarAreaCoordenacao(true);
        setMostrarGerenciamentoClubes(false);
        setMostrarNovoClube(false);
        setMostrarGerenciamentoTemas(false);
    };

    const handleVoltarClick = () => {
        setMostrarJogo(false);
        setMostrarQuemSomos(false);
        setMostrarAreaCoordenacao(false);
        setMostrarGerenciamentoClubes(false);
        setMostrarNovoClube(false);
        setMostrarGerenciamentoTemas(false);
    };

    const handleEntrarClick = () => {
        setMostrarJogo(false);
        setMostrarQuemSomos(false);
        setMostrarAreaCoordenacao(false);
        setMostrarGerenciamentoClubes(true);
        setMostrarNovoClube(false);
        setMostrarGerenciamentoTemas(false);
    };

    const handleNovoClubeClick = () => {
        setMostrarJogo(false);
        setMostrarQuemSomos(false);
        setMostrarAreaCoordenacao(false);
        setMostrarGerenciamentoClubes(false);
        setMostrarNovoClube(true);
        setMostrarGerenciamentoTemas(false);
    };

    const handleEditarClubeClick = () => {
        setMostrarJogo(false);
        setMostrarQuemSomos(false);
        setMostrarAreaCoordenacao(false);
        setMostrarGerenciamentoClubes(false);
        setMostrarNovoClube(false);
        setMostrarGerenciamentoTemas(true);
    }

    return (
        <div className="App">
            <Titulo />{/*Mostra o Título*/}
            <div className="content">
                {/*Explicando esse trecho:
                - Uso de chaves ({}): usadas em JSX para inserir código JavaScript
                - mostrarJogo && resto: é uma expressão condicional em JavaScript. Se mostrarJogo
                for verdadeiro, ele avalia o resto. No caso, se for verdadeiro, ele mostra o Jogo.
                - <Jogo onVoltarClick={handleVoltarClick} />} - Componente a ser renderizado, note
                que estou passando uma função para lidar com o click, que será usada por ele em 
                Jogo.js
                */}
                {mostrarJogo && <Jogo onVoltarClick={handleVoltarClick} clubes={clubes} />}
                {mostrarQuemSomos && <QuemSomos onVoltarClick={handleVoltarClick} />}
                {mostrarAreaCoordenacao && <AreaCoordenacao onVoltarClick={handleVoltarClick} onEntrarClick={handleEntrarClick}/>}
                {mostrarGerenciamentoClubes && (
                <GerenciamentoClubes
                    onVoltarClick={handleVoltarClick}
                    onNovoClube={handleNovoClubeClick}
                    onEditarClube={handleEditarClubeClick}
                    clubes={clubes}
                />
                )}
                {mostrarNovoClube && <NovoClube onVoltarClick={handleVoltarClick} onEntrarClick={handleEntrarClick} clubes={clubes}/>}
                {mostrarGerenciamentoTemas && <GerenciamentoTemas voltarAoClube={handleEntrarClick} clubes={clubes}/>}
                {!mostrarJogo && !mostrarQuemSomos && !mostrarAreaCoordenacao && !mostrarGerenciamentoClubes && !mostrarNovoClube && !mostrarGerenciamentoTemas && (
                <Home 
                    onJogarClick={handleJogarClick} 
                    onQuemSomosClick={handleQuemSomosClick} 
                    onAreaCoordenacaoClick={handleAreaCoordenacaoClick}
                />
                )}
            </div>
            <Footer />{/*Mostra o Footer*/}
        </div>
    );
    }

export default App;
