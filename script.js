


let boxes = document.querySelector("#boxes")

let viewall = document.querySelector("#viewall");
let men = document.querySelector("#men");
let women = document.querySelector("#women");
let jewelery = document.querySelector("#jewelery");
let low_sort = document.querySelector("#low_sort")
let high_sort = document.querySelector("#high_sort")


let cartData = JSON.parse(localStorage.getItem("cartData")) || []
window.onload= showData(data);

    let offcanvas = document.querySelector(".offcanvas-body")




let search = document.getElementById("search")

search.addEventListener("keyup",function(e){
    let val = e.target.value.toUpperCase();

    let searchData = data.filter((ele) => !ele.title.toUpperCase().indexOf(val) || !ele.category.toUpperCase().indexOf(val)  )

    console.log(searchData)

    showData(searchData)
})




viewall.addEventListener("click", () =>{
    let subdata = data.map((ele) => ele)
    console.log(subdata)
    showData(subdata)
})


men.addEventListener("click", () =>{
    let subdata = data.filter((ele) => ele.category == "men's clothing")
    console.log(subdata)
    showData(subdata)
})

women.addEventListener("click", () =>{
    let subdata = data.filter((ele) => ele.category == "women's clothing")
    console.log(subdata)
    showData(subdata)
})

jewelery.addEventListener("click", () =>{
    let subdata = data.filter((ele) => ele.category == "jewelery")
    console.log(subdata)
    showData(subdata)
})

high_sort.addEventListener("click", () =>{
     data.sort((a,b) => a.price - b.price)
     let subdata = data
    showData(subdata)
})


low_sort.addEventListener("click", () =>{
     data.sort((a,b) => b.price - a.price)
     let subdata = data
    showData(subdata)
})





function setCart(cd){
    localStorage.setItem("cartData",JSON.stringify(cd))

}
function addCart(id){
    

    console.log(id)

    let newcartData = data.filter((ele) => ele.id == id ).map((ele) =>{
        if(ele.id == id){
            ele.quantity = 1
        }
        return ele
    })
    
    console.log(newcartData)


    cartData = [...cartData, ...newcartData]
  
   
    // console.log(cartData)
    // showCart()

     setCart(cartData)

     document.getElementById("cartlength").innerHTML = cartData.length


}


     document.getElementById("cartlength").innerHTML = cartData.length;

function removeItem(id){

    let remcartData = cartData.filter((ele) => ele.id != id)


    setCart(remcartData)

    cartData = JSON.parse(localStorage.getItem("cartData"))
    showCart(cartData)
   
}


function incCount(id){
    cartData = cartData.map((ele) => {
        if(ele.id == id){
            ele.quantity += 1
        }
        return ele
    })


setCart(cartData)
    showCart(cartData)
}


function decCount(id){
    cartData = cartData.map((ele) => {
        if(ele.id == id){
            if(ele.quantity > 1){
                ele.quantity -= 1
            }
            else{
                return ele = null
            }
        }
        return ele
    }).filter((ele) => ele != null)


    setCart(cartData)
    showCart(cartData)
}

function checkCart(id){

    let cartData = JSON.parse(localStorage.getItem("cartData")) || []

    cartData = cartData.filter((ele) => ele.id == id)

    return !cartData[0]
}


function eachdata(id){

let eachdata = data.filter((ele) => ele.id == id )
console.log(eachdata)
showeachdata(eachdata)
}

function showeachdata(eachdata){

    
document.querySelector(".offcanvas-body")

eachdata.map((ele) => {

offcanvas.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${ele.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${ele.title}</h5>
            <p class="card-text">${ele.description}</p>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">${ele.category}</li>
            <li class="list-group-item">${ele.price}</li>
            <li class="list-group-item">${ele.rating.rate} | ${ele.rating.count}</li>
        </ul>
           
        </div>
        </div>

`
})

}


// data = JSON.parse(localStorage.getItem("data")) || []


function showData(subdata){
boxes.innerHTML = "";

    subdata.map((ele) =>{

boxes.innerHTML += `

    <div class="col">
        <div class="box">
            <div class="card" style="width: 18rem; Height: 550px;">
                <img src="${ele.image}" Height="300px" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${ele.title}</h5>
                <p class="card-text">${ele.category}</p>
                
                <p class="card-text fs-4 fw-bolder text-dark">$${ele.price}
                    <span class="ms-5 text-normal">${ele.rating.rate}⭐</span>
                </p>
                
        
                 <a onclick="eachdata(${ele.id})" class="btn btn-secondary " data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"> More
                </a>

                 
               
                ${
                    !checkCart(ele.id)
                    ?
                    `
                        <button onclick="incCount(${ele.id})" class="btn btn-outline-danger btn-sm ms-4">+</button>
                        <button class="btn-outline-primary text-dark btn-sm">${ele.quantity}</button>
                        <button onclick="decCount(${ele.id})" class="btn btn-outline-danger btn-sm">−</button>
                    
                    `
                    :
                    `
                        <button onclick="addCart(${ele.id})" class="btn btn-primary  ms-5">
                        Add to cart
                        </button>

                    `
                }

                

                </div>
            </div>
        </div>
    </div>

    `
})
}




