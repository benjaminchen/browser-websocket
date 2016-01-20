function BrowserWebSocket(url, debug) {
    if (typeof WebSocket == 'undefined') return false;
    if (this === (function(){return this;})()) return new BrowserWebSocket(url, debug);
    this.url = url;
    this.ws = new WebSocket(url);
    this.debugMode = debug;
    this.events = {
        open: [],
        close: [],
        error: [],
        message: []
    };
    this.reconnectAllow = false;
    this.reconnectInterval = 3000;
    this.reconnectTimes = 3;
    this.reconnectedNum = 0;
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
        if (! this.events.open.indexOf(callback) > -1) this.events.open = this.events.open.concat(callback);
        if (callback) this.ws.addEventListener('open', callback);
    },
    onclose: function(callback) {
        if (! this.events.close.indexOf(callback) > -1) this.events.close = this.events.close.concat(callback);
        if (callback) this.ws.addEventListener('close', callback);
    },
    onerror: function(callback) {
        if (! this.events.error.indexOf(callback) > -1) this.events.error = this.events.error.concat(callback);
        if (callback) this.ws.addEventListener('error', callback);
    },
    onmessage: function(callback) {
        var newCall = function(e){
            callback(e.data);
        };
        if (! this.events.message.indexOf(newCall) > -1) this.events.message = this.events.message.concat(newCall);
        if (callback) this.ws.addEventListener('message', newCall);
    },
    emit: function(message) {
        if (this.ws.readyState !== 1) console.log('connection is not established, please wait ...');
        if (this.debugMode) console.log('send message: --> %s ...', message);
        this.ws.send(message);
    },
    close: function() {
        if (this.debugMode) console.log('close connection ...');
        this.reconnectOff();
        this.ws.close();
    },
    off: function(event, fn) {
        var index;
        this.ws.removeEventListener(event, fn);
        (index = this.events[event].indexOf(fn)) > -1 && this.events[event].splice(index, 1);
    },
    reconnectOn: function() {
        this.reconnectAllow = true;
    },
    reconnectOff: function() {
        this.reconnectAllow = false;
    },
    setReconnect: function(seconds, times) {
        this.reconnectOn();
        if (! seconds) seconds = this.reconnectInterval;
        if (! times) times = this.reconnectTimes;
        var me = this;
        var reconn = function() {
            if (me.reconnectedNum >= times || ! me.reconnectAllow) return;
            setTimeout(function() {
                if (me.debugMode) console.log('try to reconnect ...');
                var events = me.events;
                var ws;
                ws = new WebSocket(me.url);
                for (var event in events) {
                    if (! events.hasOwnProperty(event)) continue;
                    for (var index in events[event]) {
                        ws.addEventListener(event, events[event][index]);
                    }
                }
                ws.addEventListener('open', function() {
                    me.ws = ws;
                    me.reconnectedNum = 0;
                });
                ws.addEventListener('close', reconn);
                me.reconnectedNum++;
            }, seconds);
        };
        this.onclose(reconn);
    }
};

module.exports = BrowserWebSocket;
