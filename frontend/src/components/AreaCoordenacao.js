import { useState } from 'react';
import { Link } from 'react-router-dom/dist';

const AreaCoordenacao = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1>Área de Coordenação</h1>
                <Link to='/'>
                    <div className='botao-canto'>
                        <button>Voltar</button>
                    </div>
                </Link>
                {/**
                 * TO-DO: Fazer a autenticação
                 */}
                <div className='formulario-login'>
                    <div className="input-container">
                        <label className="label">
                            Login
                        </label>
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className='input-field'
                        />
                    </div>
                    <div className="input-container">
                        <label className="label">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className='input-field'
                        />
                    </div>
                    <Link to='/gerenciamento'>
                        <button>Entrar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AreaCoordenacao;