import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import {URL} from '../url';
import axios from 'axios'
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader"
import { UserContext } from "../context/UserContext";


const Home = () => {

    const[posts,setPosts] = useState([])
    const {search} = useLocation()
    const[noResults,setNoResults] = useState(false)
    const[loader,setLoader] = useState(false)
    const {user} = useContext(UserContext)

    const fetchPosts = async () => {
      setLoader(true)
      try{
        const res = await axios.get(URL+"/api/posts"+search)
        //console.log(res.data)
        setPosts(res.data)
        if(res.data.length===0){
          setNoResults(true)
        }
        else{
          setNoResults(false)
        }
        setLoader(false)
      }
      catch(err){
        console.log(err)
        setLoader(true)
      }
    }

    useEffect(()=>{
      fetchPosts()
    },[search])
    return(
      <>
      <Navbar/>
      <div className="px-8 md:px-[200px]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?posts.map((post)=>(
          <>
            <Link to={user?`/posts/post/${post._id}`:"/login"}>
            <HomePosts key={post._id} post={post}/>
            </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No Posts Available !</h3>}
      </div>
      <Footer/>
      </>
    )
  }
  
  export default Home;