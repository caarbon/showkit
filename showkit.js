var request = require('request');
var noOp = function() {};

var ShowKit = function(apiKey) {
  var self = this;
  var auth = new Buffer(apiKey).toString('base64');

  this.makeRequest = function(method, path, data, callback) {
    callback = callback || noOp;

    var requestOptions = {
      url: 'https://api.showkit.com/' + path,
      method: method,
      json: true,
      headers: {
        Authorization: 'Basic ' + auth
      }
    };

    if (data) {
      requestOptions[ method === 'GET' ? 'qs' : 'body' ] = data;
    }

    request(requestOptions, function(err, res, body) {
      callback(err, body);
    });

    return self;
  };

  return this;
};

ShowKit.prototype.getAccounts = function(callback) {
  return this.makeRequest('get', 'accounts', null, callback);
};

ShowKit.protoype.addSubscriber = function(username, password, callback) {
  return this.makeRequest('post', 'subscribers', {
    username: username,
    password: password
  }, callback);
};

ShowKit.prototype.getSubscribers = function(callback) {
  return this.makeRequest('get', 'subscribers', null, callback);
};

ShowKit.prototype.getSubscriberCalls = function(username, callback) {
  return this.makeRequest('get', ['subscribers', username, 'calls'].join('/'), null, callback);
};

ShowKit.prototype.getSubscriberActive = function(username, callback) {
  return this.makeRequest('get', ['subscribers', username, 'active'].join('/'), null, callback);
};

module.exports = ShowKit;
