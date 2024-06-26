# Projeto Pontinha

Lucas Greff Meneses - 13671615 <br>
Yuri Fernandes Pereira - 13730127 <br>
Felipi Yuri Santos - 11917292 <br>
Felipe Scholucha Martinez Roldan - 13671873 <br>
Vinicius Carneiro Macedo - 11915752 <br>
Vitor Hugo Almeida Couto - 13672787 <br>
*Instituto de Ciências Matemáticas e de Computação* <br>
*Universidade de São Paulo* <br>

O "Jogo do Pontinha" é um website interativo de perguntas e respostas no formato quiz, especialmente desenvolvido para o Projeto Pontinha. Este jogo educativo visa promover a integração entre universitários e crianças de bairros carentes, através de uma plataforma lúdica que permite aos usuários jogadores acessar diferentes menus e responder perguntas, enquanto os usuários coordenadores têm a capacidade de gerenciar o conteúdo do quiz.

[Drive com os documentos](https://drive.google.com/drive/u/1/folders/1Kp4l4wmGyN-o173UJA1Z_BRWZ9riUMh0)

### Protótipos de Alta Fidelidade

Protótipos desenvolvidos no WireframePro.

[Quem somos, Fale Conosco](https://wireframepro.mockflow.com/view/MDN5mCYJPh#/page/6fe92076b04a4d8597cca1188d6d06a9)

[Login, Cadastro, Menu Jogo](https://wireframepro.mockflow.com/view/M81pvm6ovqb#/page/D0ab6cdc25eacf7f633366f5c2090e823)

[Escolher Clube e Tema, Perguntas](https://wireframepro.mockflow.com/view/MUXZETQ8uqb#/page/057e01fda35b468ab5153320973d3bc7)

[Coordenação, Gerenciar Clubes](https://wireframepro.mockflow.com/view/Mb9wHGxKPh#/page/454a03018329409d94c0916848932e17)

[Gerenciar Temas e Perguntas Parte 1](https://wireframepro.mockflow.com/view/M4jMmA84vqb#/page/1e395dc03ace4fbaad452f7876784f43)

[Gerenciar Temas e Perguntas Parte 2](https://wireframepro.mockflow.com/view/MIDSsV35vqb#/page/b773fe78fb2a4da28c1ff00aa9182505)

### Frontend

Para executar o Frontend, navegue até a pasta "frontend" e digite os seguintes comandos:

Para instalar as dependências:

```
npm install
```

Para inicializar o site:

```
npm start
```

Após executar o último comando, uma janela deve se abrir no seu navegador com o frontend do site.

### Backend


API do Banco de Dados desenvolvido para o jogo.

Para executar uma instância da API em localhost, primeiro é necessário instalar as dependências necessárias. ATENÇÃO: Esses comandos devem ser executados em nível de diretório `backend/`, e não na raiz do diretório `/`.

```bash
npm i express mongoose cors bcrypt bcryptjs jsonwebtoken
```

Além disso, caso for trabalhar com o desenvolvimento da API, é necessário instalar dependências de desenvolvimento:

```bash
npm install nodemon --save-dev
```

Para rodar a API para desenvolvimento, existe o comando dev em Scripts em package.JSON, então utilize:

```bash
npm run dev
```

Para rodar a API para Runtime, utilize o comando:

```bash
npm run start
```
