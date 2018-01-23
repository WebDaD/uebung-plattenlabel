var express = require('express')
var app = express()
var server = require('http').createServer(app)
var config = require('./config.json')
var jsonfile = require('jsonfile')
var fs = require('fs')

server.listen(config.port)

console.log('Plattenlabel running on ' + config.port)

app.get('/', function (req, res) {
  jsonfile.readFile(config.database + '/index.json', function (error, json) {
    if (error) {
      res.status(500).send(error)
    } else {
      res.json(json)
    }
  })
})
app.get('/band/:slug', function (req, res) {
  jsonfile.readFile(config.database + '/band/' + req.params.slug + '.json', function (error, json) {
    if (error) {
      res.status(500).send(error)
    } else {
      res.json(json)
    }
  })
})
app.get('/band/', function (req, res) {

})
app.get('/album/:slug', function (req, res) {

})
app.get('/album', function (req, res) {

})
app.get('/lied/:slug', function (req, res) {

})
app.get('/lied', function (req, res) {

})
app.get('/musiker/:slug', function (req, res) {

})
app.get('/musiker', function (req, res) {

})
