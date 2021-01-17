
firebase.auth().onAuthStateChanged(function(user)
{
    if(user){
        database.collection('allParty').onSnapshot((snapshot) => {
            setupParty(snapshot.docs);   
            setupUI(user);
            likes(user);
            pushData(user);
            check(user);
            delect(user);
            Edith(user);
            

        }, err =>{
            console.log(err.message)
        }); 
    }else{
        setupParty([]);
        setupUI();
        check();
        pushData();
        delect();
        Edith();
    }
});

var menuBtn = document.getElementById("menu-btn");
var sidenav = document.querySelector(".sidenav");  
var backArrow = document.querySelector(".fa-arrow-left");
    
menuBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    if(window.matchMedia("(max-width: 767px)").matches){
        sidenav.style.left = "0";
    }
});

backArrow.addEventListener('click', (e) => {
    e.preventDefault(); 
    if(window.matchMedia("(max-width: 767px)").matches){
        sidenav.style.left = "-230px";
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
                     if(window.matchMedia("(max-width: 767px)").matches){
                        sidenav.style.left = "-230px";
                    }
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
    var party_form = document.getElementById("party_form");
    party_form.reset();
   
    
   // changing back there css original state after successsfull submit of form-------
    title_p.parentElement.className = 'form-control';
    discription_p.parentElement.className = 'form-control';
    location_p.parentElement.className = 'form-control';
    phone_number_p.parentElement.className = 'form-control'
    gateFee_p.parentElement.className = 'form-control';
}



const add_flier = document.querySelector('#add-flier');

function check(user) {
    
    if(user){

        database.collection("allParty").doc(user.uid).get().then(function (doc) {
            if(doc.exists){
                add_flier.style.display = 'none';
                myPartiesBtn.style.display = 'block';
                accountDetailsSetup(doc);
                id_To_edith();
                
            }else{
                myPartiesBtn.style.display ='none';
                add_flier.style.display = 'flex';
                id_To_creatPartyBtn();
            }
        });
        
    }else{

    }

}

function id_To_edith (){   
    const creatPartyBtn = document.querySelector('#creatPartyBtn');
    creatPartyBtn.id = "edith";

}

function id_To_creatPartyBtn (){   
    const creatPartyBtn = document.querySelector('#edith');
    creatPartyBtn.id = "creatPartyBtn";

}



                    
                
            


