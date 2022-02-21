import React from "react";
import "./style.css";
import {useState , useEffect} from 'react';
import liff from '@line/liff';

function App() {//LINE_UserID	pictureUrl	displayname	os	language	email	phone
  const [userId, setUserId] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [os, setOS] = useState('');
  const [lang, setLang] = useState('');
  const [email , setEmail] = useState('');


  const initLine = () => {
    liff.init({ liffId : "1655945045-oLgRxBZ0"}, () => {
      if (liff.isLoggedIn() ){
        runApp();
      }else{
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () =>{
    liff.getProfile().then(profile => {
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setUserId(profile.userId);
      setEmail(liff.getDecodedIDToken().email);
      setOS(liff.getOS());
      setLang(liff.getLanguage());
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    initLine();
  },  []);

  function postData(){
    let data = {userId , pictureUrl , displayName ,os , lang ,email}
    fetch("https://script.google.com/macros/s/AKfycbwAEfbNGlEMYAcQh7RZrQa9hzGU93ARE5mPDaQ1cZi73apbKQly/exec",{
      method: "POST",
      body: JSON.stringify(data)
    }).then(liff.closeWindow())
    //console.warn(phone , email , notes , userId);
  }

  return(
    <div className="App">
      <div class="card ">
        <div class="card-header">
          <div class="row">
            <div class="col-4"><img className="profile" src={pictureUrl} /></div>
            <div class="col-8"><p class="input-group mb-3">{displayName}</p>
            <p class="input-group mb-3">{email}</p></div>
             <div>
               <button type="button" class="btn btn-success" onClick={postData} >ส่งข้อมูล</button> 
             </div> 
          </div>
        </div>
      </div>
    </div>
  );

}

 export default App;