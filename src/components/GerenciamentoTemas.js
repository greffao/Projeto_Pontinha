import React, { useState, useEffect } from 'react';
import GerenciamentoPerguntas from './GerenciamentoPerguntas';

const GerenciamentoTemas = ({ clubeInicial, clubes, setClubes, voltarAoClube, onNovoTema }) => {
    const [clube, setClube] = useState(clubeInicial);
    const [clubesLocais, setClubesLocais] = useState(clubes);
    const [temaSelecionado, setTemaSelecionado] = useState(null);

    const handleSelecionarTema = tema => {
        console.log(tema);
        setTemaSelecionado(tema);
    }

    useEffect(() => {
        // Atualiza o estado local do clube sempre que o clube inicial mudar
        setClube(clubeInicial);
        // Atualiza os clubes locais sempre que a lista global mudar
        setClubesLocais(clubes);
    }, [clubeInicial, clubes]);

    const excluirTema = (temaId) => {
        const temasAtualizados = clube.temas.filter(tema => tema.id !== temaId);
        const clubeAtualizado = { ...clube, temas: temasAtualizados };

        // Atualiza o estado local do clube
        setClube(clubeAtualizado);

        // Atualiza a lista global de clubes de forma imutável
        const clubesAtualizados = clubesLocais.map(c => c.id === clube.id ? clubeAtualizado : c);
        setClubes(clubesAtualizados);

        // Opcionalmente, atualiza os clubes locais se necessário para forçar a re-renderização
        // Não é estritamente necessário se setClubes já re-renderiza os consumidores
        setClubesLocais(clubesAtualizados);
    };

    if(temaSelecionado) {
        return <GerenciamentoPerguntas temaInicial={temaSelecionado} voltarAoTema={() => setTemaSelecionado(null)}/>;
    }

    return (
        <div className='quadrado'>
            <h1 className="titulo-clubes">Temas do Clube: {clube.nome}</h1>
            <div className='lista-clubes'>
                {clube.temas.map(tema => (
                    <div key={tema.id} className="clube-container">
                        <span>{tema.nome}</span>
                        <div>
                            <button style={{ marginRight: '15px' }} onClick={() => handleSelecionarTema(tema)}>Editar</button>
                            <button onClick={() => excluirTema(tema.id)}>Excluir Tema</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='botao-canto'>
                <button onClick={voltarAoClube}>Voltar aos Clubes</button>
            </div>
            <div className='botao-cantoR'>
                <button onClick={onNovoTema}>Novo Tema</button>
            </div>
        </div>
    );
};

export default GerenciamentoTemas;