
var title_p = document.getElementById("title");
var discription_p = document.getElementById("discription");
var location_p = document.getElementById("location");
var phone_number_p = document.getElementById("phone_number");
var gateFee_p = document.getElementById("gateFee");
// selecting a file you choos to upload ......

 const selecttBtn = document.getElementById("poster");
 const image = document.getElementById("flier_img");
 const progressBar = document.getElementById("progress");
 var file_name;
 var file;
 var posterURL;
 
            selecttBtn.addEventListener("change", function(){
                    file = this.files[0];
                    file_name = file.name;
                    console.log(file_name);
                    if (file){
                        const reader = new FileReader();
                        reader.addEventListener("load", function(){
                                image.setAttribute("src", this.result);
                        });
                        
                        reader.readAsDataURL(file);
                    }else{
                        image.setAttribute("src", "");
                    }
            });


const pushData = (user) => {
    
    const creatPartyBtn = document.querySelector('#party_form');
    creatPartyBtn.addEventListener("submit", (e) => {
        e.preventDefault();

        checkInput();

            if(checkInput() == true ){
                var title_p = document.getElementById("title").value;
                var discription_p = document.getElementById("discription").value;
                var location_p = document.getElementById("location").value;
                var phone_number_p = document.getElementById("phone_number").value;
                var gateFee_p = document.getElementById("gateFee").value;

                const task = firebase.storage().ref('posters/' + user.uid + '/'+ file_name).put(file);
                task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
                posterURL = url;

                database.collection('allParty').doc(user.uid).set({
                    title: title_p,
                    discription: discription_p,
                    location: location_p,
                    phone_number: phone_number_p,
                    gateFee: gateFee_p,
                    link: posterURL
                
                });    
            
                document.getElementById("title").value = '';
                document.getElementById("discription").value = '';
                document.getElementById("location").value = '';
                document.getElementById("phone_number").value = '';
                document.getElementById("gateFee").value = '';
                document.getElementById("flier_img").src = '';
                document.getElementById("poster").value = '';

                    console.log(posterURL);
                
                    }).catch(error => {
                        alert(error.message);
                    });

                    addNewParty_colse();
            }
         
    });
}
        
    



function checkInput() {
    const title_value = title_p.value.trim();
    const discription_value = discription_p.value.trim();
    const location_value = location_p.value.trim();
    const phone_number_value = phone_number_p.value.trim();
    const gateFee_value = gateFee_p.value.trim();

    if(title_value == '') {
        //show error
        //add error class
        setError(title_p, "Title of party is required");
        return false;
    }else{

        setSuccess(title_p);
    }

    if(discription_value == ''){
        //show error
        //add error class
        setError(discription_p, "Discription of party is required");
        return false;
    }else{
        
        setSuccess(discription_p);
        
    }

    if(location_value == ''){
        //show error
        //add error class
        setError(location_p, "Location of party is required");
        return false;
    }else{
        
        setSuccess(location_p);

    }

    if(phone_number_value == ''){
        //show error
        //add error class
        setError(phone_number_p, "Phone number is required");
        return false;
    }else{
        if(mobileValidation(phone_number_value) == true){

            setSuccess(phone_number_p);

        }else{

            setError(phone_number_p, "Phone number not correct");
            return false;
        } 
        
    }

    if(gateFee_value == ''){
        //show error
        //add error class
        setError(gateFee_p, "Gate fee is required");
        return false;
    }else{
        
        setSuccess(gateFee_p);
        
    }

    return true;

}

function mobileValidation(value){
    
    var regx = /^[0][7-9][0]\d{8}$/;

    if (regx.test(value)) {
         return true;   
    }else{
        return false;
    }
}

function setError(input , message){
      const formControl = input.parentElement;
      const small = formControl.querySelector('small');

      small.innerText= message;

      //add error class
      formControl.className = 'form-control error';
}

function setSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


// ----------------- sending to the dom  -------------------------

const partyContainer = document.querySelector('#party-container');

const setupParty = (data) => {

    let html= '';
    data.forEach(doc => {
        const party = doc.data();
        var imgLink = party.link;
        
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
                       <h1><b> Tiltle</b>: <span> ${party.title} <span></h1>
                       <p><b> Discription</b>: ${party.discription}</p>
                       <small><b>Contact no</b>: ${party.phone_number}</small><br>
                       <small><b> Location</b>:  ${party.location}</small><br>
                       <small><b> Gate Fee</b>: ${party.gateFee}</small>
                       <br>
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
        
         html += row 

    }); 
    partyContainer.innerHTML = html;  
}



const accountDetailsSetup = (doc) => {
    const my_party_container = document.querySelector('#my_party-container');

    let html= '';
        const myparty = doc.data();
        var imgLink = myparty.link;
        
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
                       <h1><b>Tiltle</b>: ${myparty.title}</h1>
                       <p><b>Discription</b>: ${myparty.discription}</p>
                       <small><b>Contact no</b>: ${myparty.phone_number}</small><br>
                       <small><b>Location</b>:  ${myparty.location}</small><br>
                       <small><b>Gate Fee</b>: ${myparty.gateFee}</small>
                       
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


/* ----------------- updating and edithing to the dom  -------------------------*/
const Edith_party = document.querySelector('#Edith_party');

Edith_party.addEventListener("click", (e) => {
    e.preventDefault();
        
    Account_details.style.display = "none";
    pupModal.style.display = "flex";
        
    const creatPartyBtn = document.querySelector('#creatPartyBtn');
    creatPartyBtn.id = "edith";

});    

const Edith = (user) => {

    const EdithPartyBtn = document.querySelector('#edith');
    EdithPartyBtn.addEventListener("submit", (e) => {
        e.preventDefault();
           checkInput();

            if(checkInput() == true ){
                var title_update = title_p.value;
                var discription_update = discription_p.value;
                var location_update = location_p.value;
                var phone_number_update = phone_number_p.value;
                var gateFee_update = gateFee_p.value;

     // still need to find a way to delet the old pic or poster before te user upload new one so not to fload data base

                const task = firebase.storage().ref('posters/' + user.uid + '/'+ file_name).put(file);
                task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
                posterURL = url;

                database.collection('allParty').doc(user.uid).update({
                    title: title_update,
                    discription: discription_update,
                    location: location_update,
                    phone_number: phone_number_update,
                    gateFee: gateFee_update,
                    link: posterURL
                
                });    
            
                document.getElementById("title").value = '';
                document.getElementById("discription").value = '';
                document.getElementById("location").value = '';
                document.getElementById("phone_number").value = '';
                document.getElementById("gateFee").value = '';
                document.getElementById("flier_img").src = '';
                document.getElementById("poster").value = '';

                    console.log(posterURL);
                
                    }).catch(error => {
                        alert(error.message);
                    });

                    addNewParty_colse();
         
            } 

     });
}


/* --------------------delecting A party -----------------------------*/

const delect_party = document.querySelector('#delect_party');

const delect = (user) => {
    delect_party.addEventListener("click", (e) => {
        e.preventDefault();
                
        const EdithPartyBtn = document.querySelector('#edith');
        EdithPartyBtn.id = "creatPartyBtn";
                 
                database.collection("allParty").doc(user.uid).delete().then(function() {
                    console.log("Party successfully deleted!");
                    addNewParty_colse();
                    alert("Party successfully deleted!");

                }).catch(function(error) {
                    alert("Error removing document: ", error);
                });
              
                storageDelect(user);
    })
} 


function storageDelect(user) {
            // Create a reference to the file to delete
        var delect = storage.ref().child('posters/' + user.uid + '/'+ file_name);
        // Delete the file
        delect.delete().then(function() {
            alert("Party pictures successfully deleted!");
        // File deleted successfully
        }).catch(function(error) {
        // Uh-oh, an error occurred!
        });
    
}



