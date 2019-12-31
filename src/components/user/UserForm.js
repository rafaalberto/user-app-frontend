import React, { Component } from 'react';
import Main from '../template/Main';
import api from '../../services/api';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuários'
}

const initialState = {
    user: {name: '', username: '', password: ''},
    id: 0
}

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {...initialState, id: props.match.params.id}
    }
    
    componentDidMount() {
        const { id }  = this.state;
        if(id !== "0") {
            this.fetchUser(id);
        }
    }

    fetchUser = async (id) => {
        try {
             const response = await api.get(`/users/${id}`);
             this.setState({ user: response.data });
        } catch (exception) {
             console.error(exception.message);
        }
    }

    handleChange = event => {
        const user = {...this.state.user};
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const user = this.state.user;
        const method = user.id ? 'put' : 'post';
        const url = user.id ? `/users/${user.id}` : `/users`;

        try {
            await api[method](url, user);
            this.props.history.push('/users');
        } catch (exception) {
            console.error(exception.message);
        }
    }
    
    handleCancel = event => {
        event.preventDefault();
        this.props.history.push('/users');
    }

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
                         <button className="btn btn-secondary ml-2" onClick={this.handleCancel}>Cancelar</button>
                     </div>
                 </div>
            </form>
        );
    }

    render() {
        return (
            <Main {...headerProps}>
                { this.renderForm() }
            </Main>
        );
    }
}

export default UserForm;