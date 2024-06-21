import { useState, useEffect } from "react";
import GerenciamentoTemas from "./GerenciamentoTemas";
import { Link } from "react-router-dom/dist";
import axios from "axios";

const GerenciamentoClubes = ({ onVoltarClick, onNovoClube, clubes }) => {
  const [clubesLocais, setClubesLocais] = useState([]);
  const [clubeSelecionado, setClubeSelecionado] = useState(null);

  const handleSelecionarClube = (clube) => {
    setClubeSelecionado(clube);
  };

  useEffect(() => {
      // essa lógica está acontecendo no main de forma duplicada, decidir como fazer isso direito
      axios
      .get("http://localhost:4242/api/clube", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((res) => {
        setClubesLocais(res);
      })
      .catch((error) => console.error(error));

    setClubesLocais([...clubes]); // Sincroniza o estado local com a variável global na montagem
  }, []);

  const excluirClube = (clubeId) => {
    // TODO: acho interessante adicionar um alerta antes de excluir e um depois da exclusão
    axios
      .delete(`http://localhost:4242/api/clube/${clubeId}`)
      .then((res) => console.log(res));

    // atualiza os clubes
    axios
      .get("http://localhost:4242/api/clubes", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((res) => {
        setClubesLocais(res);
      })
      .catch((error) => console.error(error));

    // Remove o clube da lista global
    const index = clubesLocais.findIndex((clube) => clube.id === clubeId);
    if (index > -1) {
      clubesLocais.splice(index, 1);
    }

    // Atualiza o estado local para forçar a re-renderização
    setClubesLocais([...clubesLocais]);
  };

  if (clubeSelecionado) {
    console.log(clubeSelecionado);
    return (
      <GerenciamentoTemas
        clubeInicial={clubeSelecionado}
        clubes={clubes}
        setClubes={setClubesLocais}
        voltarAoClube={() => setClubeSelecionado(null)}
      />
    );
  }

  return (
    <div className="home-container">
      <div className="quadrado">
        <h1>Clubes</h1>
        <div className="lista-clubes">
          {clubesLocais.map((clube) => (
            <div key={clube.id} className="clube-container">
              <span>
                {clube.emoji} {clube.nome}
              </span>
              <div>
                <button
                  style={{ marginRight: "15px" }}
                  onClick={() => handleSelecionarClube(clube)}
                >
                  Editar
                </button>
                <button onClick={() => excluirClube(clube.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
        <Link to="/area-coordenacao">
          <div className="botao-canto">
            <button onClick={onVoltarClick}>Voltar</button>
          </div>
        </Link>
        <Link to="/gerenciamento-coordenadores">
          <div>
            <button>Alterar Coordenadores</button>
          </div>
        </Link>
        <Link to="/novo-clube">
          <div className="botao-nav">
            <button onClick={onNovoClube}>Novo Clube</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GerenciamentoClubes;
