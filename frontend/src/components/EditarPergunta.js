import { useState, useEffect } from 'react'

const EditarPergunta = ({ onVoltarClick, pergunta }) => {
    const [questao, setQuestao] = useState('');
    const [alternativas, setAlternativas] = useState([]);

    console.log(pergunta);

    // Asegurar que todos os dados estão carregados antes de usá-los
    useEffect(() => {
        if (pergunta) {
            setQuestao(pergunta.questao);
            setAlternativas(pergunta.alternativas || []);
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
        <div className='home-container'>
            <div className='quadrado'>
                <h1>Editar Pergunta</h1>
                <figure>Deixe a resposta correta na alternativa 1</figure>
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
                <div className='botao-canto'>
                    <button onClick={onVoltarClick}>Cancelar</button>
                </div>
                <div className='botao-nav'>
                    <button onClick={onVoltarClick}>Salvar Alterações</button>
                </div>
            </div>
        </div>
    );
}

export default EditarPergunta;