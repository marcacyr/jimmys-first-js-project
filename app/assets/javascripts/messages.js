$(document).ready(function() {
	$("#messages-list").on("click", ".remove-message", removeMessage);

	$("#remove-all").on("click", removeAllMessages);

	$('#message-submit').on('click', submitMessage);

	$('#message-input').on('keyup', function() {
		if (event.keyCode !== 13) { return ; }
		submitMessage();
	});

	function removeAllMessages() {
		$.ajax({
			type: 'GET',
			url: '/remove_all_todos',
			success: updateMessagesAfterDeleteAll,
			error: raiseError
		});
	}

	function removeMessage() {
		var id = $(this).parent().find('.id').text();
		$.ajax({
			type: 'DELETE',
			url: '/todos/' + id,
			success: updateMessagesAfterDeletion,
			error: raiseError
		});
	}

	function submitMessage() {
		var message = $('#message-input').val();
		if (!message) { return; }
		$.ajax({
			type: 'POST',
			url: '/todos',
			data: {
				todo: {
					message: message
				}
			},
			success: updateMessagesListWithNewMessage,
			error: raiseError
		});
	}

	function updateMessagesAfterDeleteAll() {
		$('li').remove();
	}

	function updateMessagesAfterDeletion(response) {
		var id = response.id;
		$('.'+id+'').parent().remove();
	}

	function updateMessagesListWithNewMessage(response) {
		var messageInput = $('#message-input');
		var message = response.message;
		var id = response.id;
		var messageList = $("#messages-list");
		messageList.append("<li>" + message + '<div class="id '+ id +'" style="display:none">' + id + '</div>' + "<span class='remove-message' style='font-weight: bold; color: red; cursor: pointer;'> (X) </span></li>");
		messageInput.val("");
	}

	function raiseError() {
		alert('Something went wrong.');
	}
});
