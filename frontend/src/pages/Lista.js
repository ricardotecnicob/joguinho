import React, { Component } from 'react';

export default class Lista extends Component {

  render() {
        const { user } = this.props;
    return (

        <ul className="ulConteudo">
            <li>{user.name}</li>
            <li>{user.email}</li>
            <li>{user.pontuacao} pts</li>
        </ul>

    );
  }

  
}
