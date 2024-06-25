import React, { useState, useContext } from 'react';
import GerenciamentoPerguntas from './GerenciamentoPerguntas';
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

    const handleSelecionarTema = tema => {
        setTemaSelecionado(tema);
    }

    const handleNovoTema = () => {
        setNovoClube(true);

    }

    const excluirTema = (temaId) => {
        // Verificar se token está disponível
        if(!token) {
            alert("Usuário não autenticado.");
            return;
        }

        // Mostrar pop-up de confirmação
        const confirmacao = window.confirm("Tem certeza que deseja excluir este tema?");

        if (!confirmacao) {
            return; // Se o usuário clicar em "Cancelar", interrompe a execução
        }
        const temas = clube.temas.filter(tema => tema.cod !== temaId);
        const updatedClub= {
            cod: clube.cod,
            nome: clube.nome,
            imagem: clube.imagem,
            temas: temas,
        }
        axios
        .put(`http://localhost:4242/api/clube/${clube.cod}`,updatedClub, {
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        .then((res) => {
            console.log("Tema excluído com sucesso:", res.data);
            
        })
        .catch((error) => {
            console.error(error)
            return;
        });
        debugger;
        const temasAtualizados = clube.temas.filter(tema => tema.cod !== temaId);
        const clubeAtualizado = { ...clube, temas: temasAtualizados };

        // Atualiza o estado local do clube
        setClube(clubeAtualizado);
        // Atualiza a lista global de clubes de forma imutável
        const clubesAtualizados = clubesLocais.map(c => c.cod === clube.cod ? clubeAtualizado : c);

        setClubes(clubesAtualizados);

        // Opcionalmente, atualiza os clubes locais se necessário para forçar a re-renderização
        // Não é estritamente necessário se setClubes já re-renderiza os consumidores
        setClubesLocais(clubesAtualizados);
    };

    if(temaSelecionado) {
        return <GerenciamentoPerguntas clubeInicial={clubeInicial} temaInicial={temaSelecionado} voltarAoTema={() => setTemaSelecionado(null)}/>;
    }

    if(novoClube){
        return <NovoTema clube={clubeInicial} onVoltarClick={() => setNovoClube(false)}/>
    }

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1 className="titulo-clubes">Temas do Clube: {clube.nome}</h1>
                <div className='lista-clubes'>
                    {clube.temas.map(tema => (
                        <div key={tema.id} className="clube-container">
                            <span>{tema.nome}</span>
                            <div>
                                <button style={{ marginRight: '15px' }} onClick={() => handleSelecionarTema(tema)}>Editar</button>
                                <button onClick={() => excluirTema(tema.cod)}>Excluir Tema</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='botao-canto'>
                    <button onClick={voltarAoClube}>Voltar aos Clubes</button>
                </div>
                <div className='botao-nav'>
                    <button onClick={handleNovoTema}>Novo Tema</button>
                </div>
            </div>
        </div>
    );
};

export default GerenciamentoTemas;