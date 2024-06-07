import Titulo from './components/Titulo'
import Home from './components/Home'
import Footer from './components/Footer';
import QuemSomos from './components/QuemSomos';
import Jogo from './components/Jogo';
import AreaCoordenacao from './components/AreaCoordenacao';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GerenciamentoClubes from './components/GerenciamentoClubes';
import NovoClube from './components/NovoClube';

/*Variável global temporária enquanto a gente
não tem o BD*/
const clubes = [
    { 
        id: 1, 
        nome: 'Inglês', 
        emoji: '📚', 
        temas: [
            {
                nome: 'Animais',
                perguntas: [
                    { questao: 'Qual é o nome desse animal?', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
        ]
    },
    {
        id: 2,
        nome: 'História',
        emoji: '🏛️',
        temas: [
            {
                nome: 'Civilizações Antigas',
                perguntas: [
                    { questao: 'Qual civilização construiu as pirâmides?', alternativas: ['Egípcios', 'Maias', 'Incas', 'Aztecas'], imagemUrl: 'piramides-egito.webp' },
                    { questao: 'Em que continente estava localizada a Grécia Antiga?', alternativas: ['Europa', 'Ásia', 'África', 'América'], imagemUrl: 'grecia-antiga.webp' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        temas: [
            {
                nome: 'Corpo Humano',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
];

function App() {
    return (
        <Router>
            <div className="App">
                <Titulo />
                    <div className="content">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/jogo" element={<Jogo clubes={clubes} />} />
                            <Route path="/quem-somos" element={<QuemSomos />} />
                            <Route path="/area-coordenacao" element={<AreaCoordenacao />}/>
                            <Route path="gerenciamento" element={<GerenciamentoClubes clubes={clubes}/>} />
                            <Route path="novo-clube" element={<NovoClube clubes={clubes}/>} />
                        </Routes>
                    </div>
                <Footer />
            </div>
        </Router>
    );
    }

export default App;
