$(document).ready(function() {
	$("#message-submit").on("click", function() {
		addMessageToList();
	});

	$("#message-input").keyup(function(event){
		if (event.keyCode !== 13) { return; }
		addMessageToList();
	});

	function addMessageToList(){
		var messageInput = $("#message-input");
		var message = messageInput.val();
		if (!message) { return; }
		var messageList = $("#messages-list");
		messageList.append("<li>" + message + "</li>");
		messageInput.val("");
	}
});
