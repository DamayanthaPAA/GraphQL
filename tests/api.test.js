import request from 'supertest';
import server from '../apiserver.js';
import {startStandaloneServer} from '@apollo/server/standalone';
import {verifyToken} from '../utils.js';
let app;
let token;
let user;

beforeAll(async () => {
    const {url} = await startStandaloneServer(server, {
        context: ({req}) => {
            const token = req.headers.authorization || '';
            const user = verifyToken(token);
            return { user }; 
        },
        listen: {port: 4000}
    });
    
    app = url;
    const response = await request(app)
    .post('/')
    .send({
        query: `
            mutation {
                login(username: "jk", password: "sala") {
                    token
                    username
                }
            }
        `
    })
    
    token = response.body.data.login.token;
    user = response.body.data.login.username;
})

describe('GraphQL query tests', () => {
    test('Test getAllData', async () => {
        const response = await request(app)
        .post('/')
        .set('Authorization', token)
        .send({
            query: `
                query {
                    getAllData {
                        id
                        Firstname
                        Surname
                    }
                }
            `
        });
        
        const testData = response.body.data.getAllData[0];

        expect(response.status).toBe(200);
        expect(testData).toEqual({
            id: '1',
            Firstname: 'Jyri',
            Surname: 'Kemppainen'
        })
    })
})

afterAll(async () => {
    await server.stop()
})