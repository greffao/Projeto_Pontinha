import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthContext } from "../context/auth";


const EditarPergunta = ({ onVoltarClick, pergunta, tema, clube }) => {
    const [questao, setQuestao] = useState('');
    const [imagem, setImagem] = useState("");
    const [alternativas, setAlternativas] = useState([]);
    const { user } = useContext(AuthContext); // pegar usuário atual

    const handleImagemChange = (e) => {
        setImagem(e.target.value);
    };

    // Asegurar que todos os dados estão carregados antes de usá-los
    useEffect(() => {
        if (pergunta) {
            setQuestao(pergunta.questao);
            const alternativas = [
                pergunta.alternativa_a,
                pergunta.alternativa_b,
                pergunta.alternativa_c,
                pergunta.alternativa_d,

            ];
            setImagem(pergunta.imagem);
            setAlternativas(alternativas);
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

    const alterarPergunta = (perguntaId) => {
        debugger;
        if (questao && alternativas.every(alternativa => alternativa)) {
            const updatedPergunta = {
               cod: perguntaId,
               alternativa_a: alternativas[0],
               alternativa_b: alternativas[1],
               alternativa_c: alternativas[2],
               alternativa_d: alternativas[3],
               questao: questao,
               imagem: imagem
            };

            // Recuperar token do localStorage
            const token = user?.token || localStorage.getItem("user")?.token;

            // Verificar se token está disponível
            if(!token) {
                alert("Usuário não autenticado.");
                return;
            }
            const perguntas = tema.perguntas.map(pergunta => pergunta.cod === perguntaId ? updatedPergunta : pergunta);
            tema.perguntas = perguntas;
            const updatedClub= {
                cod: clube.cod,
                nome: clube.nome,
                imagem: clube.imagem,
                temas: tema,
            }
            axios
            .put(`http://localhost:4242/api/clube/${clube.cod}`,updatedClub, {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            })
            .then((res) => {
                console.log("Pergunta criada com sucesso:", res.data);
            })
            .catch((error) => console.error(error));
            setQuestao('');
            setAlternativas(["", "", "", ""]);
            onVoltarClick();
        } else {
            alert('Por favor, insira uma questão e todas as alternativas.');
        }
    }

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
                <input
                    type="text"
                    value={imagem}
                    onChange={handleImagemChange}
                    placeholder="Link da Imagem"
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
                    <button onClick={() => alterarPergunta(pergunta.cod)}>Salvar Alterações</button>
                </div>
            </div>
        </div>
    );
}

export default EditarPergunta;