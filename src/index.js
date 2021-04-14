const express = require('express');
const { uuid, validate } = require('uuid');

const app = express();
// aplicação criada :)

app.use(express.json());

const projects = [];

function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next(); // próximo middleware ou rota
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!validate(id)) {
        return response.status(400).json({error: 'Invalid project ID'})
    }

    return next();
}

app.use(logRequests);
// * outra maneira de usar middlewares
// app.use('/projects/:id', validateProjectId);

// get recebe dois parâmetros(rota, função que recebe os parametros(request, response))
app.get('/projects', (request, response) => {
    const { title } = request.query;
    const result = title
        ? projects.filter(project => project.title.includes(title))
        : projects
    // checa se o título do projeto tem o mesmo título declarado na URL

    // const { title, owner } = request.query;
    // // desestruturando a resposta do query
    // console.log(title);
    // console.log(owner);

   return response.json(result);
})

app.post('/projects', (request, response) => {
    // exemplo de request body
    // pegando as props do body da requisição
    const { title, owner } = request.body;

    // criando id unico para o projeto
    const project = { id: uuid(), title: title, owner };

    // adicionando o projeto no array
    projects.push(project);
    
    return response.json(project);
})

app.put('/projects/:id', validateProjectId, (request, response) => {
    // exemplo de route params
    // pegando o id da url
    const { id } = request.params;
    // pegando as props do body da requisição
    const { title, owner } = request.body;

    // localizando o id do projeto desejado
    const projectIndex = projects.findIndex(project => project.id === id);

    // checando se o projeto existe
    if (projectIndex < 0){
        return response.status(400).json({ error: 'Project not found'})
    }

    // adicionando as novas props do objeto a ser alterado
    const project = { 
        id, 
        title,
        owner,
    }
    
    // substituindo
    projects[projectIndex] = project
    
    return response.json(project);
})

app.delete('/projects/:id', validateProjectId, (request, response) => {
    // pegando o id da url
    const { id } = request.params;
    
    // localizando o id do projeto desejado
    const projectIndex = projects.findIndex(project => project.id === id);

    // checando se o projeto existe
    if (projectIndex < 0){
        return response.status(400).json({ error: 'Project not found'})
    }

    // removendo o projeto
    projects.splice(projectIndex, 1);

    return response.status(204).send();
})

// ! a resposta pro frontend sempre será através do parâmetro response

app.listen(3333, () => {
    console.log('Back-end started!')
});
// assim poderemos abrir a aplicação no navegador

