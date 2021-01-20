
const createInfo = document.querySelector("#create-info");

createInfo.addEventListener("submit", (e) => {
    e.preventDefault();
    
    //get user info
    const email = createInfo['email'].value;
    const password = createInfo['password'].value;

    //creat the user

    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        createInfo.reset();
        window.location.href = "main.html";
    }).then(() =>{
        alert("sign in successfull");
    }).catch(error => {
        alert(error.message);
    });

});



