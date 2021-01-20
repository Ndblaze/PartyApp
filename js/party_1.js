
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


 
const creatPartyBtn = document.querySelector('#party_form');

creatPartyBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    var user = auth.currentUser;
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
            
            //calling the function to push data to our database
            uploead_to_allParty(user, title_p, discription_p, location_p, phone_number_p, gateFee_p);
        
            }).catch(error => {

                alert(error.message);
            });
            refresh(user);
            addNewParty_colse();
        }
         
});

        
function uploead_to_allParty(user, title_p, discription_p, location_p, phone_number_p, gateFee_p){

    const allParty = database.collection('allParty').doc(user.uid);
    allParty.set({
        private : {
            title: title_p,
            discription: discription_p,
            location: location_p,
            phone_number: phone_number_p,
            gateFee: gateFee_p,
            link: posterURL,
            userId: user.uid
            },

        public : {
            defualt_rating: 20,
            post_uid: user.uid,
            likes: 0,
            },
         
        listOfLikedUsers: []    
        
    }).then(() =>{ 

    }).catch(function(error) {
        console.error("Error adding document: ", error);
        return false;
    });
    
} 

// checking and validating out inputs to see if the user is entering a vaild value

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

// users mobile number validation
function mobileValidation(value){
    
    var regx = /^[0][7-9][0]\d{8}$/;

    if (regx.test(value)) {
         return true;   
    }else{
        return false;
    }
}

// on success and Error messages
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
        var myLikes = check_array(party);
    
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
                            <p id="${party.public.post_uid}" onClick="getPostId (this.id)"><i class="fa fa-heart-o"> ${myLikes}</i> </p>
                       </div>
                   </div>
               </div>
            </div>
         `;
        
         html += row 
         query_for_user_likes();
    }); 
    partyContainer.innerHTML = html; 
    
    
}

function query_for_user_likes(){
    var user = auth.currentUser;
    database.collection("allParty").where("listOfLikedUsers", "array-contains", user.uid).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
        if(window.matchMedia("(max-width: 767px)").matches){
            document.getElementById(doc.id).getElementsByTagName('i')[0].className = "fa fa-heart";
        }else{
            document.getElementById(doc.id).getElementsByTagName('i')[0].className = "fa fa-heart fa-2x";
        }
           

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        alert("Error getting documents: ", error);
    });
   
}

// getting a snapshort of the users personal party if there is
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


/* ----------------- updating and edithing to the dom  ---------------------------------*/   

const Edith_party = document.querySelector('#Edith_party');

Edith_party.addEventListener("click", (e) => {
e.preventDefault();  
    const EdithPartyBtn = document.querySelector('#edith'); 

    EdithPartyBtn.innerHTML = 'Edith Party';

    Account_details.style.display = "none";

    pupModal.style.display = "flex";

    var user = auth.currentUser;

    Edith(user, EdithPartyBtn);
});   

const Edith = (user, EdithPartyBtn) => {
    
   EdithPartyBtn.addEventListener("submit", (e) => {
        e.preventDefault();

           checkInput();

            if(checkInput() == true ){
                var title_update = title_p.value;
                var discription_update = discription_p.value;
                var location_update = location_p.value;
                var phone_number_update = phone_number_p.value;
                var gateFee_update = gateFee_p.value;
                
                // deleting the old pic to use a new one -------
                storageDelect(user);

                const task = firebase.storage().ref('posters/' + user.uid + '/'+ file_name).put(file);
                task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
                posterURL = url;

                database.collection('allParty').doc(user.uid).update({
                    private: {
                        title: title_update,
                        discription: discription_update,
                        location: location_update,
                        phone_number: phone_number_update,
                        gateFee: gateFee_update,
                        link: posterURL,
                    }
                
                }); 

                    console.log(posterURL);
                
                    }).catch(error => {
                        alert(error.message);
                    });
                    refresh(user)
                    addNewParty_colse();
         
            } 

     });
}


/* --------------------delecting A party ------------------------------------------*/

const delect_party = document.querySelector('#delect_party');

delect_party.addEventListener("click", (e) => {
    e.preventDefault();
    var user = auth.currentUser;
        if(warning() === true){
            database.collection("allParty").doc(user.uid).delete().then(function() {
                addNewParty_colse();
                alert("Party successfully deleted!");

            }).catch(function(error) {
                alert("Error removing document: ", error);
            });
            
            storageDelect(user);
            refresh(user);
        }  else{
            addNewParty_colse();
        }  
})



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

function warning(){
    var reply = confirm('are you sure you want to perform this action');
    return reply ;
}

