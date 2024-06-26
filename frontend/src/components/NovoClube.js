import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth";

const NovoClube = ({ onVoltarClick, onEntrarClick, clubes, setClubes }) => {
  const [nomeClube, setNomeClube] = useState("");
  const [imagem, setImagem] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // pegar usuário atual

  const handleNomeChange = (e) => {
    setNomeClube(e.target.value);
  };

  const handleImagemChange = (e) => {
    setImagem(e.target.value);
  };

  // adicionando novo clube ao backend
  const handleCriarClube = () => {
    if (nomeClube) {
      // Verifica se o nome não está vazio
      const novoClube = {
        cod: clubes.length > 0 ? clubes[clubes.length - 1].cod + 1 : 1, // Atribui um novo ID baseado no comprimento do array
        nome: nomeClube,
        imagem: imagem,
        temas: [], // Sem temas inicialmente
      };

      // Recuperar token do localStorage
      const token = user?.token || localStorage.getItem("user")?.token;

      // Verificar se token está disponível
      if (!token) {
        alert("Usuário não autenticado.");
        return;
      }

      axios
        .post("http://localhost:4242/api/clube", novoClube, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        .then((res) => {
          console.log("Clube adicionado:", novoClube);
          const clubesAtualizados = [...clubes, novoClube];
          setClubes(clubesAtualizados); // Atualiza o estado do App
          alert("Novo clube adicionado com sucesso!");
          return res;
        })
        .catch((err) => {
          alert(err);
          return err;
        });
      setNomeClube(""); // Limpa o campo de entrada
      navigate("/gerenciamento");
    } else {
      alert("Por favor, insira um nome para o clube."); // Alerta se o campo estiver vazio
    }
  };

  return (
    <div className="home-container">
      <div className="quadrado">
        <h1 className="titulo-clubes">Novo Clube</h1>
        <input
          type="text"
          value={nomeClube}
          onChange={handleNomeChange}
          placeholder="Nome do Clube"
          className="input-clube"
        />
        <input
          type="text"
          value={imagem}
          onChange={handleImagemChange}
          placeholder="Link da Imagem"
          className="input-clube"
        />
        <Link to="/gerenciamento">
          <div className="botao-canto">
            <button onClick={onEntrarClick}>Cancelar</button>
          </div>
        </Link>
        <div className="botao-nav">
          <button onClick={handleCriarClube}>Criar Novo Clube</button>
        </div>
      </div>
    </div>
  );
};

export default NovoClube;
