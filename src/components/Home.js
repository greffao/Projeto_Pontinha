import { useState } from 'react'

const Home = ({ onJogarClick, onQuemSomosClick, onAreaCoordenacaoClick }) => {
    return (
        <div className='home-container'>
            <div class="quadrado">
                <p>
                    <span class="letra-j">J</span>
                    <span class="letra-o">o</span>
                    <span class="letra-g">g</span>
                    <span class="letra-o">o</span>
                    <span> </span>
                    <span class="letra-d">d</span>
                    <span class="letra-o">o</span>
                    <span> </span>
                    <span class="letra-p">p</span>
                    <span class="letra-o">o</span>
                    <span class="letra-n">n</span>
                    <span class="letra-t">t</span>
                    <span class="letra-i">i</span>
                    <span class="letra-n">n</span>
                    <span class="letra-h">h</span>
                    <span class="letra-a">a</span>
                </p>

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