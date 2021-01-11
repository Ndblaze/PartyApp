
 const loginInfo = document.querySelector(".login-info");

 loginInfo.addEventListener("submit", (e) => {
     e.preventDefault();
     
     //get user info
     const email = loginInfo['email'].value;
     const password = loginInfo['password'].value;
 
     //creat the user
 
     auth.signInWithEmailAndPassword(email, password).then(cred =>{
         
         loginInfo.reset();
         window.location.href = "main.html";
     }).then(() =>{

         alert("log in successfull");
     });
 
 });
           
        