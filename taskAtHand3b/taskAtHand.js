// using a function contructor form to create an object
function taskAtHandApp(){
	var version = "v1.0";
	appStorage = new AppStorage("taskAtHandList");
	taskList = new TaskList();
	timeoutId = 0;
	// creating a private function
	function setStatus(message, noFade){
		$("#app>footer").text(message).show();
		if(!noFade){
			$("#app>footer").fadeOut(1000);
		}
	}

	function addTask(){
		var newTaskName = $("#newTaskName").val();
		if(newTaskName){
			var task = new Task(newTaskName);
			taskList.addTask(task);
			appStorage.setValue("nextTaskId", Task.nextTaskId);
			addTaskElement(task);
			$("#newTaskName").val("").focus();
		}
	}

	function onSelectTask($task){
		if($task){
			$(".task").removeClass("selected");
			$task.addClass("selected");
		}
	}

	function addTaskElement(task){
		var $task = $("#task-template .task").clone();
		$task.data('task-id', task.id);
		$("span.task-name", $task).text(task.name);

		$("#taskList").append($task);
		saveTaskList();

		$('button.delete', $task).click(function(){
			removeTask($task);
		});
		$('button.move-up', $task).click(function(){
			moveTask($task, true);
		});
		$('button.move-down', $task).click(function(){
			moveTask($task, false);
		});
		$('span.task-name', $task).click(function(){
			onEditTaskName($(this));
		});
		$('button.toggle-details', $task).click(function(){
			toggleDetails($task);
		});
		$('input.task-name').change(function(){
			onChangeTaskName($(this));
		}).blur(function(){
			$(this).hide().siblings("span.task-name").show();
		});
		$($task).click(function(){onSelectTask($task)});
		$(".details input, .details select", $task).each(function(){
			var $input = $(this);
			var fieldName = $input.data("field");
			$input.val(task[fieldName]);
		});
		$(".details input, .details select", $task).change(function(){
			onChangeTaskDetails(task.id, $(this));
		});

	}

	function onChangeTaskDetails(taskId, $input){
		var task = taskList.getTask(taskId);
		if(task){
			var fieldName = $input.data('field');
			task[fieldName] = $input.val();
			saveTaskList();
		}
	}

	function toggleDetails($task){
		$('.details', $task).slideToggle();
		$('button.toggle-details', $task).toggleClass("expanded");
	}

	function onEditTaskName($span){
		$span.hide().siblings("input.task-name").val($span.text()).show().focus();
		saveTaskList();
	}

	function onChangeTaskName($input){
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if($input.val()){
			$span.text($input.val());
		}
		$span.show();
		saveTaskList();
	}

	function saveTaskList(){
		if(timeoutId) clearTimeout(timeoutId);
		setStatus("Saving Changes", true);
		timeoutId = setTimeout(function(){
			appStorage.setValue("taskList", taskList.getTasks());
			timeoutId = 0;
			setStatus("Changes saved!");
		}, 2000);
	}

	function removeTask($task){
		$task.remove();
		saveTaskList();
	}

	function moveTask($task, moveUp){
		if(moveUp){
			$task.insertBefore($task.prev());
		}else{
			$task.insertAfter($task.next());
		}
		saveTaskList();
	}

	function loadTaskList(){
		var tasks = appStorage.getValue("taskList");
		taskList = new TaskList(tasks);
		console.log(tasks);
		rebuildTaskList();
	}

	function rebuildTaskList(){
		$("#taskList").empty();
		taskList.each(function(task){
			addTaskElement(task);
		});
	}

	function loadTheme(){
		var theme = appStorage.getValue("theme");
		if(theme){
			setTheme(theme);
			$("#theme>option[value=" + theme + "]").attr("selected", "selected");
		}
	}

	function onChangeTheme(){
		var theme = $("#theme>option").filter(":selected").val();
		setTheme(theme);
		appStorage.setValue("theme", theme);
	}

	function setTheme(theme){
		$("#theme-style").attr('href', 'themes/' + theme + ".css");
		console.log("Set theme: " + theme);
	}

	// creating a public function
	this.start = function(){
		$("#newTaskName").keypress(function(e){
			if(e.which == 13){
				addTask();
				return false;
			}
		}).focus();
		$("#theme").change(onChangeTheme);
		$("#app>header").append(version);
		loadTaskList();
		loadTheme();
		setStatus("ready");
	};

} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(document).ready(function() {
	window.app = new taskAtHandApp();
	window.app.start();
});
