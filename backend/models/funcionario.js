const conexao = require('../infra/conexao');
const jwt = require('jsonwebtoken');
class Funcionario {
    criaTokenJWT(funcionario) {
        const payload = {
            id: funcionario.id
        };
        const token = jwt.sign(payload, process.env.CHAVE_JWT);
        return token;
    }
    login(req, res) {
        try {
            const token = this.criaTokenJWT(req.user);
            res.set('Authorization', token);
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(404).send();
        }
    }
    adiciona(funcionario, res) {

        const sql = 'INSERT INTO funcionario SET ?'

        conexao.query(sql, funcionario, (erro, resultados) => {
            if (erro.sqlMessage == '23000') {

            } else if (erro) {
            }
            else {
                res.status(201).json(funcionario);
            }
        })

    }
    lista(res, callback) {
        const sql = 'SELECT * FROM funcionario'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                callback(resultados);
            }
        })
    }

    buscaPorId(id, res, callback) {
        const sql = `SELECT * FROM funcionario WHERE id = ${id}`;
        conexao.query(sql, (erro, resultados) => {
            const funcionario = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                callback(funcionario);
            }
        })
    }

    buscaPorEmail(email, res, callback) {
        const sql = `SELECT * FROM funcionario WHERE email = '${email}'`;
        conexao.query(sql, (erro, resultados) => {
            const funcionario = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                callback(funcionario);
            }
        })
    }
    verificarEmail(email, callback) {
        const sql = `SELECT * FROM funcionario WHERE email = '${email}'`;
        conexao.query(sql, (erro, resultados) => {
            const funcionario = resultados[0];
            if (erro) {

            } else {
                callback(funcionario);
            }
        })
    }
    altera(id, valores, res, callback) {
        const sql = 'UPDATE funcionarios SET ? WHERE id=?';
        var funcionarioTest = [];
        this.buscaPorId(id, res, function (funcionario) {
            funcionarioTest = funcionario;
        });
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {

            }
            callback(resultados);
        });
    }
    deleta(id, res) {
        const sql = 'DELETE FROM funcionario WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Funcionario