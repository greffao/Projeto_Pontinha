import { useState } from 'react'

const NovaPergunta = ({ onVoltarClick, tema }) => {
    const [questao, setQuestao] = useState('');
    const [alternativas, setAlternativas] = useState(["", "", "", ""]);
    const [respostaCorreta, setRespostaCorreta] = useState('');

    const handleQuestaoChange = (e) => {
        setQuestao(e.target.value);
    };

    const handleAlternativaChange = (index, value) => {
        const newAlternativas = [...alternativas];
        newAlternativas[index] = value;
        setAlternativas(newAlternativas);
    };

    const handleCriarPergunta = () => {
        if (questao && alternativas.every(alternativa => alternativa)) {
            const novaPergunta = {
                questao,
                alternativas,
                respostaCorreta,
                imagemUrl: ''
            };
            tema.perguntas.push(novaPergunta);
            console.log('Pergunta adicionada:', novaPergunta);
            setQuestao('');
            setAlternativas(["", "", "", ""]);
            setRespostaCorreta('');
            onVoltarClick();
        } else {
            alert('Por favor, insira uma questão e todas as alternativas.');
        }
    };

    return (
        <div className='home-container'>
        <div className='quadrado'>
            <h1>Nova Pergunta</h1>
            <input
                type="text"
                value={questao}
                onChange={handleQuestaoChange}
                placeholder="Digite a questão"
                className="input-clube"
            />
            {alternativas.map((alt, index) => (
                <input
                    key={index}
                    type="text"
                    value={alt}
                    onChange={(e) => handleAlternativaChange(index, e.target.value)}
                    placeholder={`Alternativa ${index + 1}`}
                    className="input-clube"
                />
            ))}
            <select
                value={respostaCorreta}
                onChange={(e) => setRespostaCorreta(e.target.value)}
                className="dropdown-select"
            >
                <option value="">Selecione a alternativa correta</option>
                {alternativas.map((alt, index) => (
                    <option key={index} value={`Alternativa ${index + 1}`}>
                        Alternativa {index + 1}
                    </option>
                ))}
            </select>
            <div className='botao-canto'>
                <button onClick={onVoltarClick}>Cancelar</button>
            </div>
            <div className='botao-nav'>
                <button onClick={handleCriarPergunta}>Criar Nova Pergunta</button>
            </div>
        </div>
        </div>
    );
}

export default NovaPergunta;