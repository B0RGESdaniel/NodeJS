const express = require('express');

const app = express();
// aplicação criada :)

app.use(express.json());

// get recebe dois parâmetros(rota, função que recebe os parametros(request, response))
app.get('/projects', (request, response) => {
    const { title, owner } = request.query;
    // desestruturando a resposta do query
    console.log(title);
    console.log(owner);

   return response.json([
       'Projeto 1',
       'Projeto 2',
   ]);
})

app.post('/projects', (request, response) => {
    // exemplo de request body
    const { title, owner } = request.body;

    console.log(`este é o ${title} de ${owner}`);
    
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3',
    ]);
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

