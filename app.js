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
      json['Bands'] = req.protocol + '://' + req.get('host') + '/' + json['Bands']
      json['Alben'] = req.protocol + '://' + req.get('host') + '/' + json['Alben']
      json['Lieder'] = req.protocol + '://' + req.get('host') + '/' + json['Lieder']
      json['Musiker'] = req.protocol + '://' + req.get('host') + '/' + json['Musiker']
      res.json(json)
    }
  })
})
app.get('/band/:slug', function (req, res) {
  jsonfile.readFile(config.database + '/band/' + req.params.slug + '.json', function (error, json) {
    if (error) {
      res.status(500).send(error)
    } else {
      for (let index = 0; index < json.alben.length; index++) {
        json.alben[index] = req.protocol + '://' + req.get('host') + '/album/' + json.alben[index]
      }
      for (let index = 0; index < json.musiker.length; index++) {
        json.musiker[index] = req.protocol + '://' + req.get('host') + '/musiker/' + json.musiker[index]
      }
      res.json(json)
    }
  })
})
app.get('/band/', function (req, res) {
  fs.readdir(config.database + '/band/', function (error, files) {
    if (error) {
      res.status(500).send(error)
    } else {
      var json = []
      for (let index = 0; index < files.length; index++) {
        const element = files[index]
        json.push(req.protocol + '://' + req.get('host') + '/band/' + element.replace('.json', ''))
      }
      res.json(json)
    }
  })
})
app.get('/album/:slug', function (req, res) {
  jsonfile.readFile(config.database + '/album/' + req.params.slug + '.json', function (error, json) {
    if (error) {
      res.status(500).send(error)
    } else {
      for (let index = 0; index < json.lieder.length; index++) {
        json.lieder[index] = req.protocol + '://' + req.get('host') + '/lied/' + json.lieder[index]
      }
      json.band = req.protocol + '://' + req.get('host') + '/band/' + json.band
      res.json(json)
    }
  })
})
app.get('/album', function (req, res) {
  fs.readdir(config.database + '/album/', function (error, files) {
    if (error) {
      res.status(500).send(error)
    } else {
      var json = []
      for (let index = 0; index < files.length; index++) {
        const element = files[index]
        json.push(req.protocol + '://' + req.get('host') + '/album/' + element.replace('.json', ''))
      }
      res.json(json)
    }
  })
})
app.get('/lied/:slug', function (req, res) {
  jsonfile.readFile(config.database + '/lied/' + req.params.slug + '.json', function (error, json) {
    if (error) {
      res.status(500).send(error)
    } else {
      for (let index = 0; index < json.album.length; index++) {
        json.album[index] = req.protocol + '://' + req.get('host') + '/album/' + json.album[index]
      }
      json.band = req.protocol + '://' + req.get('host') + '/band/' + json.band
      res.json(json)
    }
  })
})
app.get('/lied', function (req, res) {
  fs.readdir(config.database + '/lied/', function (error, files) {
    if (error) {
      res.status(500).send(error)
    } else {
      var json = []
      for (let index = 0; index < files.length; index++) {
        const element = files[index]
        json.push(req.protocol + '://' + req.get('host') + '/lied/' + element.replace('.json', ''))
      }
      res.json(json)
    }
  })
})
app.get('/musiker/:slug', function (req, res) {
  jsonfile.readFile(config.database + '/musiker/' + req.params.slug + '.json', function (error, json) {
    if (error) {
      res.status(500).send(error)
    } else {
      json.band = req.protocol + '://' + req.get('host') + '/band/' + json.band
      res.json(json)
    }
  })
})
app.get('/musiker', function (req, res) {
  fs.readdir(config.database + '/musiker/', function (error, files) {
    if (error) {
      res.status(500).send(error)
    } else {
      var json = []
      for (let index = 0; index < files.length; index++) {
        const element = files[index]
        json.push(req.protocol + '://' + req.get('host') + '/musiker/' + element.replace('.json', ''))
      }
      res.json(json)
    }
  })
})
