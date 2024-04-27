import { useState } from 'react'

const Jogo = ({onVoltarClick}) => {
    return (
        <div className='quadrado'>
            <h1>Jogo</h1>
            <div className='botao-canto'>
                <button onClick={onVoltarClick}>Voltar</button>
            </div>
        </div>
    );
}
 
export default Jogo;