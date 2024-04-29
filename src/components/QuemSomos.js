import { useState } from 'react'
// import imgQmSomos from "./src/images/fotoQuemSomos.jpg"
var imgQmSomos = require("../../src/images/fotoQuemSomos.jpg");

const QuemSomos = ({ onVoltarClick }) => {
    return (
        <div className='retangulo'>
            <img src={imgQmSomos} alt="A Equipe" class="imagem-Qm-Somos" />
            <h1>Quem somos</h1>
            <div className="retangulo">
                <p>O Projeto Pontinha tem o objetivo de promover integração entre a comunidade universitária e crianças de escolas públicas da cidade de São Carlos, por meio de oficinas, proporcionando a elas aprendizado de maneira lúdica e dinâmica. É responsável por conectar jovens universitários, que buscam realizar trabalho voluntário, às crianças carentes, e mais que isso, ao participarem do projeto, os universitários criam competências como autoconfiança, empatia, liderança, entre muitos outros benefícios, sendo um sistema que favorece a todos. </p>
            </div>
            <div className='botao-canto'>
                <button onClick={onVoltarClick}>Voltar</button>
            </div>
        </div>
    );
}
export default QuemSomos;