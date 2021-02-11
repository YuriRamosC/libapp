const Cliente = require('../models/cliente');
const middlewaresAutenticacao = require('./middlewares-auth');
module.exports = app => {
    app.get('/clientes', middlewaresAutenticacao.bearer, (req, res) => {
        Cliente.lista(res, function (clientes) {
            res.status(200).json({ clientes: clientes });
        });
    })
    app.get('/clientes/:id', middlewaresAutenticacao.bearer, (req, res) => {
        const id = parseInt(req.params.id);
        Cliente.buscaPorId(id, res, (cliente) => {
            res.status(200).json({ cliente: cliente });
        });
    })
    app.post('/clientesUpdate', middlewaresAutenticacao.bearer, (req, res) => {
        const cliente = req.body
        Cliente.altera(cliente.id, cliente, res, (result) => {
            if (result.sqlState === '23000') {
                res.status(400).json({ 'error': 'Não foi possível alterar o cliente!', 'json': `${result}` });
            } else {
                res.status(201).json({ 'mensagem': 'cliente alterado com sucesso!', 'json': `${result}` });
            }
        });
    });
    app.post('/clientes', middlewaresAutenticacao.bearer, (req, res) => {
        const cliente = req.body
        Cliente.adiciona(cliente, res, (result) => {
            if (result.sqlState === '23000') {
                res.status(400).json({ 'error': 'Não foi possível adicionar o cliente!', 'json': `${result}` });
            } else {
                res.status(201).json({ 'mensagem': 'cliente adicionado com sucesso!', 'json': `${result}` });
            }
        });
    });
}