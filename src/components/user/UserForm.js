import React, { Component } from 'react';
import axios from 'axios';

import Main from '../template/Main';
// import UserTable from './UserTable';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuários'
}

// const page = 0;
// const size = 3;

const baseUrl = `http://localhost:8080/users`;

const initialState = {
    user: {name: '', username: '', password: ''},
    // users: [],
    // totalElements: 0
}

class UserForm extends Component {
    state = {...initialState}

    // componentDidMount() {
    //     // this.fetchUsers();
    // }

    // fetchUsers = () => {
    //     axios(baseUrl + `?page=${page}&size=${size}`).then(response => {
    //         this.setState({ 
    //             user: initialState.user, 
    //             users: response.data.content, 
    //             totalElements: response.data.totalElements
    //         })
    //     })
    // }

    handleChange = event => {
        const user = {...this.state.user};
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    handleSubmit = event => {
        event.preventDefault();
        const user = this.state.user;
        const method = user.id ? 'put' : 'post';
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
        axios[method](url, user).then(response => {
            this.fetchUsers();
        })
    }

    clear = event => {
        event.preventDefault();
        this.setState({ user: initialState.user });
    }

    // loadItem = user => {
    //     this.setState({ user });
    // }

    // removeItem = user => {
    //     axios.delete(`${baseUrl}/${user.id}`).then(response => {
    //         this.fetchUsers();
    //     })
    // }

    renderForm() {
        const user = this.state.user;
        return (
            <form className="form" method="POST" onSubmit={this.handleSubmit}>
                 <div className="row">
                     <div className="col-12 col-md-6">
                         <div className="form-group">
                             <label>Usuário</label>
                             <input type="text" className="form-control" name="username" placeholder="Usuário" value={user.username} onChange={this.handleChange}></input>
                         </div>
                     </div>
                     <div className="col-12 col-md-6">
                         <div className="form-group">
                             <label>Nome</label>
                             <input type="text" className="form-control" name="name" placeholder="Nome" value={user.name} onChange={this.handleChange}></input>
                         </div>
                     </div>
                     <div className="col-12 col-md-6">
                         <div className="form-group">
                             <label>Senha</label>
                             <input type="password" className="form-control" name="password" placeholder="Senha" value={user.password} onChange={this.handleChange}></input>
                         </div>
                     </div>
                 </div>
                 <hr />
                 <div className="row">
                     <div className="col-12 d-flex justify-content-end">
                         <button type="submit" className="btn btn-primary">Salvar</button>
                         <button className="btn btn-secondary ml-2" onClick={this.clear}>Cancelar</button>
                     </div>
                 </div>
            </form>
        );
    }

    render() {
        return (
            <Main {...headerProps}>
                { this.renderForm() }
                {/* <UserTable items={this.state.users} loadItem={this.loadItem} removeItem={this.removeItem} totalElements={this.state.totalElements} size={size} /> */}
            </Main>
            
        );
    }
}

export default UserForm;