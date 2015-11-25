var ws, debugMode;

function BrowserWebSocket(url, debug) {
    if (typeof WebSocket == 'undefined') return false;
    if (this === (function(){return this;})()) return new BrowserWebSocket(url, debug);

    this.url = url;
    ws = new WebSocket(url);
    debugMode = debug;
}

BrowserWebSocket.prototype.onopen = function(callback) {
    var url = this.url;
    ws.addEventListener('open', function() {
        if (debugMode) console.log("connect [" + url + "] successful ...");
        if (callback) callback();
    });
};

BrowserWebSocket.prototype.onclose = function(callback) {
    ws.addEventListener('close', function() {
        if (debugMode) console.log("connection already interrupted ...");
        if (callback) callback();
    });
};

BrowserWebSocket.prototype.onerror = function(callback) {
    ws.addEventListener('error', function(e) {
        if (debugMode) console.log("something error ...");
        if (callback) callback(e.data);
    });
};

BrowserWebSocket.prototype.onmessage = function(callback) {
    ws.addEventListener('message', function(e) {
        if (debugMode) console.log("received message [" + e.data + "] form server ...");
        if (callback) callback(e.data);
    });
};

BrowserWebSocket.prototype.emit = function(message) {
    if (debugMode) console.log("send message [" + message + "] to server ...");
    ws.send(message);
};

BrowserWebSocket.prototype.close = function() {
    if (debugMode) console.log("close connection ...");
    ws.close();
};

BrowserWebSocket.prototype.off = function(event, fn) {
    ws.removeEventListener(event, fn);
};

module.exports = BrowserWebSocket;
