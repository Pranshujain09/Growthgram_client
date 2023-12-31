import React,{useState,useEffect} from "react";
import "../styles/Profile.css";
import PostDetail from "./PostDetail";
export default function Profile() {
  const [pic, setpic] = useState([])
  const [show, setshow] = useState(false);
  const [post, setpost] = useState([]);

   // to show and hide comments
   const toggleDetails = (posts) =>{
    if(show){
      setshow(false);
    }
    else{
      console.log(posts);
      setpost(posts);
       setshow(true);
    }
  }


  useEffect(() => {
    fetch("https://growthgram-server.onrender.com/myposts",{
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("cookie"),
      }
    })
    .then(res=>res.json()).then((result)=>{setpic(result) ;console.log(pic)});
  }, [])
  
  return (
    <div className="Profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            src="https://i.pinimg.com/564x/e2/66/bd/e266bdc56fc428d73299d1dc6b163d33.jpg"
            alt=""
          />
        </div>
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info">
            <h3>4 Posts</h3>
            <h3>4 Followers</h3>
            <h3>4 Folowing</h3>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "auto", border:"1px solid #D5FF40",opacity: "0.8", margin:"25px auto"}} />
      {/* gallery */}
      <div className="gallery">
        {pic.map((pic)=>{
          return <img key={pic._id} src={pic.photo} className="items" onClick={()=>{
            toggleDetails(pic);           
          }}></img>
        })}
      </div>
      {show && 
      <PostDetail item={post} toggleDetails={toggleDetails}></PostDetail>
      }
      
    </div>
  );
}
