
firebase.auth().onAuthStateChanged(function(user)
{
    snapshortAllParty(user);
    snapshortLikes(user)
});

function refresh(user){
    database.collection('allParty').onSnapshot((snapshot) => {
        setupParty(snapshot.docs);
        setupUI(user);
        check(user);   
    }, err =>{
        alert("Error getting documents: ", error)
        console.log(err.message)
    }); 

    database.collection('Likes').onSnapshot((snapshot) => {
        PartyLikes(snapshot); 
    }, err =>{
        alert("Error getting documents: ", error)
        console.log(err.message)
    });


}

function snapshortAllParty(user){
    if(user){ 
        database.collection('allParty').get().then(function(querySnapshot) {
                 setupParty(querySnapshot);   
                 setupUI(user);
                 check(user);
         
        }).catch(function(error) {
            alert("Error getting documents: ", error);
            console.log("Error getting documents: ", error);
        }); 
    }else{
        setupParty([]);
        setupUI();
        check();
    }
}

function snapshortLikes(user){
    if(user){ 
        database.collection('Likes').get().then(function(querySnapshot) {
            PartyLikes(querySnapshot);   
        }).catch(function(error) {
            alert("Error getting documents: ", error);
            console.log("Error getting documents: ", error);
        }); 
    }else{
        setupParty([]);
    }
}


var title_p = document.getElementById("title");
var discription_p = document.getElementById("discription");
var location_p = document.getElementById("location");
var phone_number_p = document.getElementById("phone_number");
var gateFee_p = document.getElementById("gateFee");


 const selecttBtn = document.getElementById("poster");
 const image = document.getElementById("flier_img");
 const progressBar = document.getElementById("progress");


// function to get values of the pup up moda inputes 

 function getInputsValues(){

    var title_p = document.getElementById("title").value;
    var discription_p = document.getElementById("discription").value;
    var location_p = document.getElementById("location").value;
    var phone_number_p = document.getElementById("phone_number").value;
    var gateFee_p = document.getElementById("gateFee").value;

    var inputs = [title_p, discription_p, location_p, phone_number_p, gateFee_p ];

    return inputs ;
}

 // selecting a file you choos to upload ......

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


//--------------------- creating a new party with the creatPartyBtn ------------------------------------------

const creatPartyBtn = document.querySelector('#party_form');

creatPartyBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    var user = auth.currentUser;

    if(checkInput() == true ){

        var values = getInputsValues();

        const task = firebase.storage().ref('posters/' + user.uid + '/'+ file_name).put(file);
        task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
        posterURL = url;
        
        //calling the function to push data to our database
        uploead_to_allParty(user, values[0], values[1], values[2], values[3], values[4]);

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
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            link: posterURL,
            userId: user.uid
            }

    }).then(() =>{ 

        like_p(user)

    }).catch(function(error) {
        console.error("Error adding document: ", error);
        return false;
    });
    
} 

// function to create users like  and upload to firebase user collection

function like_p(user){

    database.collection('Likes').doc(user.uid).set({

        listOfLikedUsers: [],
        defualt_rating: 20,
        post_uid: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0

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



 // function to get all the post IDs we ahve liked and set the like to a heart like   

function query_for_user_likes(){
    var user = auth.currentUser;
    database.collection("Likes").where("listOfLikedUsers", "array-contains", user.uid).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            
            if(checkScreenSize() == true){
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


/* ----------------- updating and edithing to the dom  ---------------------------------*/   

const Edith_party = document.querySelector('#Edith_party');

Edith_party.addEventListener("click", (e) => {
e.preventDefault();  

    const EdithPartyBtn = document.querySelector('#edith'); 

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
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            gateFee: gateFee_update,
                            link: posterURL
                        }

                    })     
            
                }).then(() =>{ 
                    database.collection('Likes').doc(user.uid).update({

                        listOfLikedUsers: [],
                        defualt_rating: 20,
                        post_uid: user.uid,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        likes: 0
                
                    }).catch(function(error) {
                        console.error("Error adding document: ", error);

                    });
                }).catch(error => {
                    alert(error.message);
                });
                refresh(user);
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
            database.collection("allParty").doc(user.uid).delete()
            .then(function() {
                database.collection("Likes").doc(user.uid).delete();
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


// warning to check if u really want to delect a document 
function warning(){
    var reply = confirm('are you sure you want to perform this action');
    return reply ;
}

