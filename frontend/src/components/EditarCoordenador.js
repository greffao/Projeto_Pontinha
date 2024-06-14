import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/dist';

const EditarCoordenador = ({ coordenador, onVoltarClick, onSalvarClick }) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if (coordenador) {
            setLogin(coordenador.login);
            setSenha(coordenador.senha);
        }
    }, [coordenador]);

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };

    const handleSalvar = () => {
        if (login && senha) {
            const coordenadorEditado = { ...coordenador, login, senha };
            onSalvarClick(coordenadorEditado);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className='home-container'>
            <div className='quadrado'>
                <h1 className="titulo-coordenadores">Editar Coordenador</h1>
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
                        <button onClick={onVoltarClick}>Cancelar</button>
                    </div>
                </Link>
                <div className='botao-nav'>
                    <button onClick={handleSalvar}>Salvar</button>
                </div>
            </div>
        </div>
    );
}

export default EditarCoordenador;
