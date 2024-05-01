import { useState } from 'react'

const GerenciamentoClubes = ({ onVoltarClick, clubes }) => {
    return (
        <div className='quadrado'>
            <h1>Clubes</h1>
            {clubes.map((clube) => (
                <div key={clube.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px' }}>
                    <span>{clube.emoji} {clube.nome}</span>
                    <div>
                        <button onClick={() => console.log('Editando', clube.id)}>Editar</button>
                        <button onClick={() => console.log('Excluindo', clube.id)}>Excluir</button>
                    </div>
                </div>
            ))}
            <div className='botao-canto'>
                <button onClick={onVoltarClick}>Voltar</button>
            </div>
        </div>
    );
}

export default GerenciamentoClubes;
