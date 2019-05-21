import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';//, Textarea, Scope 
import {  Link } from 'react-router-dom';

import  '../assets/css/Login.css';

class Login  extends Component{

    state = {
        listagem: [],
    };
    
    async componentDidMount() {
        this.subscribeToEvents();

        const response = await api.get('/users');
        this.setState({ listagem: response.data });

        //console.log(this.state.listagem);
        
    };

    subscribeToEvents = () => {
        const io = socket('http://localhost:4000');

        io.on('jogadores', data => {
            this.setState({ listagem: [data, ...this.state.listagem] });
        });

    };

    handleSubmit = async e => {
    
        const lista  = this.state.listagem;
        
        if(e.name && e.email){
            if(lista.length != 0){
               
                lista.forEach(itens => {
                    if(itens.email == e.email){
                        alert("Bora Iniciar ...");
                        localStorage.setItem('@JOGADOR:username', itens._id);
                        window.location.href ='/jogo'
                    }else{

                        api.post('/users', {
                            name: e.name,
                            email: e.email,
                            pontuacao: 0
                        });

                        alert("Cadastro Confirmado!");
                        const button = document.getElementById("cadastrar");
                        button.innerHTML = "Entrar";
        
                        lista.forEach(itens => {
                            if(itens.email == e.email){
                                localStorage.setItem('@JOGADOR:username', itens._id);
                                window.location.href ='/jogo'
                            }
                        });

                    }
                });

              

            }else{
                alert("Cadastro Confirmado!");

                api.post('/users', {
                    name: e.name,
                    email: e.email,
                    pontuacao: 0
                });

                const response = await api.get('/users');

                const button = document.getElementById("cadastrar");
                button.innerHTML = "Entrar";

                response.forEach(itens => {
                    if(itens.email == e.email){
                        localStorage.setItem('@JOGADOR:username', itens._id);
                        window.location.href ='/jogo'
                    }
                });
                
            }
        }else{
            alert("PREENCHA TODOS OS CAMPOS!");
        }


    };


  render(){

    return (
        <div className="areaForm" >
            <label className="titleJogoLogin">Bora Jogar?</label><br/><br/>
            
            <Form className="areaFormDados" onSubmit={this.handleSubmit} >
                <div>
                    <label>Nome: </label><br/>
                    <Input name="name" /> <br/><br/>
                </div>    

                <div>
                    <label>E-mail: </label><br/>
                    <Input name="email" /><br/><br/><br/>
                </div>
                
                <div>
                    <button type="submit" id="cadastrar" >Cadastrar</button><br/>
                    <br/>
                    <Link to="/pontuacao" className="pontuacoes" >Lista de Pontuações</Link>

                </div>

            </Form>
        </div>
    );
    
  }

}

export default Login;