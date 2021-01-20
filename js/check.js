//document.addEventListener('DOMContentLoaded', getPostId);

function update_like(data){
    
   database.collection('allParty').doc(data)
    .onSnapshot(function(doc) {
        post = document.getElementById(doc.id);
        if(window.matchMedia("(max-width: 767px)").matches){
            post.innerHTML = '<i class="fa fa-heart">' + ' ' +  check_array(doc.data()) + " </i>";
        }else{
            post.innerHTML = '<i class="fa fa-heart fa-2x">' + ' ' +  check_array(doc.data()) + " </i>";
        }
    });
}

function update_unlike(data){
    database.collection('allParty').doc(data)
     .onSnapshot(function(doc) {
        post = document.getElementById(doc.id);
        if(window.matchMedia("(max-width: 767px)").matches){
            post.innerHTML = '<i class="fa fa-heart-o">' + ' ' +  check_array(doc.data()) + " </i>";
        }else{
            post.innerHTML = '<i class="fa fa-heart-o fa-2x">' + ' ' +  check_array(doc.data()) + " </i>";
        }
     });
 }


function getPostId(postID){  

   var user = auth.currentUser;

   var postRefDoc = database.collection("allParty").doc(postID);

    postRefDoc.get().then(function (doc) {

        if(doc.exists){
            if(postID == doc.data().public.post_uid){

                if(check_array2(doc, user.uid) === true){ 

                        postRefDoc.update({
                            "public.likes": firebase.firestore.FieldValue.increment(-1),
                            listOfLikedUsers: firebase.firestore.FieldValue.arrayRemove(user.uid)    
                        })
                        //console.log("unlike") ;
                        update_unlike(postID)
                }else{
                        postRefDoc.update({
                            "public.likes": firebase.firestore.FieldValue.increment(1),
                            listOfLikedUsers: firebase.firestore.FieldValue.arrayUnion(user.uid)      
                        })
                      //  console.log("like") ;
                        update_like(postID)
                    }
            }
        }
    })    
}


function check_array(doc){
    var array = doc.listOfLikedUsers;
    var likes = 0 ;
    for(var i = 0; i< array.length; i++){
           likes++ ;
        }  
    return likes;
}


function check_array2(doc, userID){
    var array = doc.data().listOfLikedUsers;
    for(var i = 0; i< array.length; i++){
        if(array[i] === userID){
            return true
        }
    }    
    return false
}


