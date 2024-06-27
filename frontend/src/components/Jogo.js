import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Jogo.css';

const Jogo = ({ onVoltarClick, clubes }) => {
    const [clubeSelecionado, setClubeSelecionado] = useState(null);
    const [temaSelecionado, setTemaSelecionado] = useState(null);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [primeirasAlternativasCorretas, setPrimeirasAlternativasCorretas] = useState([]);
    const [alternativaIncorreta, setAlternativaIncorreta] = useState(-1);
    const [alternativaCorreta, setAlternativaCorreta] = useState(-1);
    const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState([]);
    const [perguntasCorretas, setPerguntasCorretas] = useState(0);

    const perguntaRef = useRef(null);
    const imagemRef = useRef(null);
    const alternativasRefs = useRef([]);

    useEffect(() => {
        if (temaSelecionado && temaSelecionado.perguntas[perguntaAtual]) {
            const alternativas = shuffleAlternativas();
            setAlternativasEmbaralhadas(alternativas);
        }
    }, [temaSelecionado, perguntaAtual]);

    useEffect(() => {
        adjustFontSize();
        adjustImageHeight();
    }, [temaSelecionado, perguntaAtual]);

    const adjustFontSize = () => {
        if (perguntaRef.current) {
            let fontSize = 26;
            perguntaRef.current.style.fontSize = `${fontSize}px`;
            while (perguntaRef.current.scrollHeight > perguntaRef.current.clientHeight && fontSize > 1) {
                fontSize -= 1;
                perguntaRef.current.style.fontSize = `${fontSize}px`;
            }
        }
        if (alternativasRefs.current) {
            alternativasRefs.current.forEach((altRef) => {
                if (altRef) {
                    let fontSize = 20;
                    altRef.style.fontSize = `${fontSize}px`;
                    while (altRef.scrollHeight > altRef.clientHeight && fontSize > 1) {
                        fontSize -= 1;
                        altRef.style.fontSize = `${fontSize}px`;
                    }
                }
            });
        }
    };

    const adjustImageHeight = () => {
        if (imagemRef.current) {
            const maxHeight = 130;
            if (imagemRef.current.height > maxHeight) {
                imagemRef.current.style.height = `${maxHeight}px`;
                imagemRef.current.style.width = 'auto';
            }
        }
    };

    const proximaPergunta = (index) => {
        const proximaPerguntaIndex = perguntaAtual + 1;

        if (alternativaCorreta !== -1 || alternativaIncorreta !== -1) {
            setPerguntaAtual(proximaPerguntaIndex);

            setAlternativaCorreta(-1);
            setAlternativaIncorreta(-1);
        } else setPerguntaAtual(temaSelecionado.perguntas.length);
    };

    const shuffleAlternativas = () => {
        const alternativasEmbaralhadas = [
            temaSelecionado.perguntas[perguntaAtual].alternativa_a,
            temaSelecionado.perguntas[perguntaAtual].alternativa_b,
            temaSelecionado.perguntas[perguntaAtual].alternativa_c,
            temaSelecionado.perguntas[perguntaAtual].alternativa_d,
        ];

        for (let i = alternativasEmbaralhadas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [alternativasEmbaralhadas[i], alternativasEmbaralhadas[j]] = [alternativasEmbaralhadas[j], alternativasEmbaralhadas[i]];
        }
        return alternativasEmbaralhadas;
    };

    const handleTemaSelecionado = (tema) => {
        setTemaSelecionado(tema);
        const primeirasAlternativas = tema.perguntas.map((pergunta) => pergunta.alternativa_a);
        setPrimeirasAlternativasCorretas(primeirasAlternativas);
    };

    const handleAlternativaClick = (alt, index) => {
        if (alt === primeirasAlternativasCorretas[perguntaAtual]) {
            setAlternativaCorreta(index);
            setPerguntasCorretas(perguntasCorretas + 1);
        } else setAlternativaIncorreta(index);
    };

    const resetJogo = () => {
        setClubeSelecionado(null);
        setTemaSelecionado(null);
        setPerguntaAtual(0);
        setPrimeirasAlternativasCorretas([]);
        setAlternativaIncorreta(-1);
        setAlternativaCorreta(-1);
        setAlternativasEmbaralhadas([]);
        setPerguntasCorretas(0);
    };

    return (
        <div className='jogo-container'>
            <div className='quadrado'>
                {!clubeSelecionado ? (
                    <>
                    <h1 className='titulo'>Escolha um clube!</h1>
                    <div className='clubes-container'>
                        <div className='clubes'>
                            {clubes.map(clube => (
                                <button key={clube.id} className='botao-clube' onClick={() => setClubeSelecionado(clube)}>
                                    {clube.imagem && (<img src={clube.imagem} alt={clube.nome} />)}
                                    <span>{clube.nome}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <Link to='/'>
                        <div className='botao-canto'>
                            <button onClick={resetJogo}>Voltar</button>
                        </div>
                    </Link>
                    </>
                ) : !temaSelecionado ? (
                    <>
                    <h1 className='titulo'>Escolha um tema!</h1>
                    <div className='clubes-container'>
                        <h2>{clubeSelecionado.nome}</h2>
                        <div className='clubes'>
                            {clubeSelecionado.temas.map((tema, index) => (
                                <button key={index} className='botao-tema' onClick={() => handleTemaSelecionado(tema)}>
                                    {tema.imagem && (<img src={tema.imagem} alt={tema.nome} />)}
                                    <span>{tema.nome}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='botao-canto'>
                        <button onClick={() => { setClubeSelecionado(null); resetJogo(); }}>Voltar</button>
                    </div>
                    </>
                ) : !(perguntaAtual === temaSelecionado.perguntas.length) ?(
                    <>
                    <div className='clubes-container'>
                        <h2>{temaSelecionado.nome}</h2>
                        <p className='perguntas' ref={perguntaRef}>{temaSelecionado.perguntas[perguntaAtual].questao}</p>
                        {temaSelecionado.perguntas[perguntaAtual].imagem && (
                            <img className='imagem-quadrada' onLoad={adjustImageHeight} src={temaSelecionado.perguntas[perguntaAtual].imagem} alt="Question Image" ref={imagemRef} />
                        )}
                        <div className='alternativas'>
                        {alternativasEmbaralhadas.map((alt, index) => (
                            <button 
                                key={index}
                                ref={el => alternativasRefs.current[index] = el}
                                onClick={() => handleAlternativaClick(alt, index)} 
                                disabled={alternativaCorreta !== -1 || alternativaIncorreta !== -1}
                                style={{ 
                                    backgroundColor: alternativaCorreta === index ? 'green' : 
                                                    alternativaIncorreta === index ? 'red' : '' 
                                }}
                            >
                                {alt}
                            </button>
                        ))}
                        </div>
                    </div>
                    <div className='botao-nav'>
                        <button onClick={proximaPergunta} disabled={perguntaAtual === temaSelecionado.perguntas.length}>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                    <div className='botao-canto'>
                        <button onClick={() => { setTemaSelecionado(null); resetJogo(); }}>Voltar</button>
                    </div>
                    </>
                ) : perguntasCorretas === 0 ? (
                    <>
                    <div className='mensagem-final'>
                        <h1>Que pena!</h1>
                        <h1 className='que-pena'>Oh não! Você ainda está aprendendo, mas continue tentando!</h1>
                        <p className='destaque'>Total de perguntas corretas: {perguntasCorretas}/{temaSelecionado.perguntas.length}</p>
                        <p>Não desista! Cada erro é uma oportunidade de aprendizado. Continue explorando e se divertindo com novas perguntas e desafios.</p>
                    </div>
                    <div className='botao-canto'>
                        <button onClick={() => { setTemaSelecionado(null); resetJogo(); }}>Voltar</button>
                    </div>
                    </>
                ) : (
                    <>
                    <div className='mensagem-final'>
                    <h1>
                        🎉🌟
                        <span className="letra-p">P</span>
                        <span className="letra-a">a</span>
                        <span className="letra-r">r</span>
                        <span className="letra-a2">a</span>
                        <span className="letra-b">b</span>
                        <span className="letra-e">é</span>
                        <span className="letra-n">n</span>
                        <span className="letra-s">s</span>
                        🎉🌟
                    </h1>
                        <h1 className='parabens'>Você é um verdadeiro campeão das perguntas!</h1>
                        <p className='destaque'>Total de perguntas corretas: {perguntasCorretas}/{temaSelecionado.perguntas.length}</p>
                        <p>Estamos muito orgulhosos de você! Continue explorando, aprendendo e se divertindo com novas perguntas e desafios. Você é uma estrela brilhante que ilumina o caminho do conhecimento!</p>
                    </div>
                    <div className='botao-canto'>
                        <button onClick={() => { setTemaSelecionado(null); resetJogo(); }}>Voltar</button>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}
 
export default Jogo;
