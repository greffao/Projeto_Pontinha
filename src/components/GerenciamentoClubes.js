import { useState, useEffect } from 'react'
import GerenciamentoTemas from './GerenciamentoTemas';
import { Link } from 'react-router-dom/dist';

const GerenciamentoClubes = ({ onVoltarClick, onNovoClube, clubes }) => {
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

    if (clubeSelecionado) {
        console.log(clubeSelecionado);
        return <GerenciamentoTemas clubeInicial={clubeSelecionado} clubes={clubes} setClubes={setClubesLocais} voltarAoClube={() => setClubeSelecionado(null)} />;
    }

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1>Clubes</h1>
                <div className='lista-clubes'>
                    {clubes.map((clube) => (
                        <div key={clube.id} className="clube-container">
                            <span>{clube.emoji} {clube.nome}</span>
                            <div>
                                <button style={{ marginRight: '15px' }} onClick={() => handleSelecionarClube(clube)}>Editar</button>
                                <button onClick={() => excluirClube(clube.id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to='/area-coordenacao'>
                    <div className='botao-canto'>
                        <button onClick={onVoltarClick}>Voltar</button>
                    </div>
                </Link>
                <Link to='/novo-clube'>
                    <div className='botao-nav'>
                        <button onClick={onNovoClube}>Novo Clube</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default GerenciamentoClubes;
