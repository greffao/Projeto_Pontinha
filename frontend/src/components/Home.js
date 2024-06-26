import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='home-container'>
            <div className='quadrado'>
                
                <div className='titulo-container'>
                    <h3>Jogo do Pontinha!</h3>
                </div>

                <div className='botoes-menu'>
                    <Link to="/jogo">
                        <button>Jogar</button>
                    </Link>
                    <Link to="/quem-somos">
                        <button>Quem somos</button>
                    </Link>
                    <Link to="/creditos">
                        <button>Créditos</button>
                    </Link>
                </div>
                <div className='botao-canto'>
                    <Link to="/area-coordenacao">
                        <button>Área da coordenação</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
