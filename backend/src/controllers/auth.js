const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Coordenador: CoordenadorModel } = require('../models/Coordenador');

module.exports = { register, login, validate };

const JWT_SECRET = 'uma-chave-secreta-muito-forte';

async function register(request, response) {
    const { login, senha } = request.body;

    if (!senha || !login) {
        return response.status(400).send("Informe usuário e senha!");
    }

    let user = await CoordenadorModel.findOne({ login });

    if (user) {
        return response.status(400).send("Usuário já cadastrado!");
    }

    const hashedPassword = bcrypt.hashSync(senha, bcrypt.genSaltSync());

    CoordenadorModel.create({ login, senha: hashedPassword })
        .then((result) => {
            const meuToken = getToken(result._id, result.login);
            response.status(201).send({ token: meuToken });
        })
        .catch((erro) => response.status(500).send(erro));
}

async function login(request, response) {
    debugger;
    const { login, senha } = request.body;

    if (!senha || !login) {
        return response.status(400).send("Informe usuário e senha!");
    }

    const user = await CoordenadorModel.findOne({ login });

    if (!user) {
        return response.status(400).send("Usuário não cadastrado!");
    }

    const isEqual = bcrypt.compareSync(senha, user.senha);

    if (!isEqual) {
        return response.status(401).send("Usuário e senha inválidos!");
    }

    const meuToken = getToken(user._id, user.login);
    response.status(200).json({ id: user._id, login: user.login, token: meuToken });
}

function getToken(id, login) {
    return jwt.sign({ id, login }, JWT_SECRET, { expiresIn: '1h' });
}

async function validate(request, response, next) {
    let token = request.headers.authorization;

    try {
        if (token && token.startsWith("Bearer")) {
            token = token.substring(7);
            const decodedToken = jwt.verify(token, JWT_SECRET);
            request.user = decodedToken;
            next();
        } else {
            throw new Error('Token não fornecido ou inválido');
        }
    } catch (e) {
        return response.status(401).send({ message: "Unauthorized" });
    }
}
