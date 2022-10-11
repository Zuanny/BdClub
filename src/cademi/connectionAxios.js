const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://avbdclub.cademi.com.br/api/v1/',
  timeout: 1000,
  headers: {'Authorization': process.env.CADEMI_TOKEN}
});

module.exports = instance