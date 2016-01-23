/*global Connection*/
/*global Drawer*/

window.onload = function() {
  var connection = new Connection();
  var fx = new Drawer();
  connection.AddRequestHandler("greeting", function(data) { fx.DrawText(data, 10, 50); });
};