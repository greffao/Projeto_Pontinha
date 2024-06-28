import { useState, useContext } from "react";
import GerenciamentoTemas from "./GerenciamentoTemas";
import EditarClube from "./EditarClube";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

const GerenciamentoClubes = ({ onVoltarClick, onNovoClube, clubes, setClubes }) => {
  const [clubesLocais, setClubesLocais] = useState(clubes);
  const [clubeSelecionado, setClubeSelecionado] = useState(null);
  const [modoEditarClube, setModoEditarClube] = useState(false);
  const { user } = useContext(AuthContext); // pegar usuário atual

  const handleSelecionarClube = (clube, modoEditar) => {
    setClubeSelecionado(clube);
    setModoEditarClube(modoEditar);
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
        const clubesAtualizados = clubesLocais.filter((clube) => clube.cod !== clubeId);
        setClubesLocais(clubesAtualizados);
        setClubes(clubesAtualizados); // Atualiza o estado do App
      })
      .catch((error) => console.error(error));
  };

  const atualizarClube = (clubeEditado) => {
    const clubesAtualizados = clubesLocais.map(clube => 
      clube.cod === clubeEditado.cod ? clubeEditado : clube
    );
    setClubesLocais(clubesAtualizados);
    setClubes(clubesAtualizados); // Atualiza o estado do App
  };

  if (clubeSelecionado && modoEditarClube) {
    return (
      <EditarClube
        clube={clubeSelecionado}
        onVoltarClick={() => setClubeSelecionado(null)}
        atualizarClube={atualizarClube} // Passa a função para atualizar o clube
      />
    );
  }

  if (clubeSelecionado && !modoEditarClube) {
    return (
      <GerenciamentoTemas
        clubeInicial={clubeSelecionado}
        clubes={clubesLocais}
        setClubes={setClubes}
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
                {clube.nome}
              </span>
              <div>
                <button
                  style={{ marginRight: "15px" }}
                  onClick={() => handleSelecionarClube(clube, true)}
                >
                  Editar
                </button>
                <button
                  style={{ marginRight: "15px" }}
                  onClick={() => handleSelecionarClube(clube, false)}
                >
                  Editar Temas
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
