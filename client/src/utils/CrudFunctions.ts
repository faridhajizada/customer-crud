async function FetchAllUsers() {

    try {
        const response = await fetch('http://localhost:3000/users');

        let data: Object[];

        if (response.ok) {
            data = await response.json();

            return data;
        } 

        return [];
    } catch(err) {
        console.error(err);
    }

}


async function AddUser(user: Object) {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            return true;
        }

        return false;
    } catch(err) {
        console.error(err);
    }
}

async function DeleteUser(id: string) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            return true;
        }

        return false;
    } catch(err) {
        console.error(err);
    }
}

async function UpdateUser(id: string, user: Object) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            return true;
        }

        return false;
    } catch(err) {
        console.error(err);
    }
}


export {
    FetchAllUsers,
    AddUser,
    DeleteUser,
    UpdateUser
};