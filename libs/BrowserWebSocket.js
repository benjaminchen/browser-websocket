function BrowserWebSocket(url, debug) {
    if (typeof WebSocket == 'undefined') return false;
    if (this === (function(){return this;})()) return new BrowserWebSocket(url, debug);

    this.url = url;
    this.ws = new WebSocket(url);
    this.debugMode = debug;
}

BrowserWebSocket.prototype = {
    onopen: function(callback) {
        var me = this;
        me.ws.addEventListener('open', function() {
            if (me.debugMode) console.log("connect [" + me.url + "] successful ...");
            if (callback) callback();
        });
    },
    onclose: function(callback) {
        var me = this;
        me.ws.addEventListener('close', function() {
            if (me.debugMode) console.log("connection already interrupted ...");
            if (callback) callback();
        });
    },
    onerror: function(callback) {
        var me = this;
        me.ws.addEventListener('error', function(e) {
            if (me.debugMode) console.log("something error ...");
            if (callback) callback(e.data);
        });
    },
    onmessage: function(callback) {
        var me = this;
        me.ws.addEventListener('message', function(e) {
            if (me.debugMode) console.log("received message [" + e.data + "] form server ...");
            if (callback) callback(e.data);
        });
    },
    emit: function(message) {
        if (this.debugMode) console.log("send message [" + message + "] to server ...");
        this.ws.send(message);
    },
    close: function() {
        if (this.debugMode) console.log("close connection ...");
        this.ws.close();
    },
    off: function(event, fn) {
        this.ws.removeEventListener(event, fn);
    }
};

module.exports = BrowserWebSocket;
