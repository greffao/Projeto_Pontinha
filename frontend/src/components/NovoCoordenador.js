import { useState } from 'react';
import { Link } from 'react-router-dom/dist';

const NovoCoordenador = ({ onVoltarClick, onEntrarClick, coordenadores }) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };

    const handleCriarCoordenador = () => {
        if (login && senha) { // Verifica se ambos login e senha não estão vazios
            const novoCoordenador = {
                id: coordenadores.length + 1, // Atribui um novo ID baseado no comprimento do array
                login: login,
                senha: senha,
            };
            coordenadores.push(novoCoordenador); // Adiciona o novo coordenador ao array
            console.log('Coordenador adicionado:', novoCoordenador);
            setLogin(''); // Limpa o campo de entrada
            setSenha(''); // Limpa o campo de entrada
            // alert('Novo coordenador adicionado com sucesso!');
        } else {
            alert('Por favor, insira o login e a senha para o coordenador.'); // Alerta se os campos estiverem vazios
        }
    };

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1 className="titulo-coordenadores">Novo Coordenador</h1>
                <input
                    type="text"
                    value={login}
                    onChange={handleLoginChange}
                    placeholder="Login do Coordenador"
                    className="input-coordenador"
                />
                <input
                    type="password"
                    value={senha}
                    onChange={handleSenhaChange}
                    placeholder="Senha do Coordenador"
                    className="input-coordenador"
                />
                <Link to='/gerenciamento-coordenadores'>
                    <div className='botao-canto'>
                        <button onClick={onEntrarClick}>Cancelar</button>
                    </div>
                </Link>
                <div className='botao-nav'>
                    <button onClick={handleCriarCoordenador}>Criar Novo Coordenador</button>
                </div>
            </div>
        </div>
    );
}

export default NovoCoordenador;
