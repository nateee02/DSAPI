const restify = require("restify");
const errors = require("restify-errors");

// CONSTRUINDO UM SERVIDOR E CRIANDO CONEXÃO COM MYSQL
const servidor = restify.createServer({
    name : 'servidor' ,
    version : '1.0.0'
});

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.listen(8001 , function() {
    console.log("%s executando em %s" , servidor.name , servidor.url);
});

var knex = require('knex')({
    client : 'mysql' ,
    connection : {
        host : 'localhost' ,
        user : 'root' ,
        password : '' ,
        database  : 'loja_dsapi'
    }
});

// CONTRUÇÃO DE ROTAS PARA O VERBOS HTTP

// BOAS VINDAS
servidor.get('/' , (req , res , next) => {
    res.send('Bem-vindo(a) à API REST!');
});

//CONSULTAR PRODUTOS DISPONÍVEIS
servidor.get('/produtos_consultar' , (req , res , next) => {
    knex('produtos').then( (dados) =>{
        res.send(dados);
    } , next); 
});

// CONSULTAR UM PRODUTO ESPECÍFICO POR ID
servidor.get('/produtos_consultar_id/:id' , (req , res , next) => {
    const idProduto = req.params.id
    knex('produtos')
    .where('id' , idProduto)
    .first()
    .then( (dados) =>{ 
        if(!dados){
            return res.send(new errors.BadRequestError('Este produto não foi encontrado'))
        }
        res.send(dados);
    } , next); 
});

// LISTAR PEDIDOS REALIZADOS PELO CLIENTE - NÃO FINALIZADO
servidor.get('/pedidos_produtos/:idCliente' , (req , res , next) => {
    const idCliente = req.params.idCliente
    knex('pedidos_produtos')
    .where('id' , idPedido)
    .first()
    .then( (dados) =>{ 
        if(!dados){
            return res.send(new errors.BadRequestError('Este pedido não foi encontrado ou ele não existe'))
        }
        res.send(dados);
    } , next); 
});

// CADASTRO CLIENTES
servidor.post('/clientes_cadastrar' , (req , res , next) => {
    knex('clientes')
    .insert(req.body)
    .then( (dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Houve algum problema no cadastro do cliente'))
        }
        res.send(dados);
    } , next); 
});

// REALIZAR UM PEDIDO
servidor.post('/pedidos_produtos_realizar' , (req , res , next) => {
    knex('pedidos_produtos')
    .insert(req.body)
    .then( (dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Não foi possível realizar um novo pedido'))
        }
        res.send(dados);
    } , next); 
});

// CRIAÇÃO DE PRODUTOS PARA ADM
servidor.post('/produtos_cadastrar' , (req , res , next) => {
    knex('produtos')
    .insert(req.body)
    .then( (dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Não foi possível cadastrar este novo produto'))
        }
        res.send(dados);
    } , next); 
});

// ATUALIZAÇÃO DE PRODUTOS PARA ADM
servidor.put('/produtos_atualizar/:id' , (req , res , next) => {
    const idProduto = req.params.id
    knex('produtos')
    .where('id' , idProduto)
    .update(req.body)
    .then( (dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Este produto não foi encontrado'))
        }
        res.send(dados);
    } , next); 
});

// REMOÇÃO DE PRODUTOS
servidor.del('/produtos_deletar/:id' , (req , res , next) => {
    const idProduto = req.params.id
    knex('produtos')
    .where('id' , idProduto)
    .delete()
    .then( (dados) =>{ //se ele encontrar a tabela produto então (then) é executado
        if(!dados){
            return res.send(new errors.BadRequestError('Este produto não foi encontrado'))
        }
        res.send(dados);
    } , next); 
});