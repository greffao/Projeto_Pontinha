import React, { useState, useContext } from 'react';
import GerenciamentoPerguntas from './GerenciamentoPerguntas';
import EditarTema from './EditarTema'; // Importar o componente EditarTema
import { AuthContext } from "../context/auth";
import axios from "axios";
import NovoTema from './NovoTema';

const GerenciamentoTemas = ({ clubeInicial, clubes, setClubes, voltarAoClube }) => {
    const { user } = useContext(AuthContext); // pegar usuário atual
    const token = user?.token || localStorage.getItem("user")?.token; // Recuperar token do localStorage
    const [novoClube, setNovoClube] = useState(false);
    const [clube, setClube] = useState(clubeInicial);
    const [clubesLocais, setClubesLocais] = useState(clubes);
    const [temaSelecionado, setTemaSelecionado] = useState(null);
    const [modoEditarTema, setModoEditarTema] = useState(false); // Adicionar modo de edição

    const handleSelecionarTema = (tema, modoEditar) => {
        setTemaSelecionado(tema);
        setModoEditarTema(modoEditar); // Definir modo de edição
    };

    const handleNovoTema = () => {
        setNovoClube(true);
    };

    const excluirTema = (temaId) => {
        if (!token) {
            alert("Usuário não autenticado.");
            return;
        }

        const confirmacao = window.confirm("Tem certeza que deseja excluir este tema?");
        if (!confirmacao) {
            return;
        }

        const temas = clube.temas.filter(tema => tema.cod !== temaId);
        const updatedClub = {
            cod: clube.cod,
            nome: clube.nome,
            imagem: clube.imagem,
            temas: temas,
        };
        axios
            .put(`http://localhost:4242/api/clube/${clube.cod}`, updatedClub, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                console.log("Tema excluído com sucesso:", res.data);
            })
            .catch((error) => {
                console.error(error);
                return;
            });
        const temasAtualizados = clube.temas.filter(tema => tema.cod !== temaId);
        const clubeAtualizado = { ...clube, temas: temasAtualizados };

        setClube(clubeAtualizado);
        const clubesAtualizados = clubesLocais.map(c => c.cod === clube.cod ? clubeAtualizado : c);
        setClubes(clubesAtualizados);
        setClubesLocais(clubesAtualizados);
    };

    const atualizarTema = (temaEditado) => {
        const temasAtualizados = clube.temas.map(tema =>
            tema.cod === temaEditado.cod ? temaEditado : tema
        );
        const clubeAtualizado = { ...clube, temas: temasAtualizados };
        const clubesAtualizados = clubes.map(c =>
            c.cod === clubeAtualizado.cod ? clubeAtualizado : c
        );
        setClube(clubeAtualizado);
        setClubes(clubesAtualizados); // Atualiza o estado no componente pai
    };

    if (temaSelecionado && modoEditarTema) {
        return (
            <EditarTema
                tema={temaSelecionado}
                clube={clubeInicial}
                onVoltarClick={() => setTemaSelecionado(null)}
                atualizarTema={atualizarTema} // Passa a função para atualizar o tema
            />
        );
    }

    if (temaSelecionado && !modoEditarTema) {
        return <GerenciamentoPerguntas clubeInicial={clubeInicial} temaInicial={temaSelecionado} voltarAoTema={() => setTemaSelecionado(null)} />;
    }

    if (novoClube) {
        return <NovoTema clube={clubeInicial} onVoltarClick={() => setNovoClube(false)} />;
    }

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1 className="titulo-clubes">Temas do Clube: {clube.nome}</h1>
                <div className='lista-clubes'>
                    {clube.temas.map(tema => (
                        <div key={tema.cod} className="clube-container">
                            <span>{tema.nome}</span>
                            <div>
                                <button style={{ marginRight: '15px' }} onClick={() => handleSelecionarTema(tema, true)}>Editar</button>
                                <button style={{ marginRight: '15px' }} onClick={() => handleSelecionarTema(tema, false)}>Editar Perguntas</button>
                                <button onClick={() => excluirTema(tema.cod)}>Excluir Tema</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='botao-canto'>
                    <button onClick={voltarAoClube}>Voltar</button>
                </div>
                <div className='botao-nav'>
                    <button onClick={handleNovoTema}>Novo Tema</button>
                </div>
            </div>
        </div>
    );
};

export default GerenciamentoTemas;
