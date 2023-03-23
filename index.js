var form=document.getElementById('form');
var list=document.getElementById('list');
var item=document.getElementById('item');
var description=document.getElementById('description');
var price=document.getElementById('price');
var quantity=document.getElementById('quantity');
form.addEventListener('submit',local)
function local(e){
    e.preventDefault();
    var item=e.target.item.value;
    var description=e.target.description.value;
    var price=e.target.price.value;
    var quantity=e.target.quantity.value;
   let obj={
     item,
     description,
     price,
     quantity
   };
   axios.post('http://localhost:3000/add-item',obj)
   .then((res)=>{
    console.log(res)
    onsubmit(res.data.newItemDetail);
   })
   .catch((err)=>{
    document.body.innerHTML=document.body.innerHTML+`<h4>Something went wrong</h4>`
})
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/get-item')
        .then((res)=>{
            for(var i=0;i<res.data.newItemDetail.length;i++){
                onsubmit(res.data.newItemDetail[i]);
            }
            console.log(res)
        })
        .catch((err)=>console.log(err));

     })

function onsubmit(item){
    var btn1=document.createElement('button');
    btn1.appendChild(document.createTextNode('Buy 1'));
    var btn2=document.createElement('button');
    btn2.appendChild(document.createTextNode('Buy 2'));
    var btn3=document.createElement('button');
    btn3.appendChild(document.createTextNode('Buy 3'));
    btn1.setAttribute('onclick',"buy1('"+item.id+"','"+item.item+"','"+item.description+"','"+item.price+"','"+item.quantity+"')");
    btn2.setAttribute('onclick',"buy2('"+item.id+"','"+item.item+"','"+item.description+"','"+item.price+"','"+item.quantity+"')");
    btn3.setAttribute('onclick',"buy3('"+item.id+"','"+item.item+"','"+item.description+"','"+item.price+"','"+item.quantity+"')");
    var li=document.createElement('li');
    li.id=item.id;
    li.appendChild(document.createTextNode(`Item Name:${item.item},Description:${item.description},Price:${item.price},Quantity:${item.quantity}`));
    li.appendChild(btn1);
    li.appendChild(btn2);
    li.appendChild(btn3);
    list.appendChild(li);
}
function buy1(id,item,desc,price,quan){
    console.log(id);
    const newQuantity=quan-1;
    const newitem={
    item:item,
     description:desc,
     price:price,
     quantity:newQuantity
    }
    axios.post(`http://localhost:3000/edit-item/${id}`,newitem).then(res=>{
        onsubmit(res.data.newItemDetail);
    })
}
function buy2(id,item,desc,price,quan){
    console.log(id);
    const newQuantity=quan-2;
    const newitem={
    item:item,
     description:desc,
     price:price,
     quantity:newQuantity
    }
    axios.post(`http://localhost:3000/edit-item/${id}`,newitem).then(res=>{
        onsubmit(res.data.newItemDetail);
    })
}
function buy3(id,item,desc,price,quan){
    console.log(id);
    const newQuantity=quan-3;
    const newitem={
    item:item,
     description:desc,
     price:price,
     quantity:newQuantity
    }
    axios.post(`http://localhost:3000/edit-item/${id}`,newitem).then(res=>{
        onsubmit(res.data.newItemDetail);
    })
}