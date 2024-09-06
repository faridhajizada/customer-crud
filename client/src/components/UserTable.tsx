import { ReactElement, useEffect, useState } from "react";
import { AddUser, DeleteUser, UpdateUser, FetchAllUsers } from "../utils/CrudFunctions";
import './UserTable.css'; // Import the CSS module
import { Form } from "./Form";

type Address = {
    street: string,
    city: string,
    region: string | null,
    postalCode: string,
    country: string,
    phone: string
}

type User = {
    id: string,
    companyName: string,
    contactName: string,
    contactTitle: string,
    address: Address
}

export default function UserTable(): ReactElement {
    const [users, setUsers] = useState<User[]>([]);
    const [update, setUpdate] = useState(false);
    const [add, setAdd] = useState(false);
    const [u, setUser] = useState<User>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchAllUsers();
            if (data) {
                setUsers(data as User[]);
            } else {
                setUsers([]);
            }
        };
        fetchData();
    }, []);

    const HandleDelete = async (id: string) => {
        const success = await DeleteUser(id);
        if (success) {
            setUsers(users.filter(user => user.id !== id));
        }
    }

    const HandleUpdate = async (id: string, user: User) => {
        setUpdate(true);
        setUser(user);
        const success = await UpdateUser(id, user);
        if (success) {
            setUsers(users.map(u => (u.id === id ? user : u)));
        }
    }

    const HandleAdd = async () => {
        setAdd(true);
    }

    return (
        <div className={"table-container"}>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Contact Name</th>
                        <th>Contact Title</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>    
                            <>
                                <td>{user.id}</td>
                                <td>{user.companyName}</td>
                                <td>{user.contactName}</td>
                                <td>{user.contactTitle}</td>
                                <td>{`${user.address.street}, ${user.address.city}, ${user.address.region ?? ''}, ${user.address.postalCode}, ${user.address.country}`}</td>
                                <td>{user.address.phone}</td>
                            </>
                            <td>
                                <button
                                    className="update"
                                    onClick={() => HandleUpdate(user.id, user)}
                                    style={{ 
                                        backgroundColor: '#4CAF50', 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '10px 20px', 
                                        textAlign: 'center', 
                                        textDecoration: 'none', 
                                        display: 'inline-block', 
                                        fontSize: '16px', 
                                        margin: '4px 2px', 
                                        cursor: 'pointer', 
                                        borderRadius: '4px' 
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="delete"
                                    onClick={() => HandleDelete(user.id)}
                                    style={{ 
                                        backgroundColor: '#f44336', 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '10px 20px', 
                                        textAlign: 'center', 
                                        textDecoration: 'none', 
                                        display: 'inline-block', 
                                        fontSize: '16px', 
                                        margin: '4px 2px', 
                                        cursor: 'pointer', 
                                        borderRadius: '4px' 
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            { update && <Form setUsers={setUsers} use={u} users={users} setUpdate={setUpdate} forwhat={"update"} /> }
            { add && <Form setUsers={setUsers} users={users} setAdd={setAdd} forwhat={"add"} /> }
            <button
                onClick={HandleAdd}
                className="addbutton"
                style={{
                    backgroundColor: '#008CBA', 
                    color: 'white', 
                    border: 'none', 
                    padding: '10px 20px', 
                    textAlign: 'center', 
                    textDecoration: 'none', 
                    display: 'inline-block', 
                    fontSize: '16px', 
                    margin: '4px 2px', 
                    cursor: 'pointer', 
                    borderRadius: '4px' 
                }}
            >
                Add User
            </button>
        </div>
    );
}
