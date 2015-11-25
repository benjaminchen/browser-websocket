(function(factory){
    if (typeof self.define == 'function' && self.define.amd) {
        self.define(factory);
    }
    var scripts = document.getElementsByTagName('script');
    var node = scripts[scripts.length-1];
    var id = node.getAttribute('id');
    if (id) self[id] = factory();
})(function(){
    return require('./BrowserWebSocket.js');
});