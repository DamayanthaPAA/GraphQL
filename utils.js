import jwt from 'jsonwebtoken';
import { getUsers } from './database.js';

//Middliwaye to extact user and verfy
const verifyToken = (bearer_token) =>{
    try {
        const token = bearer_token.replace('Bearer ','');
        if (token) {
            const decordedToken = jwt.verify(token,'my_secret_key');
            const now = Date.now()/1000;
            const isValid = (decordedToken.exp-now) >=0 ? true:false;
            if (isValid) {
                const users = getUsers();
                if(users.find(a => (a.username === decordedToken.username)&&(a.token === token))){
                    return decordedToken.username;
                }
            }

        }
        return null;
    } catch (error) {
        console.log('Bearer token verification eror',err);
        return null;
    }

   
}

export  {
    verifyToken
}