export const BASE_URL = 'http://localhost:3003';

export const register = ({email, name, link, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, link, password })
    })
        .then((response) => {
            console.log(response)
            return response.json();
        })

        .catch((err) => console.log(err));
};
export const authorize = ({ email, password, name }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    })
        .then((response => response.json()))

        .catch(err => console.log(err))
};


export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
}