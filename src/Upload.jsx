import { useState } from 'react';
import { storage, db } from './firebase.js'
import firebase from 'firebase'
import  './index.css'

function Upload({ username }) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progess, setProgess] = useState(0);
    const handlechanges = (e) => {
        if (e.target.files[0]) {
        
            setImage(e.target.files[0])
        }
        console.log(image)
    }
    const uploadimages = () => {
        const uploadTask = storage.ref(`public/${image.name}`).put(image)
        uploadTask.on("state-changed",
            (snapshot) => {
                const progess = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgess(progess)
            },
            (error) => {
                alert(error.message)

            },
            () => {
                storage
                    .ref("public")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            image: url,
                            username: username
                        })
                        setProgess(0)
                        setImage(null)
                        setCaption('')
                       
                    })
            })

    }
    return (
        
            <div className="Upload">
                <progress value={progess} max="100" style={{width:"100%"}}/>
                <input type="text" placeholder="enter your caption..." onChange={(e) => { setCaption(e.target.value) }} ></input>
                <input type="file" onChange={handlechanges} />
                <button onClick={uploadimages}>uploadimage</button>
            
       </div>
    )
}
export default Upload