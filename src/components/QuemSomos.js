import { Link } from 'react-router-dom';

const QuemSomos = () => {
    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1>Quem somos</h1>
                <p> O Projeto Pontinha tem o objetivo de promover integração entre a comunidade 
                    universitária e crianças de escolas públicas da cidade de São Carlos, por meio 
                    de oficinas, proporcionando a elas aprendizado de maneira lúdica e dinâmica. É 
                    responsável por conectar jovens universitários, que buscam realizar trabalho 
                    voluntário, às crianças carentes, e mais que isso, ao participarem do projeto, 
                    os universitários criam competências como autoconfiança, empatia, liderança, 
                    entre muitos outros benefícios, sendo um sistema que favorece a todos. </p>
                <Link to="/">
                    <div className='botao-canto'>
                        <button>Voltar</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default QuemSomos;