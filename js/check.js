


function like_plus(incriment, id){
    if(incriment = 1){

        var counter = database.collection('allParty').doc('YNsMwRnC2beMacXH53Y9Pk4Uuwx2');
        counter.update({
        likes: firebase.firestore.FieldValue.increment(1)
     
       });
    }
    
}

function like_minus(decrement, id){
    if(decrement = -1){

        var counter = database.collection('allParty').doc(id);
        counter.update({
        likes: firebase.firestore.FieldValue.increment(1)
     
        });
    }
}


const likes = (user) => {
    console.log(user.uid)
    const heart = document.getElementById(user.uid);
    heart.addEventListener('click', (e) => {
        e.preventDefault();
       var i = 0;
        if(heart.className == "fa fa-heart"){
            var counter = database.collection('allParty').doc(user.uid);
                counter.update({
                likes: firebase.firestore.FieldValue.increment(1)
     
            }).then(() =>{
                heart.className = "fa fa-heart ";
            });
        }else{
            var counter = database.collection('allParty').doc(user.uid);
                counter.update({
                likes: firebase.firestore.FieldValue.increment(-1)
     
            }).then(() =>{
                heart.className = "fa fa-heart-o ";
            });
        } 
    
    })
}    

