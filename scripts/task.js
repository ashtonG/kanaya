var test = {
	title: "finish task",
	description: "finish that task",
	tags: ["bangers","mash","dogs"],
	stat: ["toDo", 1336505555,672854400]
}

function dispTask(eve){
	var newTask = document.createElement("article");
	newTask.className = "task";
	var title = document.createElement("header");
	var desc = document.createElement("article");
	var tagEl = document.createElement("aside");
	title.textContent = eve.title;
	desc.textContent = eve.description;
	for (var tag=0;tag<eve.tags.length;tag++){
		console.log(tag);
		tagEl.textContent += eve.tags[tag];
		if (tag+1 != eve.tags.length){
			tagEl.textContent += ", ";
		}
	}
	newTask.appendChild(title);
	newTask.appendChild(desc);
	newTask.appendChild(tagEl);
	$(eve.stat[0]).getElement("section").appendChild(newTask);
}
function funkTest(){
	dispTask(test);
}

window.addEvent("domready",funkTest);
