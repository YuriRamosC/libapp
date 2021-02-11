const Funcionario = require('../models/funcionario');
const passport = require('passport');
const middlewaresAutenticacao = require('./middlewares-auth');
module.exports = app => {

    app.route('/funcionarios/login')
        .post(middlewaresAutenticacao.local, Funcionario.login.bind(Funcionario));

        app.get('/funcionarios', middlewaresAutenticacao.bearer, (req, res) => {
            Funcionario.lista(res, function (funcionarios) {
                res.status(200).json({ funcionarios: funcionarios });
            });
        })
    app.get('/profile', middlewaresAutenticacao.bearer, (req, res) => {
        res.status(200).json(req.user);
    })
    app.get('/funcionarios/:id', passport.authenticate('bearer', {session: false }), (req, res) => {
        const id = parseInt(req.params.id);
        Funcionario.buscaPorId(id, res, (livro) => {
            res.status(200).json({ livro: livro });
        });
    })
    app.post('/funcionariosUpdate', middlewaresAutenticacao.bearer, (req, res) => {
        const funcionario = req.body
        Funcionario.altera(funcionario.id, funcionario, res, (result) => {
            if (result.sqlState === '23000') {
                res.status(400).json({ 'error': 'Não foi possível alterar o funcionario!', 'json': `${result}` });
            } else {
                res.status(201).json({ 'mensagem': 'funcionario alterado com sucesso!', 'json': `${result}` });
            }
        });
    });
    app.post('/funcionariosDelete', middlewaresAutenticacao.bearer, (req, res) => {
        const funcionario = req.body
        Funcionario.deleta(funcionario.id, res, (result) => {
            if (result.sqlState === '23000') {
                res.status(400).json({ 'error': 'Não foi possível deletar o funcionario!', 'json': `${result}` });
            } else {
                res.status(201).json({ 'mensagem': 'funcionario deletado com sucesso!', 'json': `${result}` });
            }
        });
    });
    app.post('/funcionarios', (req, res) => {
        const funcionario = req.body

        Funcionario.adiciona(funcionario, res, (result) => {
            if (result.sqlState === '23000') {
                res.status(400).json({ 'error': 'Não foi possível adicionar o funcionario!' });
            } else {
                res.status(201).json({ 'mensagem': 'Funcionario adicionado com sucesso!' });
            }
        });
    });


}