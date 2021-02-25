//document.addEventListener('DOMContentLoaded', getPostId);

function update_like(data){
    
   database.collection('Likes').doc(data)
    .onSnapshot(function(doc) {
        post = document.getElementById(doc.id);
        if(checkScreenSize() == true){
            post.innerHTML = '<i class="fa fa-heart">' + ' ' +  doc.data().listOfLikedUsers.length + " </i>";
        }else{
            post.innerHTML = '<i class="fa fa-heart fa-2x">' + ' ' +  doc.data().listOfLikedUsers.length + " </i>";
        }
    });
}

function update_unlike(data){
    database.collection('Likes').doc(data)
     .onSnapshot(function(doc) {
        post = document.getElementById(doc.id);
        if(checkScreenSize() == true){
            post.innerHTML = '<i class="fa fa-heart-o">' + ' ' +  doc.data().listOfLikedUsers.length + " </i>";
        }else{
            post.innerHTML = '<i class="fa fa-heart-o fa-2x">' + ' ' +  doc.data().listOfLikedUsers.length + " </i>";
        }
     });
 }


function getPostId(postID){  

   var user = auth.currentUser;

   var postRefDoc = database.collection("Likes").doc(postID);

    postRefDoc.get().then(function (doc) {

        if(doc.exists){
            if(postID == doc.data().post_uid){

                if(check_array2(doc, user.uid) === true){ 

                        postRefDoc.update({
                            likes : firebase.firestore.FieldValue.increment(-1),
                            listOfLikedUsers: firebase.firestore.FieldValue.arrayRemove(user.uid)    
                        })
                        //console.log("unlike") ;
                        update_unlike(postID)
                }else{
                        postRefDoc.update({
                            likes: firebase.firestore.FieldValue.increment(1),
                            listOfLikedUsers: firebase.firestore.FieldValue.arrayUnion(user.uid)      
                        })
                      //  console.log("like") ;
                        update_like(postID)
                    }
            }
        }
    })    
}

function check_array2(doc, userID){
    var array = doc.data().listOfLikedUsers;
        if(array.includes(userID)){
            return true
        }  
    return false
}


