// using a function contructor form to create an object
function taskAtHandApp(){
	var version = "v1.0";
	appStorage = new AppStorage("taskAtHand");
	// creating a private function
	function setStatus(message){
		$("#app>footer").text(message);
	}

	function addTask(){
		var newTaskName = $("#newTaskName").val();
		if(newTaskName){
			addTaskElement(newTaskName);
			$("#newTaskName").val("").focus();
		}
	}

	function onSelectTask($task){
		if($task){
			$(".task").removeClass("selected");
			$task.addClass("selected");
		}
	}

	function addTaskElement(taskName){
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);

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
		var tasks = [];
		$("#taskList .task span.task-name").each(function(){
			tasks.push($(this).text());
		});
		appStorage.setValue("taskList", tasks);
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
		if(tasks){
			for(var i in tasks){
				addTaskElement(tasks[i]);
			}
		}
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
