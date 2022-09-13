window.addEventListener('load', function() {
    let formulario = document.querySelector('form');
    formulario.addEventListener('submit', function(evento) {
  
      evento.preventDefault();
    
    let nombre = document.querySelector('#name');
    if(nombre.value == ''){
     alert('El campo nombre no debe estar vacio')
     
    }
    let password = document.querySelector('#password')
    if(password.value.length < 8){
      console.log('Hubo un error en el password')
    }
  });

  formulario.addEventListener('onFocus', function(evento) {
    var x = document.getElementById("myForm")
    document.getElementById("name").style.backgroundColor = "red";
    document.getElementById("description").style.backgroundColor = "red";
}, true);

})
