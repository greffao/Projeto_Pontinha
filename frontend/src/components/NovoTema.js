import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import { AuthContext } from "../context/auth";

const NovoTema = ({ onVoltarClick, clube }) => {
  const [nomeTema, setNomeTema] = useState("");
  const [imagem, setImagem] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // pegar usuário atual

  const handleNomeChange = (e) => {
    setNomeTema(e.target.value);
  };

  const handleImagemChange = (e) => {
    setImagem(e.target.value);
  };

  //adicionando novo tema ao backend
  const handleCriarTema = () => {
    if (nomeTema) {
      // Verifica se o nome não está vazio
      const novoTema = {
        cod: clube.temas.length > 0 ? clube.temas[clube.temas.length - 1].cod + 1 : 1,  // Atribui um novo ID baseado no comprimento do array
        nome: nomeTema,
        imagem: imagem,
        perguntas: [], // Sem perguntas inicialmente
      };

      // Recuperar token do localStorage
      const token = user?.token || localStorage.getItem("user")?.token;

      // Verificar se token está disponível
      if(!token) {
        alert("Usuário não autenticado.");
        return;
      }
      const temas = clube.temas;
      temas.push(novoTema);
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
          console.log("Tema adicionado com sucesso:", res.data);
      })
      .catch((error) => console.error(error));
      setNomeTema(""); // Limpa o campo de entrada
      onVoltarClick();
      navigate("/gerenciamento");
    } else {
      alert("Por favor, insira um nome para o tema."); // Alerta se o campo estiver vazio
    }
  };

  return (
    <div className="home-container">
      <div className="quadrado">
        <h1 className="titulo-clubes">Novo Tema</h1>
        <input
          type="text"
          value={nomeTema}
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
        <Link to="/gerenciamento">
          <div className="botao-canto">
            <button onClick={onVoltarClick}>Cancelar</button>
          </div>
        </Link>
        <div className="botao-nav">
          <button onClick={handleCriarTema}>Criar Novo Tema</button>
        </div>
      </div>
    </div>
  );
};

export default NovoTema;
