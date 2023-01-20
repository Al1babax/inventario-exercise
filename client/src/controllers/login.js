// Script to fetch the login data from the api route /login

export async function loginController(username, password){
    let response = await fetch(`http://localhost:4000/login?username=${username}&password=${password}`);
    let data = await response.json();
    return data;
}