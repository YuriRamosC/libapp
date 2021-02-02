const conexao = require('../infra/conexao');

class Cliente {
    adiciona(cliente, res, callback) {

        const sql = 'INSERT INTO cliente SET ?'

        conexao.query(sql, cliente, (erro, resultados) => {
            if (erro) {
                console.log(erro);
                callback(erro);
            } 
            else {
                callback(resultados);
            }
        })

    }
    lista(res, callback) {
        const sql = 'SELECT * FROM cliente'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                callback(resultados);
            }
        })
    }

    buscaPorId(id, res, callback) {
        const sql = `SELECT * FROM cliente WHERE id = ${id}`;
        conexao.query(sql, (erro, resultados) => {
            const cliente = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                callback(cliente);
            }
        })
    }

    alteraApi(id, valores, res, callback) {
        const sql = 'UPDATE clientes SET ? WHERE id=?';
        var clienteTest = [];
        this.buscaPorId(id, res, function (cliente) {
            clienteTest = cliente;
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
        const sql = 'DELETE FROM cliente WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Cliente