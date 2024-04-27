import { useState } from 'react'

const QuemSomos = ({onVoltarClick}) => {
    return (
        <div className='quadrado'>
            <h1>Quem somos</h1>
            <div className='botao-canto'>
                <button onClick={onVoltarClick}>Voltar</button>
            </div>
        </div>
    );
}
 
export default QuemSomos;