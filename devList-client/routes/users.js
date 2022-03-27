var express = require('express');
var assert = require('assert');
var router = express.Router();
var restify = require('restify-clients');

var client = restify.createJsonClient({
  url: 'http://127.0.0.1:4000'
});

router.get('/', function(req, res, next) {

  client.get('/users', function(err, request, response, obj) {
    assert.ifError(err);

    res.json(obj);
  });
});

router.get('/:id', function(req, res, next) {

  client.get(`/users/${req.params.id}`, function(err, request, response, obj) {
    assert.ifError(err);

    res.end(obj);
  });
});

module.exports = router;
