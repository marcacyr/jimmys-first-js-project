// $(document).ready(function() {
//   $('#message-submit').on('click', function() {
//     processMessageAndAddToList();
//   });

//   $('#message-input').keyup(function(event) {
//     if (event.keyCode !== 13) { return; }
//     processMessageAndAddToList();
//   });

//   function processMessageAndAddToList() {
//     var messageAndContainer = getMessageAndContainer();
//     var message = messageAndContainer.message;
//     var messageInput = messageAndContainer.messageInput;
//     if (!message) { return; }
//     appendMessageAndClearInput(message, messageInput);
//   }

//   function appendMessageAndClearInput(message, messageInput) {
//     var messagesListContainer = $('#messages-list');
//     messagesListContainer.append('<li>' + message + '</li>');
//     messageInput.val('');
//   }

//   function getMessageAndContainer() {
//     var messageInput = $('#message-input');
//     var message = messageInput.val();
//     return {
//       messageInput: messageInput,
//       message: message
//     };
//   }
// });