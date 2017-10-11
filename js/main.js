//get all tasks ShowRecord
function getTasks() {
    $(document).ready(function () {
        document.getElementById('ShowRecord').innerHTML = '';
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/task',
            // data: data,         
            success: function (data) {
                showTaskList(data)
            }
        })
    });
}
getTasks();

// show task list data 
function showTaskList(tasks) {

    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('ShowRecord').innerHTML +=
            `
                <li class="taskItem">
                    <div class="taskItem-body">
                        <a class="taskItem-checkboxWrapper checkBox">
                            <span title="Mark as Completed"> 

                            </span> 
                            <span title="Mark as Not Completed"> 
                            
                            </span> 
                        </a>
                        <div class="taskItem-titleWrapper">
                            <span class="taskItem-titleWrapper-title">${tasks[i].dailytask}</span>  
                        </div>
                        <div class='action-btns'>
                            <span class='edit-btn' onclick="editTask('${tasks[i]._id}' , '${tasks[i].dailytask}')"></span> 
                            <span class='delete-btn' onclick="deleteTask('${tasks[i]._id}')"></span>
                        </div>
                    </div>                                         
                </li>
                
            `
    }
}

// create task function 
function createTask(e) {

    if (e.keyCode == 13) {

        let dailytask = document.getElementById('dailytask').value;
        $(document).ready(function () {

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/task',
                data: JSON.stringify({ dailytask: dailytask }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    document.getElementById('ShowRecord').innerHTML += `
                    <li class="taskItem">
                    <div class="taskItem-body">
                        <a class="taskItem-checkboxWrapper checkBox">
                            <span title="Mark as Completed"> 

                            </span> 
                            <span title="Mark as Not Completed"> 
                            
                            </span> 
                        </a>
                        <div class="taskItem-titleWrapper">
                            <span class="taskItem-titleWrapper-title">${data.dailytask}</span>  
                            </div>
                            <div class='action-btns'>
                                <span class='edit-btn' onclick="editTask('${data._id}' , '${data.dailytask}')"></span> 
                                <span class='delete-btn' onclick="deleteTask('${data._id}')"></span>
                                </div>
                                </div>                                         
                            </li>
                    `;
                    $("#dailytask").val('');
                    let audio = new Audio('sounds/wl3-notification.m4a');
                    audio.play();
                },
                error: function (error) {
                    console.log(error);
                }
            })

        })
    }
}


// edit functionlity code below 
function editTask(id, task) {
    $("#createNewTask").hide();
    $("#updateDailyTask").show();

    document.getElementById('updateDailyTask').innerHTML = `
        <input type="text" 
                   name="taskUpdate" 
                   id="taskUpdate" 
                   placeholder="Update Task..." 
                   class="addTask-input chromeless" 
                   autocomplete="off" onkeypress="updateTask(event , '${id}')">
    `
    $("#taskUpdate").val(task);
}

function updateTask(e, id) {
    if (e.keyCode == 13) {
        console.log('hello world', e);
        console.log('id', id);
        console.log($("#taskUpdate").val())
        let taskUpdate = $("#taskUpdate").val(); 
        $.ajax({
            type: 'PATCH',
            url: 'http://localhost:3000/task/' + id,
            data: JSON.stringify({ dailytask : taskUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(success){
                 $("#createNewTask").show();
                 $("#updateDailyTask").hide();
                 getTasks()
            },
            error: function(error){
                console.log(error);
            }
        })
    }
}


// delete functionality code below
function deleteTask(id) {
    var audio = $("#wl3-complete");
    if (confirm("Are you sure to remove this task")) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/task/' + id,
            success: function (data) {
                getTasks();
                alert(data.text);
                let audio = new Audio('sounds/wl3-complete.m4a');
                audio.play();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

}



