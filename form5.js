let name= document.getElementsByClassName("name")
let age= document.getElementsByClassName("age")
let p=document.getElementById('info')
let btn=document.getElementById("save");
name[0].addEventListener("input", validation);
//age[0].addEventListener("input", validation);
let AVG = ()=>{
     let output = document.getElementById("result");
    let js =  Number(document.getElementById("js").value);
    let HTML =  Number(document.getElementById("html").value);
    let Css =  Number(document.getElementById("css").value);
    console.log(js)
    console.log(HTML)
    console.log(Css)

    output.innerHTML=`${(js + HTML+ Css)/3}`;
}
function validation() {
    if(name[0].value.trim().length>=5 && name[0].value.trim().length<20){
        btn.disabled = false;
    }
    else{
        btn.disabled = true;
    }
}

