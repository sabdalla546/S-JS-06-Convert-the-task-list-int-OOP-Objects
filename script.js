let listItem=
    localStorage.getItem('tasks')? 
    JSON.parse(localStorage.getItem('tasks')):[];
class Todo {
    constructor(taskName,Priority){
        this.taskName=taskName;
        this.Priority=Priority;
    }
}
class Ui {
    static displayItemToPage(){
        let task='';
        for(let i=0 ; i< listItem.length ; i++){
                task+=`
            <div class="task-content">
                    <span>${i+1}</span>
                <input type="text" class='task-name' disabled='true' value="${listItem[i].taskName}"  >
                <input type="number" class='Priority'  disabled='true' value=${listItem[i].Priority} >
                <span class="update">
                    <button class="save">Save</button>
                    <button class="cancle">cancle</button>
                </span>
                <span class="action">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </span>
                </div>
            `
        }
        document.querySelector('.todo-body').innerHTML+=task;
        
        
    }
    static deleteTask (){
        const deleteBtn=document.querySelectorAll('.delete');
        deleteBtn.forEach((element,index) => {
            element.addEventListener('click',()=>{
                listItem.splice(index,1);
                //console.log(listItem.splice(index,1))
                localStorage.setItem('tasks', JSON.stringify(listItem));
                location.reload();
            })
        });
    }
    static editTask (){
        const editBtn=document.querySelectorAll('.edit');
        const updateDiv=document.querySelectorAll('.update');
        const taskNameInput= document.querySelectorAll('.task-name')
        const priorityInput= document.querySelectorAll('.Priority')
        editBtn.forEach((element,i)=>{
            element.addEventListener('click',(e)=>{
                updateDiv[i].style.display='inline-block';
                taskNameInput[i].disabled=false;
                priorityInput[i].disabled=false;
            })
        });
    }
    static activateSaveBtn(){
        const saveBtn=document.querySelectorAll('.save');
        const taskNameInput= document.querySelectorAll('.task-name');
        const priorityInput= document.querySelectorAll('.Priority');
        saveBtn.forEach((element,index)=>{
            element.addEventListener('click',()=>{
                listItem[index].taskName=taskNameInput[index].value;
                listItem[index].Priority=priorityInput[index].value;
                //console.log(taskNameInput[index].value)
                localStorage.setItem('tasks',JSON.stringify(listItem));
                location.reload();
            })
        })
    }
    static activateCancleBtn () {
        const cancleBtn=document.querySelectorAll('.cancle')
        const updateDiv=document.querySelectorAll('.update');
        const taskNameInput= document.querySelectorAll('.task-name')
        const priorityInput= document.querySelectorAll('.Priority')
        cancleBtn.forEach((element,i)=>{
            element.addEventListener('click',()=>{
                updateDiv[i].style.display='none';
                taskNameInput[i].disabled=true;
                priorityInput[i].disabled=true;
    
            })
        })           
    }
    static sortTasks (){
        const sortPriority=document.getElementById('Priority-item');
        sortPriority.addEventListener('click',(e)=>{
        const sortedList=listItem.sort((firstItem, secondItem) => firstItem.Priority - secondItem.Priority);
        localStorage.setItem('tasks',JSON.stringify(sortedList));
    
        location.reload();
    
    
        })
    }
}
document.getElementById('add').addEventListener('click',(e)=>{
    const taskName=document.getElementById('task-Name').value;
    const prior = document.getElementById('prio').value;
    if(taskName!==''&& prior !=='' && prior>0){
        const todo=new Todo(taskName,prior);
        listItem=[...listItem,todo];
        localStorage.setItem('tasks', JSON.stringify(listItem));
        location.reload();
        console.log(listItem);
    }else {
        alert("pls enter the valid value");
    }
    
    //createItem(taskName,prior);
})  

window.onload = function(){
    Ui.displayItemToPage();
    Ui.deleteTask();
    Ui.editTask();
    Ui.activateSaveBtn();
    Ui.activateCancleBtn();
    Ui.sortTasks();
}