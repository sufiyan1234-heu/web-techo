function handleSubmit(){
    console.log("kjsdsflkjjlklsdgslakjfd")

    var email = document.getElementById('inputEmail');
  var password = document.getElementById('inputPassword')

  if(email.value){
    console.log("kjsdlakjfd")
   email.classList.remove('error')
      email.classList.add("success")
  }
  else{
    email.classList.add('error')
    email.classList.remove("success") 
  }
  if(password.value){
    console.log("kjsdlakjfd")
    password.classList.remove('error')
    password.classList.add("success")
  }
  else{
    password.classList.add('error')
    password.classList.remove("success") 
  }
}
