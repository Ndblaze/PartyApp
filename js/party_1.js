

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
    
    const creatPartyBtn = document.querySelector('#creatPartyBtn');
    
    creatPartyBtn.addEventListener("click", (e) => {
        e.preventDefault();
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
    });
}



// sending to the dom

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
                       <br><br>
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


/* --------------------delecting A party -----------------------------*/

const delect_party = document.querySelector('#delect_party');

const delect = (user) => {
    delect_party.addEventListener("click", (e) => {
        e.preventDefault();
          
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



