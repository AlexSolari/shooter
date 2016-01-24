/*global io*/
function Connection(name) {
    this.username = name || "Anon";
    
    this.socket = io.connect(document.location.href);
    this.Send("login", this.username);
}

Connection.prototype.Send = function (type, data) {
    this.socket.emit(type, data);
};

Connection.prototype.AddResponseHandler = function (type, handler) {
    this.socket.on(type, handler);
};
