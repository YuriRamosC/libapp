const Livro = require('../models/livro');
module.exports = app => {
    app.get('/livros', (req, res) => {
        Livro.lista(res, function (livros) {
            res.status(200).json({ livros: livros });
        });
    })
    app.get('/livros/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Livro.buscaPorId(id, res, (livro) => {
            res.status(200).json({ livro: livro });
        });
    })
    app.post('/livros', (req, res) => {
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