const Funcionario = require('../models/funcionario');
const passport = require('passport');
const middlewaresAutenticacao = require('./middlewares-auth');
module.exports = app => {

    app.route('/funcionarios/login')
        .post(middlewaresAutenticacao.local, Funcionario.login.bind(Funcionario));


    app.get('/profile', middlewaresAutenticacao.bearer, (req, res) => {
        res.status(200).json(req.user);
    })
    app.get('/funcionarios/:id', passport.authenticate('bearer', {session: false }), (req, res) => {
        const id = parseInt(req.params.id);
        Funcionario.buscaPorId(id, res, (livro) => {
            res.status(200).json({ livro: livro });
        });
    })
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