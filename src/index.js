const express = require('express');
const { uuid } = require('uuidv4')

const app = express();
// aplicação criada :)

app.use(express.json());

const projects = [];

// get recebe dois parâmetros(rota, função que recebe os parametros(request, response))
app.get('/projects', (request, response) => {
    // const { title, owner } = request.query;
    // // desestruturando a resposta do query
    // console.log(title);
    // console.log(owner);

   return response.json(projects);
})

app.post('/projects', (request, response) => {
    // exemplo de request body
    const { title, owner } = request.body;

    const project = { id: uuid(), title: title, owner };

    projects.push(project);
    
    return response.json(project);
})

app.put('/projects/:id', (request, response) => {
    // exemplo de route params
    const { id } = request.params;

    console.log(id);
    
    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3',
    ]);
})

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 2',
        'Projeto 3',
    ]);
})
// a resposta pro frontend sempre será através do parâmetro response

app.listen(3333, () => {
    console.log('Back-end started!')
});
// assim poderemos abrir a aplicação no navegador

