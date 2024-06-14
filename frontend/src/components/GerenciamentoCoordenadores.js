import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/dist';
import EditarCoordenador from './EditarCoordenador'; // Importar o componente de edição

const GerenciamentoCoordenadores = ({ onVoltarClick, onNovoCoordenador, coordenadores }) => {
    const [coordenadoresLocais, setCoordenadoresLocais] = useState([]);
    const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(null);

    const handleSelecionarCoordenador = coordenador => {
        setCoordenadorSelecionado(coordenador);
    };

    useEffect(() => {
        setCoordenadoresLocais([...coordenadores]); // Sincroniza o estado local com a variável global na montagem
    }, [coordenadores]);

    const excluirCoordenador = (coordenadorId) => {
        // Remove o coordenador da lista global
        const index = coordenadores.findIndex(coordenador => coordenador.id === coordenadorId);
        if (index > -1) {
            coordenadores.splice(index, 1);
        }

        // Atualiza o estado local para forçar a re-renderização
        setCoordenadoresLocais([...coordenadores]);
    };

    const handleSalvarCoordenador = (coordenadorEditado) => {
        const index = coordenadores.findIndex(c => c.id === coordenadorEditado.id);
        if (index > -1) {
            coordenadores[index] = coordenadorEditado;
            setCoordenadoresLocais([...coordenadores]);
            setCoordenadorSelecionado(null);
        }
    };

    if (coordenadorSelecionado) {
        return (
            <EditarCoordenador
                coordenador={coordenadorSelecionado}
                onVoltarClick={() => setCoordenadorSelecionado(null)}
                onSalvarClick={handleSalvarCoordenador}
            />
        );
    }

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1>Coordenadores</h1>
                <div className='lista-coordenadores'>
                    {coordenadores.map((coordenador) => (
                        <div key={coordenador.id} className="coordenador-container">
                            <span>{coordenador.login}</span>
                            <div>
                                <button style={{ marginRight: '15px' }} onClick={() => handleSelecionarCoordenador(coordenador)}>Editar</button>
                                <button onClick={() => excluirCoordenador(coordenador.id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to='/gerenciamento'>
                    <div className='botao-canto'>
                        <button onClick={onVoltarClick}>Voltar</button>
                    </div>
                </Link>
                <Link to='/novo-coordenador'>
                    <div className='botao-nav'>
                        <button onClick={onNovoCoordenador}>Novo Coordenador</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default GerenciamentoCoordenadores;
