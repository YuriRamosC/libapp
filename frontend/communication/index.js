import React, { Component } from 'react';
export default class Comunicacao {

    autenticar(email, password) {
        return fetch('http://192.168.100.66:3001/funcionarios/login', {
            method: 'POST',
            body: `email=${email}&password=${password}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    const retorninho = res.headers.get('Authorization');
                    return retorninho;
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });
    }
    bearerGET(token, path) {
        return new Promise(function (resolve, reject) {
            fetch(`http://192.168.100.66:3001${path} `, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 'Accept': '*/*',
                    'Authorization': `Bearer ${token} `
                }
            })
               .then(function (res) {
                    if (res.ok) {
                        res.json().then(function (result) {
                            console.log('Comms: ' + result);
                            resolve(result);
                        });
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                }).catch(err => {
                    alert(err);
                });
        });
    }
    bearerPOST(token, path, body) {
        return fetch(`http://192.168.100.66:3001${path}`, {
            method: 'POST',
            body: `${body}`,
            headers: {
                'Content-Type': 'application/json', 'Accept': '*/*',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log(res);
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            }).catch(err => {
                alert(err);
            });
    }

}