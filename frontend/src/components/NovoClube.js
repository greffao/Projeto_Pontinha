import { useState } from 'react'
import { Link } from 'react-router-dom/dist';

const NovoClube = ({ onVoltarClick, onEntrarClick, clubes }) => {
    const [nomeClube, setNomeClube] = useState('');

    const handleNomeChange = (e) => {
        setNomeClube(e.target.value);
    };

    const handleAlterarImagem = () => {
        // Placeholder para função que altera a imagem
        console.log('Alterar imagem para o clube:', nomeClube);
    };

    const handleCriarClube = () => {
        if (nomeClube) {  // Verifica se o nome não está vazio
            const novoClube = {
                id: clubes.length + 1,  // Atribui um novo ID baseado no comprimento do array
                nome: nomeClube,
                emoji: '',  // Emoji padrão, pode ser alterado depois
                temas: []  // Sem temas inicialmente
            };
            clubes.push(novoClube);  // Adiciona o novo clube ao array
            console.log('Clube adicionado:', novoClube);
            setNomeClube('');  // Limpa o campo de entrada
            onEntrarClick();
            // alert('Novo clube adicionado com sucesso!');
        } else {
            alert('Por favor, insira um nome para o clube.');  // Alerta se o campo estiver vazio
        }
    };

    
    return (
        <div className='home-container'>
        <div className='quadrado'>
            <h1 className="titulo-clubes">Novo Clube</h1>
            <input
                type="text"
                value={nomeClube}
                onChange={handleNomeChange}
                placeholder="Nome do Clube"
                className="input-clube"
            />
            <button onClick={handleAlterarImagem} className="botao-imagem">
                Alterar Imagem
            </button>
            <Link to='/gerenciamento'>
                <div className='botao-canto'>
                    <button onClick={onEntrarClick}>Cancelar</button>
                </div>
            </Link>
            <div className='botao-nav'>
                <button onClick={handleCriarClube}>Criar Novo Clube</button>
            </div>
        </div>
        </div>
    );
}

export default NovoClube;
