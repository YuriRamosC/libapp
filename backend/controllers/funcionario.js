const Funcionario = require('../models/funcionario');
const passport = require('passport');
const middlewaresAutenticacao = require('./middlewares-auth');
module.exports = app => {

    app.route('/funcionarios/login')
        .post(middlewaresAutenticacao.local, Funcionario.login.bind(Funcionario));


    app.get('/funcionarios', passport.authenticate('bearer', {session: false }), (req, res) => {
        Funcionario.lista(res, function (funcionarios) {
            res.status(200).json({ funcionarios: funcionarios });
        });
    })
    app.get('/funcionarios/:id', passport.authenticate('bearer', {session: false }), (req, res) => {
        const id = parseInt(req.params.id);
        Funcionario.buscaPorId(id, res, (livro) => {
            res.status(200).json({ livro: livro });
        });
    })
    app.post('/funcionarios', (req, res) => {
        const livro = req.body

        Funcionario.adiciona(livro, res, (result) => {
            if (result.sqlState === '23000') {
                res.status(400).json({ 'error': 'Não foi possível adicionar o livro!' });
            } else {
                res.status(201).json({ 'mensagem': 'Livro adicionado com sucesso!' });
            }
        });
    });


}