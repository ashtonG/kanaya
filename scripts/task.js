//form
	var createForm = document.createElement("form");
	var formLabel = document.createElement("fieldset");
	var labelText = document.createElement("legend");
	var formName = document.createElement("input");
	var formDesc = document.createElement("textarea");
	var formTags = document.createElement("input");
	var formSub = document.createElement("input");
	createForm.className = "task"
	labelText.textContent = "New Task";
	formName.id = "name";
	formName.type = "text";
	formDesc.id = "desc";
	formTags.id = "tags";
	formTags.type = "text";
	formSub.id = "save"
	formSub.type = "button";
	formSub.value = "save";
	createForm.appendChild(formLabel);
	formLabel.appendChild(labelText);
	formLabel.appendChild(formName);
	formLabel.appendChild(formDesc);
	formLabel.appendChild(formTags);
	formLabel.appendChild(formSub);
//task template
	var newTask = document.createElement("article");
	newTask.className = "task";
	var title = document.createElement("header");
	var desc = document.createElement("article");
	var tagEl = document.createElement("aside");
	var cont = document.createElement("div");
	var mLeftL = document.createElement("a");
	var mRightL = document.createElement("a");
	cont.className = "control";
	mLeftL.href = mRightL.href = "#";
	cont.appendChild(mLeftL);
	cont.appendChild(mRightL);
	title.appendChild(cont);
	newTask.appendChild(title);
	newTask.appendChild(desc);
	newTask.appendChild(tagEl);
//task array and current data
	var Ptasks = [];
	var rawTasks = {
		tasks : Ptasks
	};
Storage.prototype.setObject = function(key, value){
	this.setItem(key, JSON.stringify(value));
}
 
Storage.prototype.getObject = function(key){
	return JSON.parse(this.getItem(key));
}

function task(title, desc, tags, stat){
	this.title = title;
	this.description = desc;
	this.tags = tags;
	if(this.title == null){
		this.title = "Untitled Task";
	}
	if(this.description == ""){
		this.description = "no description entered";
	}
	this.stat = stat;
	this.next = this.prev = "";
	this.calcPos = function(){
		switch(this.stat.loc){
			case "toDo":
				this.next = "today";
				this.prev = null;
				break;
			case "today":
				this.next = "inProgress";
				this.prev = "toDo";
				break;
			case "inProgress":
				this.next = "done";
				this.prev = "today";
				break;
			case "done":
				this.next = null;
				this.prev = "inProgress";
				break;
			default:
				this.next = this.next;
				this.prev = this.prev;
		}
	}
	this.calcPos();
	this.movePrev = function(){
		this.stat.loc = this.prev;
		this.calcPos();
		this.disp();
	}
	this.moveNext = function(){
		this.stat.loc = this.next;
		this.calcPos();
		this.disp();
	}
	this.disp = function(){
		locTask = this;
		var taskW = newTask.clone();
		var index = Ptasks.indexOf(locTask);
		taskW.id = "task" + index;
		taskW.getChildren()[0].appendText(this.title,"top");
		taskW.getChildren()[1].textContent = this.description;
		for (var tag=0;tag<this.tags.length;tag++){
			taskW.getChildren()[2].textContent += this.tags[tag];
			if (tag+1 != this.tags.length){
				taskW.getChildren()[2].textContent += ", ";
			}
		}
		if(this.prev!=null){
			taskW.getElements("a")[0].textContent = "<";
			taskW.getElements("a")[0].onclick = function(){
				$(taskW.id).dispose();
				Ptasks[index].movePrev();
			};
		}
		if(this.next!=null){
			taskW.getElements("a")[1].textContent = ">";
			taskW.getElements("a")[1].onclick = function(){
				$(taskW.id).dispose();
				Ptasks[index].moveNext();
			};
		}
		$(this.stat.loc).getElement("section").appendChild(taskW);
	}
	Ptasks.push(this);
	saveTasks();
}

function addTask(id){
	formSub.onclick = function (){
		var curT = new task(
				formName.value,
				formDesc.value,
				formTags.value.split(","),
				{
					"loc": id
				}
				);
		$(id).getElement("section").removeChild(createForm);
		curT.disp();
	}
	$(id).getElement("section").appendChild(createForm);
}

function saveTasks(){
	rawTasks.tasks = Ptasks;
	localStorage.setObject("kanayaTaskData",rawTasks);
}

function loadTasks(){
	loadTaskList = localStorage.getObject("kanayaTaskData");
	if (loadTaskList==null){
		saveTasks();
	}
	var Ltasks = loadTaskList.tasks;
	for (var i=0; i<Ltasks.length; i++){
		var tt = Ltasks[i];
		var ct =new task(
				tt.title,
				tt.description,
				tt.tags,
				tt.stat
				);
		ct.disp();
	}
}
//var testTask = new task ("test","testing",["test1","test2"],{"loc":"inProgress"});
function init(){
	//localStorage.setObject("kanayaTaskData",null);
	loadTasks();
}

window.addEvent("domready",init);
