import React, { Component } from 'react';
import Main from '../template/Main';
import Pagination from '../template/Pagination';
import api from '../../services/api';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuários'
}

class UserTable extends Component {
    state = {
        users: [],
        size: 5,
        totalElements: 0,
        activePage: 1
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async (page = 0) => {
       try {
            const response = await api.get(`/users?page=${page}&size=${this.state.size}`);
            this.setState({ users: response.data.content, totalElements: response.data.totalElements });
       } catch (exception) {
            console.error(exception.message);
       }
    }

    handlePage = pageNumber => {
        this.fetchUsers(pageNumber - 1);
        this.setState({ activePage: pageNumber })
    }

    handleForm = () => {
        this.props.history.push('/userForm/0');
    }

    handleEdit = user => {
        this.props.history.push(`/userForm/${user.id}`);
    }

    handleDelete = async user => {
        try {
            await api.delete(`/users/${user.id}`);
            this.fetchUsers();
       } catch (exception) {
            console.error(exception.message);
       }
    }

    renderRows = () => {
        return this.state.users.map(user => (
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>
                    <button className="btn btn-warning" onClick={() => this.handleEdit(user)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger ml-2" onClick={() => this.handleDelete(user)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <Main {...headerProps}>
                <div>
                    <button className="btn btn-primary" onClick={this.handleForm}>
                        <i className="fa fa-pencil"> Novo</i>
                    </button>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                    <Pagination totalElements={this.state.totalElements} 
                                size={this.state.size}
                                activePage={this.state.activePage}
                                onChange={this.handlePage} />
                </div>
            </Main>
        );
    }
}

export default UserTable;
