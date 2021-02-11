const Emprestimo = require('../models/emprestimo');
const passport = require('passport');
const nodemailer = require('nodemailer');
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
    app.post('/notificarEntrega', middlewaresAutenticacao.bearer, (req, res) => {
        const email = req.body;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'emaildetesteyuraso@gmail.com',
                pass: 'emaildetestes123'
            },
        });
        const mailOptions = {
            from: 'emaildetesteyuraso@gmail.com',
            to: email.remetente,
            subject: email.assunto,
            text: email.mensagem
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return console.log(err)
            }
            res.status(200).json({'retorno':info});
          })
    })
   /* app.get('/atualizarmultas', middlewaresAutenticacao.bearer, (req, res) => {
        Emprestimo.atualizarMultas(res, function (emprestimos) {
            res.status(200).json({emprestimos: emprestimos});
        });
    });*/
    app.get('/emprestimos-por-emprestimo/:id',middlewaresAutenticacao.bearer, (req, res) => {
        const id = parseInt(req.params.id);
        Emprestimo.buscaPorIdEmprestimo(id, res, (emprestimo) => {
            res.status(200).json({ emprestimo: emprestimo });
        });
    })
    app.post('/emprestimos',middlewaresAutenticacao.bearer, (req, res) => {
        console.log('aqui');
        console.log(req.body);
        const emprestimo = req.body
        Emprestimo.adiciona(emprestimo, res, (result)=> {
            if(result.sqlState === '23000') {
                console.log('errou');
                res.status(400).json({'error': 'Não foi possível adicionar o emprestimo!'});
            } else {
                console.log('deu bom');
                res.status(201).json({'mensagem': 'Emprestimo adicionado com sucesso!'});
            }
        });
    });
    app.post('/emprestimosDelete', middlewaresAutenticacao.bearer, (req, res) => {
        const emprestimo = req.body
        Emprestimo.deleta(emprestimo.id, res, (result) => {
            if (result.sqlState === '23000') {
                res.status(400).json({ 'error': 'Não foi possível deletar o emprestimo!', 'json': `${result}` });
            } else {
                res.status(201).json({ 'mensagem': 'emprestimo deletado com sucesso!', 'json': `${result}` });
            }
        });
    });
    app.post('/emprestimosUpdate', middlewaresAutenticacao.bearer, (req, res) => {
        const emprestimo = req.body
        Emprestimo.altera(emprestimo.id, emprestimo, res, (result) => {
            if (result.sqlState === '23000') {
                res.status(400).json({ 'error': 'Não foi possível alterar o emprestimo!', 'json': `${result}` });
            } else {
                res.status(201).json({ 'mensagem': 'emprestimo alterado com sucesso!', 'json': `${result}` });
            }
        });
    });
}