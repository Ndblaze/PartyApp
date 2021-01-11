firebase.auth().onAuthStateChanged(function(user)
{
    if(user){
        database.collection('allParty').onSnapshot((snapshot) => {
            setupParty(snapshot.docs);   
            setupUI(user);
            pushData(user);
            check(user);
            delect(user);

        }, err =>{
            console.log(err.message)
        }); 
    }else{
        setupParty([]);
        setupUI();
        check();
        pushData();
        delect();
    }
});



// CREATINGG A NEW PARTY FLIER AND CLOSING  and   viewing my party and account details 
const add_btn = document.querySelector('#add-btn');
const myPartiesBtn = document.querySelector('#myParties');
var Account_details = document.getElementById("Account-details");
var pupModal = document.getElementById("pupModal");


const setupUI = (user) => {

      if(user){

            myPartiesBtn.addEventListener('click', (e) => {
            e.preventDefault();
                     Account_details.style.display = "block";
            });
            add_btn.addEventListener('click', (e) => {
                e.preventDefault();
                pupModal.style.display = "flex";       
            });
         
              

         }else{
            myPartiesBtn.addEventListener('click', (e) => {
                e.preventDefault();

                window.alert("you need to login to be able to create a party");
         });

         add_btn.addEventListener('click', (e) => {
            e.preventDefault();
                    
            window.alert("you need to login to be able to create a party");
        }); 

        }
    }      

function addNewParty_colse(){
    var Account_details = document.getElementById("Account-details");
    Account_details.style.display = "none"; 
    var pupModal = document.getElementById("pupModal");
    pupModal.style.display = "none";
    
    clearAll();
}

function clearAll() {
    document.getElementById("title").value = '';
    document.getElementById("discription").value = '';
    document.getElementById("location").value = '';
    document.getElementById("phone_number").value = '';
    document.getElementById("gateFee").value = '';
    document.getElementById("flier_img").src = '';
    document.getElementById("poster").value = '';   
    
}

const add_flier = document.querySelector('#add-flier');


function check(user) {
    
    if(user){

        database.collection("allParty").doc(user.uid).get().then(function (doc) {
            if(doc.exists){
                add_flier.style.display = 'none';
                myPartiesBtn.style.display = 'block';
                accountDetailsSetup(doc);
                
            }else{
                myPartiesBtn.style.display ='none';
                add_flier.style.display = 'flex';
                
            }
        });
        
    }else{

    }

 
}



var menuBtn = document.getElementById("menu-btn");
var sidenav = document.querySelector(".sidenav");  
var backArrow = document.querySelector(".fa-arrow-left");
menuBtn.onclick = function(){
        sidenav.style.left = "0";
}
backArrow.onclick = function(){
    sidenav.style.left = "-300px";
}
                    
                
            


