import { useState, useEffect, useContext } from "react";
import GerenciamentoTemas from "./GerenciamentoTemas";
import { Link } from "react-router-dom/dist";
import { AuthContext } from "../context/auth";
import axios from "axios";

const GerenciamentoClubes = ({ onVoltarClick, onNovoClube, clubes }) => {
  const [clubesLocais, setClubesLocais] = useState(clubes);
  const [clubeSelecionado, setClubeSelecionado] = useState(null);
  const { user } = useContext(AuthContext); // pegar usuário atual

  const handleSelecionarClube = (clube) => {
    setClubeSelecionado(clube);
  };

  const excluirClube = (clubeId) => {
    // Recuperar token do localStorage
    const token = user?.token || localStorage.getItem("user")?.token;

    // Verificar se token está disponível
    if(!token) {
      alert("Usuário não autenticado.");
      return;
    }

    // Mostrar pop-up de confirmação
    const confirmacao = window.confirm("Tem certeza que deseja excluir este clube?");

    if (!confirmacao) {
      return; // Se o usuário clicar em "Cancelar", interrompe a execução
    }

    axios
      .delete(`http://localhost:4242/api/clube/${clubeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log("Clube excluído com sucesso:", res.data);
        setClubesLocais(clubesLocais.filter((clube) => clube.cod !== clubeId));
      })
      .catch((error) => console.error(error));
  };

  // essa é uma boa parte para refatorar com routers talvez
  if (clubeSelecionado) {
    console.log(clubeSelecionado);
    return (
      <GerenciamentoTemas
        clubeInicial={clubeSelecionado}
        clubes={clubesLocais}
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
            <div key={clube.cod} className="clube-container">
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
                <button onClick={() => excluirClube(clube.cod)}>Excluir</button>
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
