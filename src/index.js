const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
// aplicação criada :)

app.use(express.json());

const projects = [];

// get recebe dois parâmetros(rota, função que recebe os parametros(request, response))
app.get('/projects', (request, response) => {
    const { title } = request.query;
    const result = title
        ? projects.filter(project => project.title.includes(title))
        : projects
    
    // const { title, owner } = request.query;
    // // desestruturando a resposta do query
    // console.log(title);
    // console.log(owner);

   return response.json(result);
})

app.post('/projects', (request, response) => {
    // exemplo de request body
    const { title, owner } = request.body;

    const project = { id: uuidv4(), title: title, owner };

    projects.push(project);
    
    return response.json(project);
})

app.put('/projects/:id', (request, response) => {
    // exemplo de route params
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json({ error: 'Project not found'})
    }

    const project = { 
        id, 
        title,
        owner,
    }
    
    projects[projectIndex] = project
    
    return response.json(project);
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;
    
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json({ error: 'Project not found'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
})
// a resposta pro frontend sempre será através do parâmetro response

app.listen(3333, () => {
    console.log('Back-end started!')
});
// assim poderemos abrir a aplicação no navegador

