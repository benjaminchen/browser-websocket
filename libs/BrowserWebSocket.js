function BrowserWebSocket(url, debug) {
    if (typeof WebSocket == 'undefined') return false;
    if (this === (function(){return this;})()) return new BrowserWebSocket(url, debug);

    this.url = url;
    this.ws = new WebSocket(url);
    this.debugMode = debug;
    if (debug) {
        this.onopen(function() {
            console.log('connect successful: %s ...', this.url);
        });
        this.onclose(function() {
            console.log('connection interrupted ...');
        });
        this.onerror(function() {
            console.log('something error ...');
        });
        this.onmessage(function(message) {
            console.log('received message: <-- %s ...', message);
        });
    }
}

BrowserWebSocket.prototype = {
    onopen: function(callback) {
        if (callback) this.ws.addEventListener('open', callback);
    },
    onclose: function(callback) {
        if (callback) this.ws.addEventListener('close', callback);
    },
    onerror: function(callback) {
        if (callback) this.ws.addEventListener('error', callback);
    },
    onmessage: function(callback) {
        if (callback) this.ws.addEventListener('message', function(e){
            callback(e.data);
        });
    },
    emit: function(message) {
        if (this.debugMode) console.log('send message: --> %s ...', message);
        this.ws.send(message);
    },
    close: function() {
        if (this.debugMode) console.log('close connection ...');
        this.ws.close();
    },
    off: function(event, fn) {
        this.ws.removeEventListener(event, fn);
    }
};

module.exports = BrowserWebSocket;
