import { useEffect, useState } from "react";
import axios from "axios";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // ✅ get current user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/me`,
        { withCredentials: true }
      );

      setCurrentUserId(res.data.user._id);
    };

    fetchUser();
  }, []);

  // ✅ get posts
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/post/allposts`,
        { withCredentials: true }
      );

      setPosts(res.data.posts);
    };

    fetchPosts();
  }, []);

  // ✅ like toggle
  const handleLike = async (postId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/post/likepost/${postId}`,
        {},
        { withCredentials: true }
      );

      // 🔥 instant UI update
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">

      {posts.length === 0 && (
        <p className="text-center text-gray-500">No posts available</p>
      )}

      {posts.map((post) => {
        const isLiked = post.likes.includes(currentUserId);

        return (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold">
                {post.user?.username?.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {post.user?.username}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-700">{post.caption}</p>

            {/* IMAGE */}
            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="w-full rounded-lg"
              />
            )}

            {/* LIKE BUTTON */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLike(post._id)}
                className={`px-4 py-1 rounded-full text-sm ${
                  isLiked
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                👍 Like
              </button>

              <span className="text-sm text-gray-500">
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