import React from 'react';

const UserTable = props => {
    const {items: users} = props;

    const load = user => {
        props.loadItem(user);
    }

    const remove = user => {
        props.removeItem(user);
    }
    
    const renderRows = () => {
        return users.map(user => (
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>
                    <button className="btn btn-warning" onClick={() => load(user)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger ml-2" onClick={() => remove(user)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        ));
    }

    return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>Usuário</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
}

export default UserTable;
