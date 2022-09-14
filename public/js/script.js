window.addEventListener('load', function() {
  let formulario = document.querySelector('#myForm');
  console.log(":cohete: ~ file: script.js ~ line 3 ~ window.addEventListener ~ formulario", formulario)
  let nombre = document.querySelector('#name');
  let description = document.querySelector('#descr')
  let precio = document.querySelector('#price')

  let contadorDeErrores = 0
  MostrarMensaje = (element, mensaje) =>{
    inputFail(element.parentElement)
    let paragraph = document.createElement("p");
    paragraph.classList.toggle("text-danger");
    paragraph.innerText = mensaje;
    element.insertAdjacentElement("afterend", paragraph)
  }
  inputFail = (element) => {
    element.classList.remove('inputSuccess');
    element.classList.add('inputFailure');
}
// Asigna clase de exito a un input
inputSuccess = (element) => {
    element.classList.remove('inputFailure');
    element.classList.add('inputSuccess');
}
// Borra mensajes de error
 deleteErrorMsg = (element) => {
    element.querySelectorAll('.text-danger').forEach(e=> e.remove())
 }
formulario.addEventListener("submit", (evento) => {
    contadorDeErrores = 0
    
    //document.querySelectorAll('.text-danger').forEach(e=> e.remove())
  if(!nombre.value){
    MostrarMensaje(nombre,"El nombre de producto debe estar completo");
    contadorDeErrores++
  }else {
    inputSuccess(nombre.parentElement)
}

  if(description.value.length < 8 ){
    MostrarMensaje(description, "El minimo de caracteres es de 8 letras");
    contadorDeErrores++
  }else{
    inputSuccess(description.parentElement)
  }

  if(!precio.value){
    MostrarMensaje(precio, "El campo precio es obligatorio");
    contadorDeErrores++
  }else{
    inputSuccess(precio.parentElement)
  }

  if(isNaN(precio.value)){
    MostrarMensaje(precio, "Por favor, introduce un número");
    contadorDeErrores++
  }else{
    inputSuccess(precio.parentElement)
  }

  if (contadorDeErrores > 0) {
    
    evento.preventDefault()
    
  }
 
  
  
})


})

window.addEventListener('load', function(){
  let formulario = document.querySelector('#myForm');
  let nombre = document.querySelector('#name');
  let description = document.querySelector('#descr');
  let precio = document.querySelector('#price')

  

  formulario.addEventListener("change", (evento) => {
    if(nombre.value){
      nombre.style.color = 'green';
      document.querySelectorAll('.text-danger').forEach(e=> e.remove()[0])
    }
     
    }

  
  , true)
  
  formulario.addEventListener("change", (evento) => {
    
    if(description.value.length > 8){
      description.style.color = 'green';
      
    }else {
      
        description.style.color = 'red';
        
      }
    }
     
    )

    formulario.addEventListener("change", (evento) => {
      if( isNaN(precio.value) ){
        precio.style.color = 'red';
        //MostrarMensaje(precio, "Por favor, introduce un número");
        
      }else {
        precio.style.color = 'green';
      }
      
       
      })

})

var h1 = document.querySelector("h1");

h1.addEventListener("input", function() {
    this.setAttribute("data-heading", this.innerText);
});