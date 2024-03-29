const Livro = require('../models/livro');
const passport = require('passport');
const middlewaresAutenticacao = require('./middlewares-auth');
module.exports = app => {
    app.get('/livros',middlewaresAutenticacao.bearer, (req, res) => {
        Livro.lista(res, function (livros) {
            res.status(200).json({ livros: livros });
        });
    })
    app.get('/livros/:id',middlewaresAutenticacao.bearer, (req, res) => {
        const id = parseInt(req.params.id);
        Livro.buscaPorId(id, res, (livro) => {
            res.status(200).json({ livro: livro });
        });
    })
    app.post('/livrosUpdate', middlewaresAutenticacao.bearer, (req, res) => {
        const livro = req.body
        Livro.altera(livro.id, livro, res, (result) => {
            if (result.sqlState === '23000') {
                res.status(400).json({ 'error': 'Não foi possível alterar o livro!', 'json': `${result}` });
            } else {
                res.status(201).json({ 'mensagem': 'livro alterado com sucesso!', 'json': `${result}` });
            }
        });
    });
    app.post('/livrosDelete', middlewaresAutenticacao.bearer, (req, res) => {
        const livro = req.body
        Livro.deleta(livro.id, res, (result) => {
            if (result.sqlState === '23000') {
                res.status(400).json({ 'error': 'Não foi possível deletar o livro!', 'json': `${result}` });
            } else {
                res.status(201).json({ 'mensagem': 'livro deletado com sucesso!', 'json': `${result}` });
            }
        });
    });
    app.post('/livros',middlewaresAutenticacao.bearer, (req, res) => {
        const livro = req.body

        Livro.adiciona(livro, res, (result)=> {
            if(result.sqlState === '23000') {
                res.status(400).json({'error': 'Não foi possível adicionar o livro!'});
            } else {
                res.status(201).json({'mensagem': 'Livro adicionado com sucesso!'});
            }
        });
    });
}