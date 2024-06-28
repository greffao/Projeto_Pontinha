import { useState, useContext } from 'react';
import { AuthContext } from "../context/auth";
import axios from "axios";

const NovaPergunta = ({ onVoltarClick, tema, clube, atualizarPerguntas }) => {
    const [questao, setQuestao] = useState('');
    const [imagem, setImagem] = useState("");
    const [alternativas, setAlternativas] = useState(["", "", "", ""]);
    const { user } = useContext(AuthContext); // pegar usuário atual

    console.log(tema);
    console.log(clube);

    const handleQuestaoChange = (e) => {
        setQuestao(e.target.value);
    };

    const handleAlternativaChange = (index, value) => {
        const newAlternativas = [...alternativas];
        newAlternativas[index] = value;
        setAlternativas(newAlternativas);
    };

    const handleImagemChange = (e) => {
        setImagem(e.target.value);
    };

    const handleCriarPergunta = () => {
        if (questao && alternativas.every(alternativa => alternativa)) {
            const novaPergunta = {
                cod: tema.perguntas.length > 0 ? tema.perguntas[tema.perguntas.length - 1].cod + 1 : 1, //Pegamos o codigo da ultima pergunta no bd
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
            if (!token) {
                alert("Usuário não autenticado.");
                return;
            }

            debugger;
            const novasPerguntas = [...tema.perguntas, novaPergunta];
            const updatedClub = {
                cod: clube.cod,
                nome: clube.nome,
                imagem: clube.imagem,
                temas: clube.temas.map(t => ({
                    ...t,
                    perguntas: t === tema ? novasPerguntas : t.perguntas
                })),
            }
            axios
                .put(`http://localhost:4242/api/clube/${clube.cod}`, updatedClub, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then((res) => {
                    console.log("Pergunta criada com sucesso:", res.data);
                    atualizarPerguntas(novasPerguntas); // Atualiza o estado no componente pai
                })
                .catch((error) => console.error(error));
            setQuestao('');
            setAlternativas(["", "", "", ""]);
            onVoltarClick();
        } else {
            alert('Por favor, insira uma questão e todas as alternativas.');
        }
    };

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1>Nova Pergunta</h1>
                <figure>Coloque a resposta correta na alternativa 1</figure>
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
                <input
                    type="text"
                    value={imagem}
                    onChange={handleImagemChange}
                    placeholder="Link da Imagem"
                    className="input-clube"
                />
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
