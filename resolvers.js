import jwt from 'jsonwebtoken';
import { getData,getUsers,getdataMap } from "./database.js";
let data = getData();
let users = getUsers(); 

const resolvers = {
    Query : {
        getAllData: (parent,args,context) =>{ 
            if (!context.user) {
                throw new Error('Not authenticated');

                
            }
            return data
        },
        getDatabyId:(parent,args,context) => { 
            
                if (!context.user) {
                    throw new Error('Not authenticated');
    
                    
                }
               return data.find(p => p.id === args.id)
            },
        getUserData: (parent,args) =>{
            const dataMap=getdataMap();
            const userId = dataMap[args.username]
            if (!userId) return []
                return data.filter(person => userId.includes(person.id))
        },
        getUsers:() => users,
    },
    User:{

        userOwnData:(parent) =>{
            const dataMap=getdataMap();
            const userId = dataMap[parent.username]
            if (!userId) return []
                return data.filter(person => userId.includes(parent.id))
            

        }
    },
    Mutation: {
        addData:(parent,args,context) =>{
            if (!context.user) {
                throw new Error('Not authenticated');
              
            }
            if (data.find(b =>b.id === args.id)) {
                throw new Error('Record alredy existe')
            }else{
                const newData = {...args}
                data.concat(newData);
                return newData;
            }
        },
        login:(parent,{username,password}) =>{
            const user = users.find(user => user.username === username &&
                user.password === password);
                if(!user)
                    throw new Error('Invalid credentails')
    
                const token=jwt.sign({username:username}, 'my_secret_key',
                    {expiresIn:'1d'});
    
                const bearer_token='Bearer ' + token;
    
                user.token = token;
                return {"token": bearer_token,username}
        }
    } 

}

export default resolvers;