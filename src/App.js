import React, { useState } from 'react';

import Titulo from './components/Titulo'
import Home from './components/Home'
import Footer from './components/Footer';
import QuemSomos from './components/QuemSomos';
import Jogo from './components/Jogo';
import AreaCoordenacao from './components/AreaCoordenacao';

function App() {
    /*Definição dos estados de cada componente, usando hook 'useState'*/
    const [mostrarJogo, setMostrarJogo] = useState(false);
    const [mostrarQuemSomos, setMostrarQuemSomos] = useState(false);
    const [mostrarAreaCoordenacao, setMostrarAreaCoordenacao] = useState(false);

    /*Funções que lidam com os eventos de click em cada botão e altera
    a visibilidade de certos componentes*/

    const handleJogarClick = () => {
        setMostrarJogo(true);
        setMostrarQuemSomos(false);
        setMostrarAreaCoordenacao(false);
    };

    const handleQuemSomosClick = () => {
        setMostrarJogo(false);
        setMostrarQuemSomos(true);
        setMostrarAreaCoordenacao(false);
    };

    const handleAreaCoordenacaoClick = () => {
        setMostrarJogo(false);
        setMostrarQuemSomos(false);
        setMostrarAreaCoordenacao(true);
    };

    const handleVoltarClick = () => {
        setMostrarJogo(false);
        setMostrarQuemSomos(false);
        setMostrarAreaCoordenacao(false);
    };

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
                {mostrarJogo && <Jogo onVoltarClick={handleVoltarClick} />}
                {mostrarQuemSomos && <QuemSomos onVoltarClick={handleVoltarClick} />}
                {mostrarAreaCoordenacao && <AreaCoordenacao onVoltarClick={handleVoltarClick} />}
                {!mostrarJogo && !mostrarQuemSomos && !mostrarAreaCoordenacao && (
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
