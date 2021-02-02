const conexao = require('../infra/conexao');

class Livro {
    adiciona(livro, res, callback) {

        const sql = 'INSERT INTO livro SET ?'

        conexao.query(sql, livro, (erro, resultados) => {
            if (erro) {
                callback(erro);
            } 
            else {
                callback(resultados);
            }
        })

    }
    lista(res, callback) {
        const sql = 'SELECT * FROM livro'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                callback(resultados);
            }
        })
    }

    buscaPorId(id, res, callback) {
        const sql = `SELECT * FROM livro WHERE id = ${id}`;
        conexao.query(sql, (erro, resultados) => {
            const livro = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                callback(livro);
            }
        })
    }

    altera(id, valores, res, callback) {
        const sql = 'UPDATE livros SET ? WHERE id=?';
        var livroTest = [];
        this.buscaPorId(id, res, function (livro) {
            livroTest = livro;
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
        const sql = 'DELETE FROM livro WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Livro