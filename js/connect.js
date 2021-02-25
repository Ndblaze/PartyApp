// this file is for the javascript DOM manipulation

var menuBtn = document.getElementById("menu-btn");
var sidenav = document.querySelector(".sidenav");  
var backArrow = document.querySelector(".fa-arrow-left");  
 

const add_btn = document.querySelector('#add-btn');
const myPartiesBtn = document.querySelector('#myParties');
var Account_details = document.getElementById("Account-details");
var pupModal = document.getElementById("pupModal");

const add_flier = document.querySelector('#add-flier');

// making the menu button functions to work only if we are on mobile screen size
function checkScreenSize(){
    if(window.matchMedia("(max-width: 767px)").matches){
        return true;
    }
    return false;
}

menuBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    if(checkScreenSize() == true){
        sidenav.style.left = "0";
    }
});

backArrow.addEventListener('click', (e) => {
    e.preventDefault(); 
    if(checkScreenSize() == true){
        sidenav.style.left = "-230px";
    }
});

// changing some functionalities incase the user creates a party or not, clickes a button etc ........
const setupUI = (user) => {
    if(user){
          myPartiesBtn.addEventListener('click', (e) => {
          e.preventDefault();
                   Account_details.style.display = "block";
                   if(checkScreenSize() == true){
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


 // closing and reseting all our open pup up's  
 function addNewParty_colse(){
    Account_details.style.display = "none"; 
    
    pupModal.style.display = "none";

    document.getElementById("flier_img").src = '';

    document.getElementById("poster").value = '';

    var party_form = document.getElementById("party_form");
    party_form.reset();
    

   // changing back there css original state after successsfull submit of form-------
    title_p.parentElement.className = 'form-control';
    discription_p.parentElement.className = 'form-control';
    location_p.parentElement.className = 'form-control';
    phone_number_p.parentElement.className = 'form-control'
    gateFee_p.parentElement.className = 'form-control';
}

// making an auths check state to knw which fonctionalities to show, change and vise vasal


function check(user) {
    
    if(user){
        database.collection("allParty").doc(user.uid).get().then(function (doc) {
            if(doc.exists){
                add_flier.style.display = 'none';
                myPartiesBtn.style.display = 'block';
                accountDetailsSetup(doc);
                id_To_creatPartyBtn(user);
            }else{
                myPartiesBtn.style.display ='none';
                add_flier.style.display = 'flex';
                id_To_creatPartyBtn();
            
            }
        });
        
    }else{

    }

}


function id_To_creatPartyBtn(user){  
    if(user){
        const edithPartyBtn = document.querySelector('#creatPartyBtn');
        edithPartyBtn.id = "edith";

        edithPartyBtn.innerHTML = 'Edith Party';

        
    } else{
        const creatPartyBtn = document.querySelector('#edith');
        creatPartyBtn.id = "creatPartyBtn";

        creatPartyBtn.innerHTML = 'Create';

    }
    

}


// ----------------- sending to the dom  (party container division)  -------------------------

const partyContainer = document.querySelector('#party-container');

const setupParty = (data) => {

    let html= '';
    data.forEach(doc => {
        const party = doc.data();
        var imgLink = party.private.link;
        const row = `
            <div class="row">
               <div class="left-col">
                   <div class="flier-box">
                       <div class="slide">
                           ${'<img src="'+ imgLink +'" alt="" id="img"> '}
                       </div>
                   </div>
               </div>
               <div class="right-col">
                   <div class="slide">
                       <h1><b> Tiltle</b>: <span> ${party.private.title} <span></h1>
                       <p><b> Discription</b>: ${party.private.discription}</p>
                       <small><b>Contact no</b>: ${party.private.phone_number}</small><br>
                       <small><b> Location</b>:  ${party.private.location}</small><br>
                       <small><b> Gate Fee</b>: ${party.private.gateFee}</small>
                       <br>
                       <div class="rating" >
                            <i class="fa fa-star " ></i>
                            <i class="fa fa-star " ></i>
                            <i class="fa fa-star " ></i>
                            <i class="fa fa-star " ></i>
                            <i class="fa fa-star-o " ></i>
                            <p id="${party.private.userId}" onClick="getPostId (this.id)"><i class="fa fa-heart-o">  </i> </p>
                       </div>
                   </div>
               </div>
            </div>
         `;
        
         html += row 

    }); 
    partyContainer.innerHTML = html; 
}    


// function to validate likes 
const PartyLikes = (data) => {

    let html= '';
    data.forEach(doc => {
        const party = doc.data();

        document.getElementById(party.post_uid)
        .innerHTML = '<i class="fa fa-heart-o">' + ' ' +  party.listOfLikedUsers.length + " </i>";
        query_for_user_likes();
    })
}   



// getting a snapshort of the users personal party if there is and updatin it to the my_party_container division
const accountDetailsSetup = (doc) => {
    const my_party_container = document.querySelector('#my_party-container');
    let html= '';
        const myparty = doc.data();
        var imgLink = myparty.private.link;
        
        const myRow = `
            <div class="row">
               <div class="left-col">
                   <div class="flier-box">
                       <div class="slide">
                           ${'<img src="'+ imgLink +'" alt="" id="img"> '}
                       </div>
                   </div>
               </div>
               <div class="right-col">
                   <div class="slide">
                       <h1><b>Tiltle</b>: ${myparty.private.title}</h1>
                       <p><b>Discription</b>: ${myparty.private.discription}</p>
                       <small><b>Contact no</b>: ${myparty.private.phone_number}</small><br>
                       <small><b>Location</b>:  ${myparty.private.location}</small><br>
                       <small><b>Gate Fee</b>: ${myparty.private.gateFee}</small>
                       
                       <div class="rating">
                            <i class="fa fa-star" ></i>
                            <i class="fa fa-star" ></i>
                            <i class="fa fa-star" ></i>
                            <i class="fa fa-star" ></i>
                            <i class="fa fa-star-o" ></i>
                       </div>
                   </div>
               </div>
            </div>
         `;
        
         html += myRow 

    my_party_container.innerHTML = html;  
}





                    
                
            


