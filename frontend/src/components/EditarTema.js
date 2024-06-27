import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth";
import axios from "axios";

const EditarTema = ({ tema, clube, onVoltarClick, atualizarTema }) => {
    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');
    const { user } = useContext(AuthContext); // pegar usuário atual
    const navigate = useNavigate();

    useEffect(() => {
        if (tema) {
            setNome(tema.nome);
            setImagem(tema.imagem);
        }
    }, [tema]);

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };

    const handleImagemChange = (e) => {
        setImagem(e.target.value);
    };

    const handleSalvar = () => {
        if (nome) {
            const temaEditado = { ...tema, nome, imagem };

            // Recuperar token do localStorage
            const token = user?.token || localStorage.getItem("user")?.token;

            // Verificar se token está disponível
            if (!token) {
                alert("Usuário não autenticado.");
                return;
            }

            const temasAtualizados = clube.temas.map(t =>
                t.cod === temaEditado.cod ? temaEditado : t
            );
            const clubeAtualizado = { ...clube, temas: temasAtualizados };

            axios
                .put(`http://localhost:4242/api/clube/${clube.cod}`, clubeAtualizado, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then((res) => {
                    atualizarTema(temaEditado); // Atualiza o estado no componente pai
                    alert("Tema editado com sucesso:", res.data);
                    onVoltarClick();
                    navigate('/gerenciamento');
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        alert(error.response.data);
                    } else {
                        alert("Erro ao editar tema.");
                    }
                });
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1 className="titulo-clubes">Editar Tema</h1>
                <input
                    type="text"
                    value={nome}
                    onChange={handleNomeChange}
                    placeholder="Nome do Tema"
                    className="input-clube"
                />
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
                    <button onClick={handleSalvar}>Salvar</button>
                </div>
            </div>
        </div>
    );
}

export default EditarTema;
