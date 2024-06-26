import { Link } from 'react-router-dom';

const QuemSomos = () => {
    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1>Créditos</h1>
                <p>
                O website foi desenvolvido por estes alunos do curso Bacharelado em Ciências de Computação do
                Instituo de Ciências Matemáticas e de Computação da Universidade de São Paulo, em São Carlos (ICMC-USP):
                </p>
                <ul>
                    <li>Lucas Greff Meneses</li>
                    <li>Felipe Scholucha Martinez Roldan</li>
                    <li>Felipe Yuri Santos</li>
                    <li>Vinicius Carneiro Macedo</li>
                    <li>Vitor Hugo Almeida Couto</li>
                    <li>Yuri Fernandes Pereira</li>   
                </ul>
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