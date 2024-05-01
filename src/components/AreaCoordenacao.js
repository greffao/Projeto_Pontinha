import { useState } from 'react';

const AreaCoordenacao = ({ onVoltarClick, onEntrarClick}) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    // const handleEntrarClick = () => {
    //     console.log("Login:", login, "Senha:", senha);
    //     // Adicione aqui a lógica de autenticação e redirecionamento
    // };

    return (
        <div className='quadrado'>
            <h1>Área de Coordenação</h1>
            <div className='botao-canto'>
                <button onClick={onVoltarClick}>Voltar</button>
            </div>
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
                <button onClick={onEntrarClick}>Entrar</button>
            </div>
        </div>
    );
}

export default AreaCoordenacao;