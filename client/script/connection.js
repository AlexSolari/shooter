/*global io*/
function Connection() {
    this.socket = io.connect(document.location.href);
}

Connection.prototype.Start = function (name) {
    this.Send("start", document.getElementById("ship-type").value);
    this.Send("login", name);
};

Connection.prototype.Send = function (type, data) {
    this.socket.emit(type, data);
};

Connection.prototype.AddResponseHandler = function (type, handler) {
    this.socket.on(type, handler);
};
