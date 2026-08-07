import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dataService from '../Appwrite/Data'

function PostCard({ $id, title, featuredImage, status, slug, authorName, userId }) {
  const [imgUrl, setImgUrl] = useState(null);
  const currentUser = useSelector((state) => state.auth.userData);
  const uploaderName = authorName || (currentUser?.$id === userId ? currentUser.name : 'Bloggist member');

  useEffect(() => {
    if (!featuredImage) return;

    dataService.getPreview(featuredImage)
      .then((url) => {
        setImgUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching preview:", error);
        setImgUrl(null);
      });
  }, [featuredImage]);

  const isActive = status === "active";
  const isSlug = slug === "true"

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-80 bg-slate-100 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transitiontransition-all duration-300 overflow-hidden relative">

        <div className="px-4 pt-3 pb-2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {uploaderName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium text-gray-700 truncate">
              Posted by {uploaderName}
            </span>
        </div>

        { isSlug &&
        <span className={`absolute top-3 right-3 px-1 py-1 text-xs font-semibold rounded-full 
          ${isActive  ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
        }
      

        {/* 🖼 Image */}
        <div className="h-48 w-full overflow-hidden">
          <img
            src={imgUrl || "https://via.placeholder.com/300"}
            alt={title}
            className="w-full h-full object-cover hover:scale-105  hover:p-1 transition-transform duration-300 p-2 rounded-2xl"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
            {title}
          </h2>
        </div>

      </div>
    </Link>
  )
}

export default PostCard
