import Titulo from "./components/Titulo";
import Home from "./components/Home";
import Footer from "./components/Footer";
import QuemSomos from "./components/QuemSomos";
import Jogo from "./components/Jogo";
import AreaCoordenacao from "./components/AreaCoordenacao";
import GerenciamentoCoordenadores from "./components/GerenciamentoCoordenadores";
import NovoCoordenador from "./components/NovoCoordenador";
import useAuth from "./hooks/useAutentication";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import GerenciamentoClubes from "./components/GerenciamentoClubes";
import NovoClube from "./components/NovoClube";
import { useEffect, useState } from "react";
import axios from "axios";

/*Variável global temporária enquanto a gente
não tem o BD*/
const clubes = [
    { 
        id: 1, 
        nome: 'Inglês', 
        emoji: '📚',
        imagem: 'wallpaper.jpg',
        temas: [
            {
                nome: 'Animais',
                imagem: 'wallpaper.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
            {
                nome: 'Animais',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', alternativas: ['Horse', 'Cat', 'Dog', 'Lion'], imagemUrl: 'cavalo.jpg' },
                    { questao: 'Qual desses animais é o mais alto?', alternativas: ['Giraffe', 'Panda', 'Fox', 'Canguru'], imagemUrl: 'grupo-animais.avif' },
                    { questao: 'Qual animal é o mascote do Pontinha?', alternativas: ['Dinosaur', 'Cow', 'Chicken', 'Pig'], imagemUrl: 'dino-pontinha.png' }
                ]
            },
        ]
    },
    {
        id: 2,
        nome: 'História',
        emoji: '🏛️',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Civilizações Antigas',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual civilização construiu as pirâmides?', alternativas: ['Egípcios', 'Maias', 'Incas', 'Aztecas'], imagemUrl: 'piramides-egito.webp' },
                    { questao: 'Em que continente estava localizada a Grécia Antiga?', alternativas: ['Europa', 'Ásia', 'África', 'América'], imagemUrl: 'grecia-antiga.webp' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
    {
        id: 3,
        nome: 'Ciências',
        emoji: '🔬',
        imagem: 'cavalo.jpg',
        temas: [
            {
                nome: 'Corpo Humano',
                imagem: 'cavalo.jpg',
                perguntas: [
                    { questao: 'Qual órgão é responsável pela respiração?', alternativas: ['Coração', 'Pulmão', 'Rim', 'Fígado'], imagemUrl: 'orgaos.webp' },
                    { questao: 'Qual é a maior parte do corpo humano?', alternativas: ['Cabeça', 'Braço', 'Perna', 'Tronco'], imagemUrl: 'corpo-humano.wepb' }
                ]
            },
        ]
    },
];

const coordenadores = [
  { id: 1, login: "coordenador1", senha: "senha1" },
  { id: 2, login: "coordenador2", senha: "senha2" },
  { id: 3, login: "coordenador3", senha: "senha3" },
];

function App() {
  const { user } = useAuth();

  const [clubes, setClubes] = useState([]);
  const [coordenadores, setCoordenadores] = useState([]);

  // Sempre que o app for inicializado os clubes serão solicitados ao backend e serão passados aos componentes
  useEffect(() => {
    axios
      .get("http://localhost:4242/api/clube", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((res) => {
        setClubes(res);
      })
      .catch((error) => console.error(error));
  });

  // Sempre que o app for inicializado os coordenadores serão solicitados ao backend e serão passados aos componentes
  useEffect(() => {
    axios
      .get("http://localhost:4242/api/coordenador", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((res) => {
        setCoordenadores(res);
      })
      .catch((error) => console.error(error));
  });

  //todas as rotas dentro do ProtectedRoute precisam que o usuário esteja logado para serem acessadas
  const ProtectedRoute = ({ isAllowed, redirectPath = "/", children }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  };

  return (
    <Router>
      <div className="App">
        <Titulo />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/jogo" element={<Jogo clubes={clubes} />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/area-coordenacao" element={<AreaCoordenacao />} />

            <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
              <Route
                path="/gerenciamento"
                element={<GerenciamentoClubes clubes={clubes} />}
                exact
              />
              <Route
                path="/novo-clube"
                element={<NovoClube clubes={clubes} />}
                exact
              />
              <Route
                path="/gerenciamento-coordenadores"
                element={
                  <GerenciamentoCoordenadores coordenadores={coordenadores} />
                }
                exact
              />
              <Route
                path="/novo-coordenador"
                element={<NovoCoordenador coordenadores={coordenadores} />}
                exact
              />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
