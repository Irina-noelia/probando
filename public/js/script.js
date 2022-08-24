window.addEventListener('load', function() {
    let formulario = document.querySelector('register');
    formulario.addEventListener('submit', function(evento) {
  
      evento.preventDefault()
    })
    let email = document.querySelector('#email');
    if(email.value == ''){
      console.log('Hubo un error en el mail')
    }
    let password = document.querySelector('#password')
    if(password.value.length < 8){
      console.log('Hubo un error en el password')
    }
  });