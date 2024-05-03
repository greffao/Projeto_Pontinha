import { useState } from 'react'
// import imgQmSomos from "./src/images/fotoQuemSomos.jpg"
var imgQmSomos = require("../../src/images/fotoQuemSomos.jpg");

const QuemSomos = ({ onVoltarClick }) => {
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
                <div className='botao-canto'>
                    <button onClick={onVoltarClick}>Voltar</button>
                </div>
            </div>
        </div>
    );
}
export default QuemSomos;