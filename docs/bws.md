# BrowserWebSocket

Use ```js require('browser-websocket')``` to access the BrowserWebSocket class. 
This class is base on the WebSocket object of browser. If the WebSocket object 
isn't exist, it couldn't instance. You need new the class to connection the server. 
If you need debug message, you can set debug mode true.

```js
var BrowserWebSocket = require('browser-websocket');
var ws = new BrowserWebSocket('ws://localhost:8000', true); // the second parameter is debug mode
```

## BrowserWebSocket.url

Store the url of connection server.

## BrowserWebSocket.onopen(callback)

An event listener to be called when the websocket is connected.

```js
ws.onopen(function() {
    console.log('server is already connected');
})
```

## BrowserWebSocket.onclose(callback)

An event listener to be called when the websocket is closed.

```js
ws.onclose(function() {
    console.log('server connection closed');
})
```

## BrowserWebSocket.onerror(callback)

An event listener to be called when an error occurs.

```js
ws.onerror(function(data) {
    console.log(data);
});
```

## BrowserWebSocket.onmessage(callback)

An event listener to be called when received message from server.

```js
ws.onmessage(function(message) {
    console.log('received message[' + message + '] from server');
});
```

## BrowserWebSocket.emit(message)

Transmits data to the server over the WebSocket connection.

```js
ws.emit(message); // You need check that ws is already connected or it will be error.
```

## BrowserWebSocket.close()

Closes the WebSocket connection.  If the connection is already CLOSED, this method does nothing.

```js
ws.close();
```

## BrowserWebSocket.off(event, fn)

Remove a previously-attached event handler from the event listener.

```js
var openFunc = function() {
    console.log('already connected');
};
ws.onopen(openFunc);
ws.off('open', openFunc);
```
