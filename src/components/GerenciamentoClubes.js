import { useState, useEffect } from 'react'
import GerenciamentoTemas from './GerenciamentoTemas';

const GerenciamentoClubes = ({ onVoltarClick, onNovoClube, onEditarClube, clubes }) => {
    const [clubesLocais, setClubesLocais] = useState([]);
    const [clubeSelecionado, setClubeSelecionado] = useState(null);

    const handleSelecionarClube = clube => {
        setClubeSelecionado(clube);
    };

    useEffect(() => {
        setClubesLocais([...clubes]); // Sincroniza o estado local com a variável global na montagem
    }, []);

    const excluirClube = (clubeId) => {
        // Remove o clube da lista global
        const index = clubes.findIndex(clube => clube.id === clubeId);
        if (index > -1) {
            clubes.splice(index, 1);
        }

        // Atualiza o estado local para forçar a re-renderização
        setClubesLocais([...clubes]);
    };

    if(clubeSelecionado) {
        console.log(clubeSelecionado);
        return <GerenciamentoTemas clubeInicial={clubeSelecionado} clubes={clubes} setClubes={setClubesLocais} voltarAoClube={() => setClubeSelecionado(null)} />;
    }

    return (
        <div className='quadrado'>
            <h1 className="titulo-clubes">Clubes</h1>
            <div className='lista-clubes'>
                {clubes.map((clube) => (
                    <div key={clube.id} className="clube-container">
                        <span>{clube.emoji} {clube.nome}</span>
                        <div>
                            {/* <button style={{ marginRight: '15px' }} onClick={onEditarClube}>Editar</button> */}
                            <button style={{ marginRight: '15px' }} onClick={() => handleSelecionarClube(clube)}>Editar</button>
                            <button onClick={() => excluirClube(clube.id)}>Excluir</button>
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
