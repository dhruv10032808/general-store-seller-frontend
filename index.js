var list=document.getElementById("list");
var form=document.getElementById("form");
var a=document.getElementById("1");
var b=document.getElementById("2");
var c=document.getElementById("3");
var y=document.getElementById("all");

form.addEventListener("submit",local);
function local(e){
    e.preventDefault();
 var price=document.getElementById("price").value;
var dish=document.getElementById("dish").value;
var tables=document.getElementById("tables").value;
    var obj={
        price,
        dish,
        tables
    };
axios.post('http://localhost:3000/add-item',obj)
.then((res)=>{
    console.log(res.data.newItemDetail)
    add(res.data.newItemDetail);
})
.catch((err)=>console.log(err));
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get('http://localhost:3000/get-item')
    .then((res)=>{
        for(var i=0;i<res.data.newItemDetail.length;i++){
            add(res.data.newItemDetail[i]);
        }
    })
    .catch((err)=>console.log(err))
})
function add(user){

    var li=document.createElement('li')
    var p=document.createTextNode(`${user.price}-${user.dish}-${user.tables}   `);
    li.id=user.id;
    li.appendChild(p);
    var btn=document.createElement("button")
    btn.setAttribute("onclick","del('"+user.id+"')");
    btn.appendChild(document.createTextNode("Delete Order"));
    li.appendChild(btn);
    if(user.tables=="Table 1")
    {
        y.insertBefore(li,b);
    }
    else if(user.tables=="Table 2")
    {
        y.insertBefore(li,c)
    }
    else{
        y.appendChild(li);
    }

}

//console.log(y)
function del(userId){ 
    console.log(userId)
    axios.delete(`http://localhost:3000/delete-item/${userId}`) 
   .then((response)=>{
    const x=document.getElementById(userId);
    console.log(y)
    y.removeChild(x);
   })
   .catch((err)=>console.log(err));
}