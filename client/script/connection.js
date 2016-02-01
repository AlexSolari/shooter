/*global io*/
function Connection() {
    this.socket = io.connect(document.location.href);
}

Connection.prototype.Start = function (name) {
    this.Send("login", name);
    this.Send("start");
};

Connection.prototype.Send = function (type, data) {
    this.socket.emit(type, data);
};

Connection.prototype.AddResponseHandler = function (type, handler) {
    this.socket.on(type, handler);
};
