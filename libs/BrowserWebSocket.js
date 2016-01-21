function BrowserWebSocket(url, debug) {
    if (typeof WebSocket == 'undefined') return false;
    if (this === (function(){return this;})()) return new BrowserWebSocket(url, debug);
    this.url = url;
    this.ws = new WebSocket(url);
    this.debugging = debug;
    this.events = {
        open: [],
        close: [],
        error: [],
        message: []
    };
    if (debug) {
        this.on('open', function() {
            console.log('connect successful: %s ...', this.url);
        });
        this.on('close', function() {
            console.log('connection interrupted ...');
        });
        this.on('error', function() {
            console.log('something error ...');
        });
        this.on('message', function(e) {
            var message = e.data;
            console.log('received message: <-- %s ...', message);
        });
    }
}

BrowserWebSocket.prototype = {
    on: function(event, fn) {
        if (! event || ! fn) throw new Error('Not enough arguments');
        if (! this.events.hasOwnProperty(event)) throw new Error('Only accept [open, close, error, message] event');
        if (! this.events[event].indexOf(fn) > -1) this.events[event] = this.events[event].concat(fn);
        this.ws.addEventListener(event, fn);
    },
    off: function(event, fn) {
        var index = this.events[event].indexOf(fn);
        if (! index > -1) return;
        this.ws.removeEventListener(event, fn);
        this.events[event].splice(index, 1);
    },
    emit: function(message) {
        if (this.ws.readyState !== 1) console.log('connection is not established, please wait ...');
        if (this.debugging) console.log('send message: --> %s ...', message);
        this.ws.send(message);
    },
    close: function() {
        if (this.debugging) console.log('close connection ...');
        this.ws.close();
    },
    reconnect: function() {
        if (this.debugging) console.log('try to reconnect ...');
        var events = this.events;
        var ws = new WebSocket('ws://rde-tech.vir888.com:81/chatroom/ws/debug-app-key?token=ghost');
        var me = this;
        for (var event in events) {
            if (! events.hasOwnProperty(event)) continue;
            for (var index in events[event]) {
                ws.addEventListener(event, events[event][index]);
            }
        }
        ws.addEventListener('open', function() {
            me.ws = ws;
        });
    }
};

module.exports = BrowserWebSocket;
