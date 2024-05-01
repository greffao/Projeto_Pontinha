import { useState } from 'react'

const Home = ({ onJogarClick, onQuemSomosClick, onAreaCoordenacaoClick }) => {
    return (
        <div className='home-container'>
            <div className='quadrado'>
                
                <div className='titulo-container'>
                    <h3>Jogo do Pontinha!</h3>
                </div>

                <div className='botoes-menu'>
                    <button onClick={onJogarClick}>Jogar</button>
                    <button onClick={onQuemSomosClick}>Quem somos</button>
                </div>
                <div className='botao-canto'>
                    <button onClick={onAreaCoordenacaoClick}>Área da coordenação</button>
                </div>
            </div>
        </div>
    );
}
 
export default Home;