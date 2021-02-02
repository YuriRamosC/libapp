const funcionario = require('../models/funcionario');
module.exports = app => {
    app.get('/funcionarios', (req, res) => {
        funcionario.lista(res, function (funcionarios) {
            res.status(200).json({ funcionarios: funcionarios });
        });
    })



    
   /* app.post('/api-funcionarios-offline', (req, res) => {
        const valores = { scan_status: req.body.scan_status, scan_observation: req.body.scan_observation }
        funcionario.alteraApi(req.body.id_way, valores, res, function () {
            res.status(200).json({result: 'Alterado'});
        });
    });

    app.get('/funcionarios/:id', (req, res) => {
        const id = parseInt(req.params.id)

        funcionario.buscaPorId(id, res);
    })

    app.post('/funcionarios', (req, res) => {
        const funcionario = req.body

        funcionario.adiciona(funcionario, res);
    });*/

}