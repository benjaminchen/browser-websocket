# Browser-websocket

This is packaging functions of browser websocket.

## Example

- node

```js
var BrowserWebSocket = require('browser-websocket');
var ws = new BrowserWebSocket('ws://localhost:8000');

ws.on('open', function() {
    ws.emit('hello world');
});

ws.on('message', function(e) {
	var message = e.data;
    console.log(message);
});
```

- html

```js
<script src="browserWebsocket.min.js" id="CustomObjectName"></script>
<script>
    var ws = new CustomObjectName('ws://localhost:8000');

    ws.on('open', function() {
        ws.emit('hello world');
    });

    ws.on('message', function(e) {
	    var message = e.data;
        console.log(message);
    });
</script>
```

## Installation

- node install

```js
npm install browser-websocket --save
```

- use in html page

download "browserWebsocket.min.js" (in [release](https://github.com/benjaminchen/browser-websocket/tree/master/release) folder)

```html
<script src="browserWebsocket.min.js" id="customObjectName"></script>
```

## API Docs

See [`/doc/bws.md`](https://github.com/benjaminchen/browser-websocket/blob/master/docs/bws.md)

## License

Released under the MIT license
