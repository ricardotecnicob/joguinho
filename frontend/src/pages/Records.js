import React, { Component } from 'react';
import '../assets/css/Records.css';

import Lista from '../pages/Lista';
import api from '../services/api';

class Records extends Component {

  state = {
    lista: [],
  };

    async componentDidMount() {

        const response = await api.get('/users');
        this.setState({ lista: response.data });

        console.log(response.data);

    };

    handleVoltar(){
      window.location.href="/";
    }

  render() {
    return (
        <div className="areaTable">
            <h1>PONTUAÇÕES</h1><br/>

            <center><button onClick={this.handleVoltar} className="btnInicio" >VOLTAR PARA O INÍCIO</button></center>

            <ul className="ulTitle">
                <li>Nome</li>
                <li>E-mail</li>
                <li>Pontuação</li>
            </ul>

            {
                this.state.lista.map(user => (
                    <Lista key={user._id} user={user}  />
                ))
            }

            <br/>
              
            <br/>
        </div>
    );
  }
}

export default Records;
