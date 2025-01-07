


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
    
  if(activeUser){

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
      showData(data)
   document.getElementById("cartlength").innerHTML = cartData.length
   showData(data)


  }
  else{

    location.href = "register.html"

  }

    // console.log(id)

   
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
showData(data)
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
    showData(data)
    showCart(cartData)
}



function checkCart(id){

    let cartData = JSON.parse(localStorage.getItem("cartData")) || []

    cartData = cartData.filter((ele) => ele.id == id)

    return !cartData[0]
}


function checkQuantity(id){
   
  let  cart =  cartData.filter((ele) => ele.id == id)
    return cart[0].quantity
   
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

    <div class="col "  >
        <div class="box h-100 w-100" >
            <div class="card h-100 w-100" >
                <img src="${ele.image}" height="300px";  class="card-img-top w-100 p-3" alt="...">
                <div class="card-body" >
                <h5 class="card-title">${ele.title}</h5>
                <p class="card-text">${ele.category}</p>
                
                <p class="card-text h5 fw-bolder text-dark">$${ele.price}
                    <span class="ms-5 text-normal">${ele.rating.rate}⭐</span>
                </p>
                
        
              

                 
               
                ${
                    !checkCart(ele.id)
                    ?
                    `
                        <button onclick="incCount(${ele.id})" class="btn btn-outline-danger btn-sm ms-4">+</button>
                        <button class="btn-outline-primary text-dark btn-sm">${checkQuantity(ele.id)}</button>
                        <button onclick="decCount(${ele.id})" class="btn btn-outline-danger btn-sm">−</button>
                    
                    `
                    :
                    `
                    <div class="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1 g-2">
                        <div class="col">
                          <button onclick="addCart(${ele.id})" class="btn btn-primary w-100 ">
                          Add to cart
                          </button>
                        </div>

                        <div class="col">
                            <a onclick="eachdata(${ele.id})" class="btn btn-secondary w-100" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"> More
                            </a>
                        </div>
                    </div>
                        

                           

                    `
                }

                

                </div>
            </div>
        </div>
    </div>

    `
})
}







function myPlugin({ swiper, extendParams, on }) {
    extendParams({
      debugger: false,
    });

    on('init', () => {
      if (!swiper.params.debugger) return;
      console.log('init');
    });
    on('click', (swiper, e) => {
      if (!swiper.params.debugger) return;
      console.log('click');
    });
    on('tap', (swiper, e) => {
      if (!swiper.params.debugger) return;
      console.log('tap');
    });
    on('doubleTap', (swiper, e) => {
      if (!swiper.params.debugger) return;
      console.log('doubleTap');
    });
    on('sliderMove', (swiper, e) => {
      if (!swiper.params.debugger) return;
      console.log('sliderMove');
    });
    on('slideChange', () => {
      if (!swiper.params.debugger) return;
      console.log(
        'slideChange',
        swiper.previousIndex,
        '->',
        swiper.activeIndex
      );
    });
    on('slideChangeTransitionStart', () => {
      if (!swiper.params.debugger) return;
      console.log('slideChangeTransitionStart');
    });
    on('slideChangeTransitionEnd', () => {
      if (!swiper.params.debugger) return;
      console.log('slideChangeTransitionEnd');
    });
    on('transitionStart', () => {
      if (!swiper.params.debugger) return;
      console.log('transitionStart');
    });
    on('transitionEnd', () => {
      if (!swiper.params.debugger) return;
      console.log('transitionEnd');
    });
    on('fromEdge', () => {
      if (!swiper.params.debugger) return;
      console.log('fromEdge');
    });
    on('reachBeginning', () => {
      if (!swiper.params.debugger) return;
      console.log('reachBeginning');
    });
    on('reachEnd', () => {
      if (!swiper.params.debugger) return;
      console.log('reachEnd');
    });
  }



  // Init Swiper
  var swiper = new Swiper('.swiper', {
    // Install Plugin To Swiper
    modules: [myPlugin],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // Enable debugger
    debugger: true,
  });

