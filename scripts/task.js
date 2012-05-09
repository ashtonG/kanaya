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
//left/right operator

function task(title, desc, tags, stat){
	this.title = title;
	this.description = desc;
	this.tags = tags;
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
				this.prev = "inProgress"
		}
	}
	this.movePrev = function(){
		this.stat.loc = this.prev;
		this.disp();
	}
	this.moveNext = function(){
		this.stat.loc = this.next;
		this.disp();
	}
	locTask = this;
	this.disp = function(){
		this.calcPos();
		var newTask = document.createElement("article");
		newTask.className = "task";
		var title = document.createElement("header");
		var desc = document.createElement("article");
		var tagEl = document.createElement("aside");
		var cont = document.createElement("div");
		var mLeftL = document.createElement("a");
		var mRightL = document.createElement("a");
		title.textContent = this.title;
		desc.textContent = this.description;
		for (var tag=0;tag<this.tags.length;tag++){
			tagEl.textContent += this.tags[tag];
			if (tag+1 != this.tags.length){
				tagEl.textContent += ", ";
			}
		}
		cont.className = "control";
		if(this.prev!=null){
			mLeftL.textContent = "<";
			mLeftL.onclick = function(){
				$(locTask.stat.loc).getElement("section").removeChild(newTask);
				locTask.movePrev();
			};
		}
		if(this.next!=null){
			mRightL.textContent = ">";
			mRightL.onclick = function(){
				$(locTask.stat.loc).getElement("section").removeChild(newTask);
				locTask.moveNext();
			};
		}
		mLeftL.href = mRightL.href = "#";
		cont.appendChild(mLeftL);
		cont.appendChild(mRightL);
		title.appendChild(cont);
		newTask.appendChild(title);
		newTask.appendChild(desc);
		newTask.appendChild(tagEl);
		$(this.stat.loc).getElement("section").appendChild(newTask);
	}
}

function addTask(id){
	alert(id);
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
var testTask = new task ("test","testing",["test1","test2"],{"loc":"inProgress"});
function init(){
}

window.addEvent("domready",init);
