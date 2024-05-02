import { useState } from 'react'

const GerenciamentoClubes = ({ onVoltarClick, onNovoClube, clubes }) => {
    return (
        <div className='quadrado'>
            <h1 className="titulo-clubes">Clubes</h1>
            <div className='lista-clubes'>
                {clubes.map((clube) => (
                    <div key={clube.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px'}}>
                        <span>{clube.emoji} {clube.nome}</span>
                        <div>
                            <button style={{ marginRight: '15px' }} onClick={() => console.log('Editando', clube.id)}>Editar</button>
                            <button onClick={() => console.log('Excluindo', clube.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='botao-canto'>
                <button onClick={onVoltarClick}>Voltar</button>
            </div>
            <div className='botao-cantoR'>
                <button onClick={onNovoClube}>Novo Clube</button>
            </div>
        </div>
    );
}

export default GerenciamentoClubes;
