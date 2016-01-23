/*global io*/
function Connection() {
    this.socket = io.connect(document.location.href);
}

Connection.prototype.Send = function (type, data) {
    this.socket.emit(type, data);
};

Connection.prototype.AddRequestHandler = function (type, handler) {
    this.socket.on(type, handler);
}