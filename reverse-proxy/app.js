const express = require('express')
const app = express()
const httpProxy = require('http-proxy')
const apiProxy = httpProxy.createProxyServer()
const backend = 'http://localhost:8000'
const static = 'http://localhost:8001'
const media = 'http://localhost:8002'

app.all('/api/*', (req, res) => {
  console.log('redirecting to backend')
  apiProxy.web(req, res, { target: backend })
})

app.all('/media/*', (req, res) => {
  console.log('redirecting to media server')
  apiProxy.web(req, res, { target: media })
})

app.get('/*', (req, res) => {
  console.log('redirecting to static file server')
  apiProxy.web(req, res, { target: static })
})

app.listen(4000)