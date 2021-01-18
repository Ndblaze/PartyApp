
function getPostId(postID){
   const postRef = document.getElementById(postID);
   var user = auth.currentUser;
   var postRefDoc = database.collection("allParty").doc(postID);
   postRefDoc.get().then(function (doc) {
    if(doc.exists){
        if(postID == doc.data().public.post_uid){
           // console.log(postID +'=='+doc.data().public.post_uid)
           if(check_array(doc, user.uid) == true){ 
                postRefDoc.update({
                    "public.likes": firebase.firestore.FieldValue.increment(-1),
                    listOfLikedUsers: firebase.firestore.FieldValue.arrayRemove(user.uid)
                         
                })
                console.log("unlike") 
           }else{
                postRefDoc.update({
                    "public.likes": firebase.firestore.FieldValue.increment(1),
                    listOfLikedUsers: firebase.firestore.FieldValue.arrayUnion(user.uid)      
                })
                console.log("like") 
            }
        }
    }

   })    

}


function check_array(doc, userID){
    var array = doc.data().listOfLikedUsers;
    for(var i = 0; i< array.length; i++){
        if(array[i] === userID){
            var me = userID;
            return true
        }
    }    
    return false
}
