import Titulo from "./components/Titulo";
import Home from "./components/Home";
import Footer from "./components/Footer";
import QuemSomos from "./components/QuemSomos";
import Creditos from "./components/Creditos"
import Jogo from "./components/Jogo";
import AreaCoordenacao from "./components/AreaCoordenacao";
import GerenciamentoCoordenadores from "./components/GerenciamentoCoordenadores";
import NovoCoordenador from "./components/NovoCoordenador";
import useAuth from "./hooks/useAutentication";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import GerenciamentoClubes from "./components/GerenciamentoClubes";
import NovoClube from "./components/NovoClube";
import EditarClube from "./components/EditarClube";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const { user } = useAuth();

  const [clubes, setClubes] = useState([]);

  // Sempre que o app for inicializado os clubes serão solicitados ao backend e serão passados aos componentes
  useEffect(() => {
    axios
      .get("http://localhost:4242/api/clube", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setClubes(res.data);
      })
      .catch((error) => console.error(error));
  },[]);


  //todas as rotas dentro do ProtectedRoute precisam que o usuário esteja logado para serem acessadas
  const ProtectedRoute = ({ isAllowed, redirectPath = "/", children }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  };

  return (
    <Router>
      <div className="App">
        <Titulo />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/jogo" element={<Jogo clubes={clubes} />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/creditos" element={<Creditos />} />
            <Route path="/area-coordenacao" element={<AreaCoordenacao />} />

            <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
            <Route
              path="/gerenciamento"
              element={<GerenciamentoClubes clubes={clubes} setClubes={setClubes} />}
              exact
            />
            <Route
              path="/novo-clube"
              element={<NovoClube clubes={clubes} setClubes={setClubes} />}
              exact
            />
            <Route
                path="/editar-clube/:clubeId"
                element={<EditarClube clubes={clubes} setClubes={setClubes} />}
                exact
              />
            <Route
              path="/gerenciamento-coordenadores"
              element={
                <GerenciamentoCoordenadores />
              }
              exact
            />
            <Route
              path="/novo-coordenador"
              element={<NovoCoordenador />}
              exact
            />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
