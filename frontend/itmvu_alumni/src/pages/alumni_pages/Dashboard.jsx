import { useState, useEffect } from "react";
import Navbar_alumni from "../../componenets/Navbar_alumni";
import axios from "axios";

const Dashboard = () => {
  const [allposts, setallposts] = useState([]);

  const fetchposts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/post/allposts`,
        { withCredentials: true }
      );
      setallposts(res.data.posts);
    } catch (error) {
      // handle error if needed
      console.log("error fetching posts", error);
    }
  };

  const handlelike = async (postid) =>{
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/post/likepost/${postid}`,{},{withCredentials:true})
       console.log("post liked",res.data);
       fetchposts()
      
    } catch (error) {
      console.log(postid);
       console.log("error when we click on like",error);
    }
   

  }

  useEffect(() => {
    fetchposts();
  }, []);

  return (
    <>
      <Navbar_alumni />
      <div className="py-28">
        <h1 className="text-pink-600 flex justify-center mt-5 text-3xl font-semibold">
          Welcome Back Bhavesh Mulchandani
        </h1>

        <div className="flex mt-10 ml-10 mr-10 gap-5">
          {/* post section */}
          <div className="w-[65%] p-5 overflow-y-auto bg-red-100 flex flex-col rounded-md">
            {allposts.map((post) => (
              <div key={post._id} className="p-5 rounded-md bg-white shadow-md mb-5">
                <div className="flex items-center gap-5">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwyTExJYk10UkEwY3x8ZW58MHx8fHx8"
                      alt="profile picture"
                      className=" w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="font-bold text-xl">Bhavesh M</h1>
                    <h5 className="font-light text-sm">
                      Software Enginner-Amazone
                    </h5>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-base leading-relaxed text-justify tracking-tighter">
                   {post.caption}
                  </p>
                  {post.image ?<img
                    src={post.image}
                    alt="post image"
                    className="rounded-md mt-5 w-full"
                  /> : null}
                    
                </div>

                <div>
                  <ul className="flex justify-around mt-5">
                    <li className="flex flex-col items-center cursor-pointer" onClick={()=>handlelike(post._id)}>
                      <i className="ri-thumb-up-line text-lg "></i>
                      <h1>{post.likes.length}</h1>
                    </li>
                    <li className="flex flex-col items-center cursor-pointer">
                      <i className="ri-send-plane-fill text-lg"></i>
                      <h1>Share</h1>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* //chat section */}
          <div className="w-[35%] p-5 border-l overflow-y-auto bg-gray-100 rounded-md">
            <div>
              <h1 className="font-bold text-2xl p-3">Messages</h1>
              <div className="relative mt-3 w-full">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full p-2 pr-10 rounded-md outline-none font-medium"
                />
                <i className="ri-search-2-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between mt-5 p-5 hover:bg-gray-300 rounded-md">
                  <div className="flex">
                    <img
                      className="rounded-full w-16 h-16 object-cover"
                      src="https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
                      alt="profile pic"
                    />
                    <div className="flex flex-col ml-2">
                      <h1 className="font-medium">Bhavesh Mulchandani</h1>
                      <h3 className="font-extralight">last message</h3>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <h3>11:42</h3>
                    <h2 className="flex justify-center items-center rounded-full w-6 h-6 bg-pink-600 text-white font-light mt-1">
                      5
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
