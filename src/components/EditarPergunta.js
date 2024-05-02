import { useState, useEffect } from 'react'

const EditarPergunta = ({ onVoltarClick, pergunta }) => {
    const [questao, setQuestao] = useState('');
    const [alternativas, setAlternativas] = useState([]);
    const [respostaCorreta, setRespostaCorreta] = useState('');

    console.log(pergunta);

    // Asegurar que todos os dados estão carregados antes de usá-los
    useEffect(() => {
        if (pergunta) {
            setQuestao(pergunta.questao);
            setAlternativas(pergunta.alternativas || []);
            setRespostaCorreta(pergunta.respostaCorreta);
        }
    }, [pergunta]);

    const handleQuestaoChange = (e) => {
        setQuestao(e.target.value);
    };

    const handleAlternativaChange = (index, value) => {
        const newAlternativas = [...alternativas];
        newAlternativas[index] = value;
        setAlternativas(newAlternativas);
    };

    return (
        <div className='quadrado'>
            <h1 className="titulo-clubes">Editar Pergunta</h1>
            <input
                type="text"
                value={questao}
                onChange={handleQuestaoChange}
                placeholder="Digite a questão"
                className="input-clube"
            />
            {alternativas.map((alt, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={alt}
                        onChange={(e) => handleAlternativaChange(index, e.target.value)}
                        placeholder={`Alternativa ${index + 1}`}
                        className="input-clube"
                    />
                </div>
            ))}
            <select
                value={respostaCorreta}
                onChange={(e) => setRespostaCorreta(e.target.value)}
                className="dropdown-select"
            >
                <option value="">Selecione a alternativa correta</option>
                {alternativas.map((_, index) => (
                    <option key={index} value={index}>
                        Alternativa {index + 1}
                    </option>
                ))}
            </select>
            <div className='botao-canto'>
                <button onClick={onVoltarClick}>Cancelar</button>
            </div>
            <div className='botao-cantoR'>
                <button onClick={onVoltarClick}>Salvar Alterações</button>
            </div>
        </div>
    );
}

export default EditarPergunta;