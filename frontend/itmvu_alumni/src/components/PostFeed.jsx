import { useEffect, useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/me`,
          { withCredentials: true }
        );

        setCurrentUserId(res.data.user._id);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  // ✅ Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/post/allposts`,
          { withCredentials: true }
        );

        setPosts(res.data.posts || []);
      } catch (err) {
        console.error("Post fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ✅ Like toggle (Optimistic UI)
  const handleLike = async (postId) => {
    try {
      setPosts((prev) =>
        prev.map((p) => {
          if (p._id !== postId) return p;

          const alreadyLiked = p.likes.includes(currentUserId);

          return {
            ...p,
            likes: alreadyLiked
              ? p.likes.filter((id) => id !== currentUserId)
              : [...p.likes, currentUserId],
          };
        })
      );

      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/post/likepost/${postId}`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  // ✅ Avatar initials
  const getInitials = (name = "") => {
    return name.slice(0, 2).toUpperCase();
  };

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="flex justify-center mt-10 text-gray-500">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      
      {posts.length === 0 && (
        <div className="text-center text-gray-500">
          No posts available
        </div>
      )}

      {posts.map((post) => {
        const isLiked = post.likes.includes(currentUserId);

        return (
          <div
            key={post._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
          >
            {/* 🔹 HEADER */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 text-white flex items-center justify-center font-semibold text-sm">
                {getInitials(post.user?.username)}
              </div>

              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {post.user?.username || "Unknown"}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* 🔹 CAPTION */}
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {post.caption}
            </p>

            {/* 🔹 IMAGE */}
            {post.image && (
              <div className="overflow-hidden rounded-xl mb-3">
                <img
                  src={post.image}
                  alt="post"
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* 🔹 ACTIONS */}
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={() => handleLike(post._id)}
                className="flex items-center gap-2 text-sm font-medium transition"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked
                      ? "fill-pink-500 text-pink-500"
                      : "text-gray-400"
                  }`}
                />

                <span
                  className={
                    isLiked ? "text-pink-500" : "text-gray-600"
                  }
                >
                  Like
                </span>
              </button>

              <span className="text-xs text-gray-400">
                {post.likes.length} likes
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostFeed;