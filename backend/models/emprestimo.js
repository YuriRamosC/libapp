const conexao = require('../infra/conexao');

class Emprestimo {
    adiciona(emprestimo, res, callback) {

        const sql = 'INSERT INTO cliente_has_livro SET ?'

        conexao.query(sql, emprestimo, (erro, resultados) => {
            if (erro) {
                callback(erro);
            } 
            else {
                callback(resultados);
            }
        })

    }
    lista(res, callback) {
        const sql = 'SELECT * FROM cliente_has_livro'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                callback(resultados);
            }
        })
    }
    buscaPorId(id, res, callback) {
        const sql = `SELECT * FROM cliente_has_livro WHERE id = ${id}`;
        conexao.query(sql, (erro, resultados) => {
            const emprestimo = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                callback(emprestimo);
            }
        })
    }

    buscaPorIdCliente(id, res, callback) {
        const sql = `SELECT * FROM cliente_has_livro WHERE cliente_id = ${id}`;
        conexao.query(sql, (erro, resultados) => {
            const emprestimo = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                callback(emprestimo);
            }
        })
    }
    buscaPorIdLivro(id, res, callback) {
        const sql = `SELECT * FROM cliente_has_livro WHERE livro_id = ${id}`;
        conexao.query(sql, (erro, resultados) => {
            const emprestimo = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                callback(emprestimo);
            }
        })
    }
    altera(id, valores, res, callback) {
        const sql = 'UPDATE cliente_has_livro SET ? WHERE id=?';
        var emprestimoTest = [];
        this.buscaPorId(id, res, function (emprestimo) {
            emprestimoTest = emprestimo;
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
        const sql = 'DELETE FROM cliente_has_livro WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Emprestimo