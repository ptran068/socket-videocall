
const socket = io('http://web-socket-video-call.herokuapp.com');

socket.on('receive-message', function(message){
  console.log('message')
  console.log(message)
});
function joinRoom(roomId) {
    socket.emit("join-room", roomId);
}

function sendMessage (roomId) {
  const message = document.getElementsByName('message')[0].value;
  const data = {
    message,
    roomId
  }
  socket.emit('message', data)
}

$(document).ready(function () {
  console.log('fsgrgrm')

  //  $("#join").click(function() {
  //    console.log('bvao room')
  //    socket.emit("join-room", $(this).attr('value'));
  //  });

  //  socket.on("send-message", function (message) {

  //   console.log('message', message)
  //  });
  //  $("#send").click(function() {
  //    socket.emit("user-send-message", $("#txtMessage").val());
  //  });

  //  $("#txtMessage").focusin(function() {
  //    socket.emit("typing");
  //  });
  //  $("#txtMessage").focusout(function() {
  //   socket.emit("stop-typing");
  // });
  // $("#send").click(function(){
  //   $("#txtMessage").html("");
  // })
 });