$(document).ready(function() {
	$('#todos-list').sortable();

	showOrHideRemoveAllButton();

	showOrHideRemoveCompletedButton();

	$("#todos-list").on("click", ".remove-todo", removeTodo);

	$("#remove-all").on("click", removeAllTodos);

	$('#todo-submit').on('click', submitTodo);

	$('#todos-list').on('click', '.checkmark', markTodoComplete);

	$('#todo-input').on('keyup', function() {
		if (event.keyCode !== 13) { return ; }
		submitTodo();
	});

	$('#complete-all').on('click', completeAllCurrentlyDisplayedTodos);

	function completeAllCurrentlyDisplayedTodos(el) {
		el.preventDefault();
		$.ajax({
			type: 'GET',
			url: '/hide_completed',
			success: updateTodosAfterHideCompleted,
			error: raiseError
		});
	}

	function showOrHideRemoveCompletedButton() {
		var completeAll = $('#complete-all');
		debugger;
		if ($('.completed-todo-item').length > 0) {
			completeAll.show();
		} else {
			completeAll.hide();
		}
	}

	function showOrHideRemoveAllButton() {
		var removeAll = $('#remove-all');
		if ($('li').length > 1) {
			removeAll.show();
		} else {
			removeAll.hide();
		}
	}

	function getId(el) {
		return el.parent().find('.id').text();
	}

	function markTodoComplete() {
		var id = getId($(this));
		$.ajax({
			type: 'POST',
			url: '/mark_complete',
			data: {
				id: id
			},
			success: updateTodosAfterCompletion,
			error: raiseError
		});
	}

	function removeAllTodos(el) {
		el.preventDefault();
		$.ajax({
			type: 'GET',
			url: '/remove_all_todos',
			success: updateTodosAfterDeleteAll,
			error: raiseError
		});
	}

	function removeTodo() {
		var id = getId($(this));
		$.ajax({
			type: 'DELETE',
			url: '/todos/' + id,
			success: updateTodosAfterDeletion,
			error: raiseError
		});
	}

	function submitTodo() {
		var todo = $('#todo-input').val();
		if (!todo) { return; }
		$.ajax({
			type: 'POST',
			url: '/todos',
			data: {
				todo: {
					todo: todo
				}
			},
			success: updateTodosListWithNewTodo,
			error: raiseError
		});
	}

	function updateTodosAfterCompletion(response) {
		var todo = response.todo
		var completedList = $('#completed-todos-list');
		updateTodosAfterDeletion(response);
		completedList.append('<div class="completed-todo-item" style="margin-left:30px;">' + todo +'</div>');
		showOrHideRemoveAllButton();
		showOrHideRemoveCompletedButton();
	}

	function updateTodosAfterDeleteAll() {
		$('li').remove();
		showOrHideRemoveAllButton();
	}

	function updateTodosAfterDeletion(response) {
		var id = response.id;
		$('.'+id+'').parent().remove();
		showOrHideRemoveAllButton();
	}

	function updateTodosAfterHideCompleted() {
		$('.completed-todo-item').remove();
		showOrHideRemoveCompletedButton();
	}

	function updateTodosListWithNewTodo(response) {
		var todoInput = $('#todo-input');
		var todo = response.todo;
		var id = response.id;
		var todoList = $("#todos-list");
		todoList.append("<li class='todo-item'>" + todo + '<div class="id '+ id +'" style="display:none">'
			+ id + '</div>'
			+ "<span class='remove-todo' style='font-weight: bold; color: red; cursor: pointer;'> x </span>"
			+ "<span class='checkmark'></span></li>");
		todoInput.val("");
		showOrHideRemoveAllButton();
	}

	function raiseError() {
		alert('Something went wrong.');
	}
});
