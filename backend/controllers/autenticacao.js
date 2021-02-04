const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Funcionario = require('../models/funcionario');
const { InvalidArgumentError } = require('../infra/erros');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
function verificarUsuario(funcionario) {
    if (!funcionario) {
        throw new InvalidArgumentError('Usuário invalido!');
    }
}
function verificarSenha(senha, senhaBd) {
    if (senhaBd !== senha) {
        throw new InvalidArgumentError('Senha inválida');
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, async (email, password, done) => {
        try {
            Funcionario.verificarEmail(email, (funcionarioBd) => {
                try {
                verificarUsuario(funcionarioBd);
                verificarSenha(password, funcionarioBd.password);
                done(null, funcionarioBd);
                } catch(err) {
                    done(err);
                }
            });
        } catch (err) {
            done(err);
        }
    })
)

passport.use(
    new BearerStrategy(
        (token, done) => {
            const payload = jwt.verify(token, process.env.CHAVE_JWT);
        }
    )
)