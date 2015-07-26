$(document).ready(function() {
  $('#message-submit').on('click', function() {
    processMessageAndAddToList();
  });

  $('#message-input').keyup(function(event) {
    if (event.keyCode !== 13) { return; }
    processMessageAndAddToList();
  });

  function processMessageAndAddToList() {
    var messageInput = $('#message-input');
    var message = messageInput.val();
    if (!message) { return; }
    var messagesList = $('#messages-list');
    messagesList.append('<li>' + message + '<span>x</span></li>');
    messageInput.val('');
  }
});

