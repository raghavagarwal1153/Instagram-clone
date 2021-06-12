//13062039f6f695d54c90dbb91db81f80
//https://api.themoviedb.org/3/movie/550?api_key=13062039f6f695d54c90dbb91db81f80"


import React, { useState, useEffect } from 'react';
import Demo from './Demo.jsx';
import { db,auth } from './firebase.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Upload from './Upload.jsx'



function App(){
   const [posts, setPosts] = useState([]);
   const [open, setOpen] = useState(false)
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [name, setName] = useState("")
   const [user,setUser]=useState(null)
   const [username,setUserName]=useState("")
   const [signin,setSignIn]=useState(false)
  
   
   const handleClose=()=>{
      setOpen(false)
   }
   
function getModalStyle() {
   const top = 50 
   const left = 50 
 
   return {
     top: `${top}%`,
     left: `${left}%`,
     transform: `translate(-${top}%, -${left}%)`,
   };
 }
 const [modalStyle]=useState(getModalStyle)
 const useStyles = makeStyles((theme) => ({
   paper: {
     position: 'absolute',
     width: 400,
     backgroundColor: theme.palette.background.paper,
     border: '2px solid #000',
     boxShadow: theme.shadows[5],
     padding: theme.spacing(2, 4, 3),
   }
 }));
 useEffect(() => {
   const unsubscribe= auth.onAuthStateChanged((authUser) => {
     if(authUser){
       console.log(authUser);  
       setUser(authUser);
       
     }else{
       setUser(null);
     }
   })
   return () => {
     unsubscribe();
   }
 },[user , username]);
  useEffect(() => {
   db.collection('posts').orderBy('timestamp','desc').onSnapshot((snapshot) => {
     setPosts(
       snapshot.docs.map(doc=>({
         id: doc.id,
         post : doc.data()
       })
     ));
   })
 },[]);
   
  
 const classes = useStyles();
 const signup=(event)=>{
    event.preventDefault();
    setUserName(name)
    auth.createUserWithEmailAndPassword(email,password)
    .then((authuser)=>{
       return authuser.user.updateProfile({
          displayName:username
       })
    })
    .catch((err)=>{alert(err.message)})

    setOpen(false)
   }

const signinfun=(event)=>{
   event.preventDefault();
   auth.signInWithEmailAndPassword(email,password).catch((err)=>{
      alert(err.message)
   })
setSignIn(false)
}
 
   return ( <>
   {user? (<Upload username="keshav"></Upload>):<h3>sorry to login!!</h3>}
<Modal
        open={open}
        onClose={handleClose}
      
      >
         <div style={modalStyle} className={classes.paper}>
         <form className="form">
   <h1 >Instagram</h1>
   <Input type="email" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
   <Input type="text" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}} />
   <Input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
   <Button type="submit" onClick={signup}> sign up</Button>
</form></div>

      </Modal>
      <Modal
        open={signin}
        onClose={()=>{
           setSignIn(false)
        }}
      
      >
         <div style={modalStyle} className={classes.paper}>
         <form className="form">
   <h1 >Instagram</h1>
   <Input type="email" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
   
   <Input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
   <Button type="submit" onClick={signinfun}> signin</Button>
</form></div>

      </Modal>
      <div>
      {user?(<Button onClick={()=>auth.signOut()}>Logout</Button>):(<div><Button variant="contained" color="primary" onClick={()=>{setOpen(true)}} >signup</Button>
      <Button variant="contained" color="primary" onClick={()=>{setSignIn(true)}} >signin </Button>
      </div>
      )}
      </div>

   <div>
      {posts.map(({ post, id }) => {
         return (
            <Demo key={id} username={post.username}
               image={post.image}
               caption={post.caption} />)

      })
      }
</div>
   
   
   </>
   )
}
export default App