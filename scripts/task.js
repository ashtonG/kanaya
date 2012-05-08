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
function task(title, desc, tags, stat){
	this.title = title;
	this.description = desc;
	this.tags = tags;
	this.stat = stat;
	this.disp = function(){
		var newTask = document.createElement("article");
		newTask.className = "task";
		var title = document.createElement("header");
		var desc = document.createElement("article");
		var tagEl = document.createElement("aside");
		title.textContent = this.title;
		desc.textContent = this.description;
		for (var tag=0;tag<this.tags.length;tag++){
			console.log(tag);
			tagEl.textContent += this.tags[tag];
			if (tag+1 != this.tags.length){
				tagEl.textContent += ", ";
			}
		}
		newTask.appendChild(title);
		newTask.appendChild(desc);
		newTask.appendChild(tagEl);
		$(this.stat.loc).getElement("section").appendChild(newTask);
	}
}
function addTask(id){
	formSub.onclick = function (){
		var curT = new task(
				formName.value,
				formDesc.value,
				formTags.value.split(","),
				{"loc": id}
				);
		$(id).getElement("section").removeChild(createForm);
		curT.disp();
	}
	$(id).getElement("section").appendChild(createForm);
}
function funkTest(){
	addTask("today");
}

window.addEvent("domready",funkTest);
