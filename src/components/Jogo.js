import { useState, useEffect } from 'react'
import './Jogo.css'

const Jogo = ({ onVoltarClick, clubes }) => {
    // Hooks usados para alterar estados dos componentes
    const [clubeSelecionado, setClubeSelecionado] = useState(null);
    const [temaSelecionado, setTemaSelecionado] = useState(null);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [primeirasAlternativasCorretas, setPrimeirasAlternativasCorretas] = useState([]);
    const [alternativaIncorreta, setAlternativaIncorreta] = useState(-1);  // Talvez essa variável não seja necessária. Preciso revisar essa lógica
    const [alternativaCorreta, setAlternativaCorreta] = useState(-1);
    const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState([]);
    const [perguntasCorretas, setPerguntasCorretas] = useState(0);

    /**
     * useEffect usado para realizar uma ação sempre que uma alteração ocorrer em temaSelecionado
     * ou  perguntaAtual. No caso, ele embaralha as perguntas sempre que mudamos de tema ou trocamos 
     * de pergunta. 
    */
    useEffect(() => {
        if (temaSelecionado && temaSelecionado.perguntas[perguntaAtual]) {
            // Verificando se são diferentes de null
            const alternativas = shuffleAlternativas();
            setAlternativasEmbaralhadas(alternativas);
        }
    }, [temaSelecionado, perguntaAtual]);
    
    /**
     * Função do botão de 'próxima pergunta'. Reseta as alternativaCorreta e alternativaIncorreta
     * a cada pergunta.
    */
    const proximaPergunta = (index) => {
        const proximaPerguntaIndex = perguntaAtual + 1;

        if (alternativaCorreta !== -1 || alternativaIncorreta !== -1) {
            setPerguntaAtual(proximaPerguntaIndex);

            setAlternativaCorreta(-1);
            setAlternativaIncorreta(-1);
        } else setPerguntaAtual(temaSelecionado.perguntas.length);
    };

    /**
     * Função para embaralhar as alternativas, pois apresentamos as alternatias de forma embaralhada.
     * Sabemos que a primeira alternativa do BD é a verdadeira, por isso embaralhamos.
     */
    const shuffleAlternativas = () => {
        // Criando uma cópia do array original de alternativass
        const alternativasEmbaralhadas = [...temaSelecionado.perguntas[perguntaAtual].alternativas];

        for (let i = alternativasEmbaralhadas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [alternativasEmbaralhadas[i], alternativasEmbaralhadas[j]] = [alternativasEmbaralhadas[j], alternativasEmbaralhadas[i]];
        }
        return alternativasEmbaralhadas;
    };

    /**
     * Função acionada ao escolher o tema. Ela armazena todas as respostas corretas das perguntas
     * daquele tema que são as primeiras alternativas do BD
     */
    const handleTemaSelecionado = (tema) => {
        setTemaSelecionado(tema);
        const primeirasAlternativas = tema.perguntas.map((pergunta) => pergunta.alternativas[0]);
        setPrimeirasAlternativasCorretas(primeirasAlternativas);
    };

    /**
     * Função que lida com a escolha da alternatia. Verifica se a alternativa é a correta e incrementa
     * a quantidade de acertos.
     */
    const handleAlternativaClick = (alt, index) => {
        if (alt === primeirasAlternativasCorretas[perguntaAtual]) {

            setAlternativaCorreta(index);
            setPerguntasCorretas(perguntasCorretas + 1)
        } else setAlternativaIncorreta(index);
    };

    const resetJogo = () => {
        setPerguntasCorretas(0)
        setPerguntaAtual(0)
    }

    return (
        <div className='quadrado'>
            {!clubeSelecionado ? (
                <> {/**
                 * Seção para mostrar as opções de clubes
                 */}
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
                <> {/**
                 * Seção apra mostrar as opções de temas
                 */}
                <h1 className='titulo'>Escolha um tema!</h1>
                <div className='clubes-container'>
                    <h2>{clubeSelecionado.emoji} {clubeSelecionado.nome}</h2>
                    <div className='clubes'>
                        {clubeSelecionado.temas.map((tema, index) => (
                            <button key={index} onClick={() => handleTemaSelecionado(tema)}>
                                {tema.nome}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='botao-canto'>
                    <button onClick={() => setClubeSelecionado(null)}>Voltar</button>
                </div>
            </>
            ) : !(perguntaAtual === temaSelecionado.perguntas.length) ?(
                <> {/**
                 * Seção para exibir as perguntas
                 */}
                <div className='clubes-container'>
                    <h2>{temaSelecionado.nome}</h2>
                    <p>{temaSelecionado.perguntas[perguntaAtual].questao}</p>
                    <img className='imagem-quadrada' src={require(`../temp_images/${temaSelecionado.perguntas[perguntaAtual].imagemUrl}`)} alt="Question Image" />
                    <div className='alternativas'>
                    {/**
                     * TO DO: Revisar essa lógica
                     */}
                    {alternativasEmbaralhadas.map((alt, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleAlternativaClick(alt, index)} 
                            disabled={alternativaCorreta !== -1 || alternativaIncorreta !== -1} // Desabilitar se uma resposta já foi selecionada
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
                    <button onClick={(proximaPergunta)} disabled={perguntaAtual === temaSelecionado.perguntas.length}>
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
                <div className='botao-canto'>
                    <button onClick={() => setTemaSelecionado(null)}>Voltar</button>
                </div>
                </>
            ) : (
                <>{/**
                 * Seção para parabenizar o jogador
                 */}
                <div className='mensagem-final'>
                <h1>
                    🎉🌟
                    <span class="letra-p">P</span>
                    <span class="letra-a">a</span>
                    <span class="letra-r">r</span>
                    <span class="letra-a2">a</span>
                    <span class="letra-b">b</span>
                    <span class="letra-e">é</span>
                    <span class="letra-n">n</span>
                    <span class="letra-s">s</span>
                    🎉🌟
                </h1>
                    <h1>Você é um verdadeiro campeão das perguntas!</h1>
                    <p className='destaque'>Total de perguntas corretas: {perguntasCorretas}/{temaSelecionado.perguntas.length}</p>
                    <p>Estamos muito orgulhosos de você! Continue explorando, aprendendo e se divertindo com novas perguntas e desafios. Você é uma estrela brilhante que ilumina o caminho do conhecimento!</p>
                </div>
                <div className='botao-canto'>
                    <button onClick={() => {setTemaSelecionado(null);
                                            resetJogo();}}>Voltar</button>
                </div>
                </>
            )}
        </div>
    );
}
 
export default Jogo;