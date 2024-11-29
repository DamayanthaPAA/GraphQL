import server from "./appserver.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { verifyToken} from './utils.js'

const {url}= await startStandaloneServer(server,{

    context: ({req}) => {
        const token = req.headers.authorization || '';
        const user = verifyToken(token);
        return {user};
    },


    listen: {port:4000}
});

console.log(`Server ready at: + ${url}`);