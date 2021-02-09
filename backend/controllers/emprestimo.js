const Emprestimo = require('../models/emprestimo');
const passport = require('passport');
const middlewaresAutenticacao = require('./middlewares-auth');
module.exports = app => {
    app.get('/emprestimos',middlewaresAutenticacao.bearer, (req, res) => {
        Emprestimo.lista(res, function (emprestimos) {
            res.status(200).json({ emprestimos: emprestimos });
        });
    })
    app.get('/emprestimos-por-cliente/:id',middlewaresAutenticacao.bearer, (req, res) => {
        const id = parseInt(req.params.id);
        Emprestimo.buscaPorIdCliente(id, res, (emprestimo) => {
            res.status(200).json({ emprestimo: emprestimo });
        });
    })
    app.get('/emprestimos-por-livro/:id',middlewaresAutenticacao.bearer, (req, res) => {
        const id = parseInt(req.params.id);
        Emprestimo.buscaPorIdLivro(id, res, (emprestimo) => {
            res.status(200).json({ emprestimo: emprestimo });
        });
    })
    app.post('/emprestimos',middlewaresAutenticacao.bearer, (req, res) => {
        const emprestimo = req.body

        Emprestimo.adiciona(emprestimo, res, (result)=> {
            if(result.sqlState === '23000') {
                res.status(400).json({'error': 'Não foi possível adicionar o emprestimo!'});
            } else {
                res.status(201).json({'mensagem': 'Emprestimo adicionado com sucesso!'});
            }
        });
    });
}