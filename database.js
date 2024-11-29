let users = [
    {"username": "jk", "password": "sala", 'token': '',
        "rateLimiting": { "window": 0, "requestCounter": 0 } },
    {"username": "pl", "password": "pass", 'token': '',
        "rateLimiting": { "window": 0, "requestCounter": 0 } }
]

let data = [
    { "id": "1", "Firstname": "Jyri", "Surname": "Kemppainen" },
    { "id": "2", "Firstname": "Petri", "Surname": "Laitinen" },
    { "id": "3", "Firstname": "Heikki", "Surname": "Helppo" }
]

let dataMap = {
    jk: ["1","3"],
    pl: ["2"]
}

const getUsers = () => {
    return users
}

const getData = () => {
    return data
}
const getdataMap = () => {
    return data
}

export {
    getUsers,
    getData,
    getdataMap
}