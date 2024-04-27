import { useState } from 'react'

const AreaCoordenacao = ({onVoltarClick}) => {
    return (
        <div className='quadrado'>
            <h1>Área coordenação</h1>
            <div className='botao-canto'>
                <button onClick={onVoltarClick}>Voltar</button>
            </div>
        </div>
    );
}
 
export default AreaCoordenacao;