let table = document.getElementById('tab');
let todos=[]
let max = 0;
$(document).ready(function(){
    getAllStorage()
    $(document).on("change" , "#c" , function(event){


                let row=event.target.parentNode.parentNode;
                $(row).css("background-color",$(this).val());
                let key=event.target.parentNode.parentNode.firstElementChild.innerHTML
                let color=$(this).val()
                let index=event.target.parentNode.parentNode.getAttribute("class")
                UpdateExistingLocalStorage(key,{color:color,index:Number(index)})
    });
    $( "form" ).submit(function( event ){
        event.preventDefault();
        let result= $( this ).serializeArray();
            // let index = JSON.stringify(todos.reduce(function (prev, current) {
            //     return (prev.index < current.index) ? prev : current
            // }));
        if(todos.length>0){
            let index=todos.reduce((previous, current) => previous.index > current.index ? previous.index : current.index, 0);
            storeLocalStorage(result[0].value, {color: "#ffffff", index: index+1})
        }
        else{
            storeLocalStorage(result[0].value, {color: "#ffffff", index: 1})
        }
    });
});
function insertRows(todos) {
    todos.forEach((todo,index)=>{
        table.insertAdjacentHTML('beforeend',
            `<tr class="${todo.index}" style="background-color:${todo.color} ">
               <td>${todo.content.substring(2)}</td>
               <td><input id="c" type="color" name="favcolor" value="${todo.color}"></td>
               <td> <button class="btn down"  value="${todo.content}" onclick="downRow(this.parentNode.parentNode)">Down</button></td>
               <td> <button class="btn up"  value="${todo.content}" onclick="upRow(this.parentNode.parentNode)">Up</button></td>
               <td> <button class=" btn remove" value="${todo.content}" onclick="removeTodo(this.value)">Remove</td>
               
        </tr>`)
    });
}
function storeLocalStorage(k,v) {
    if(!localStorage.getItem("$$"+k)){
       console.log(localStorage.setItem("$$"+k,JSON.stringify(v)))
        history.go(0)
    }
    else alert("Todo already exist")
}
function UpdateExistingLocalStorage(k,v) {
    if(localStorage.getItem("$$"+k)){
        console.log(localStorage.setItem("$$"+k,JSON.stringify(v)))
        history.go(0)
    }
}

function sortTodo() {
    todos.sort((a, b) => a.index-b.index)
}

function getAllStorage() {
    for(let key in localStorage) {
        if(key.startsWith("$$")){
            todos.push({
                content :key,
                color : JSON.parse(localStorage.getItem(key)).color ,
                index : JSON.parse(localStorage.getItem(key)).index
            })
        }
    }
    sortTodo()
    console.log(todos)
    insertRows(todos)
}
function removeTodo(v) {
    console.log(v)
    if(localStorage.getItem(v)){
        localStorage.removeItem(v)
        history.go(0)
    }
    else alert("No Todo Found")
}
function upRow(tr) {
    let index= Number(tr.rowIndex)
    if(index > 1){
    let otherRow=table.rows[index-1]
    let currentRowIndex=table.rows[index].classList.value
    let otherRowIndex=table.rows[index-1].classList.value;
    [currentRowIndex, otherRowIndex] = [otherRowIndex, currentRowIndex];
    let key1=tr.cells[0].innerHTML
    let color1= tr.cells[1].firstElementChild.value
    let index1=currentRowIndex
    let key2=otherRow.cells[0].innerHTML
    let color2= otherRow.cells[1].firstElementChild.value
    let index2=otherRowIndex
    UpdateExistingLocalStorage(key1,{color: color1,index:index1})
    UpdateExistingLocalStorage(key2,{color: color2,index:index2})
        table.rows[index].parentNode.insertBefore(table.rows[index],table.rows[index-1]);
    }
}
function downRow(tr) {
    let index= Number(tr.rowIndex)
    if(index < table.rows.length -1){
    let otherRow=table.rows[index+1]
    let currentRowIndex=table.rows[index].classList.value
    let otherRowIndex=table.rows[index+1].classList.value;
    [currentRowIndex, otherRowIndex] = [otherRowIndex, currentRowIndex];
    let key1=tr.cells[0].innerHTML
    let color1= tr.cells[1].firstElementChild.value
    let index1=Number(currentRowIndex)
    let key2=otherRow.cells[0].innerHTML
    let color2= otherRow.cells[1].firstElementChild.value
    let index2=Number(otherRowIndex)
    UpdateExistingLocalStorage(key1,{color: color1,index:index1})
    UpdateExistingLocalStorage(key2,{color: color2,index:index2})
        table.rows[index].parentNode.insertBefore(table.rows[index + 1],table.rows[index]);
    }
}
