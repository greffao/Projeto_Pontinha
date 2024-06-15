import { useState } from "react";
import useAuth from "../hooks/useAutentication";
import { Link, useNavigate } from "react-router-dom/dist";

const AreaCoordenacao = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    debugger;
    e.preventDefault();
    if (!login | !senha) {
      setError("Preencha todos os campos!");
      return;
    }

    const res = await signin(login, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/gerenciamento");
  };

  return (
    <div className="home-container">
      <div className="quadrado">
        <h1>Área de Coordenação</h1>
        <Link to="/">
          <div className="botao-canto">
            <button>Voltar</button>
          </div>
        </Link>
        <div className="formulario-login">
          <div className="input-container">
            <label className="label">Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-container">
            <label className="label">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="input-field"
            />
          </div>
          <button onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default AreaCoordenacao;
