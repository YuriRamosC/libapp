const conexao = require('../infra/conexao');

class Funcionario {
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

    alteraApi(id, valores, res, callback) {
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