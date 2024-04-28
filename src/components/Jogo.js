import { useState } from 'react'
import './Jogo.css'

const Jogo = ({ onVoltarClick, clubes }) => {
    const [clubeSelecionado, setClubeSelecionado] = useState(null);
    const [temaSelecionado, setTemaSelecionado] = useState(null);
    const [perguntaAtual, setPerguntaAtual] = useState(0);

    const proximaPergunta = () => {
        setPerguntaAtual(perguntaAtual => Math.min(perguntaAtual + 1, clubeSelecionado.perguntas.length - 1));
    };

    const perguntaAnterior = () => {
        setPerguntaAtual(perguntaAtual => Math.max(perguntaAtual - 1, 0));
    };

    return (
        <div className='quadrado'>
            {!clubeSelecionado ? (
                <>
                <h1 className='titulo'>Escolha um clube!</h1>
                <div className='clubes-container'>
                    <div className='clubes'>
                        {clubes.map(clube => (
                            <button key={clube.id} onClick={() => setClubeSelecionado(clube)}>
                                {clube.emoji} {clube.nome} {clube.emoji}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='botao-canto'>
                    <button onClick={onVoltarClick}>Voltar</button>
                </div>
                </>
            ) : !temaSelecionado ? (
                <>
                <h1 className='titulo'>Escolha um tema!</h1>
                <div className='clubes-container'>
                    <h2>{clubeSelecionado.emoji} {clubeSelecionado.nome}</h2>
                    <div className='clubes'>
                        {clubeSelecionado.temas.map((tema, index) => (
                            <button key={index} onClick={() => setTemaSelecionado(tema)}>
                                {tema}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='botao-canto'>
                    <button onClick={() => setClubeSelecionado(null)}>Voltar</button>
                </div>
                </>
            ) : (
                <div className='perguntas-container'>
                    <h2>{temaSelecionado}</h2>
                    <p>{clubeSelecionado.perguntas[perguntaAtual]}</p>
                    <div className='botao-canto'>
                        <button onClick={perguntaAnterior} disabled={perguntaAtual === 0}>Anterior</button>
                        <button onClick={proximaPergunta} disabled={perguntaAtual === clubeSelecionado.perguntas.length - 1}>Próxima</button>
                        <button onClick={() => setTemaSelecionado(null)}>Voltar aos temas</button>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default Jogo;