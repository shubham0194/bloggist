import React, { useEffect, useState } from 'react'
import dataService from '../Appwrite/Data'
import { Container } from '../components/index'
import Logo from '../assets/logo.png'
import { useSelector } from 'react-redux'
import PostCard from '../components/PostCard'

function Home() {

    const username = useSelector((state) => state.auth.userData?.name);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await dataService.getPosts();
                if (data?.documents) {
                    setPosts(data.documents.reverse());
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            <Container>
                <div className="py-12">
                    <div className="flex items-center gap-3 group">
                        
                        <img 
                            src={Logo} 
                            alt="logo" 
                            className="w-11 h-11 transition duration-300 ease-out group-hover:scale-110 group-hover:rotate-6"
                        />

                        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight transition-all duration-300 group-hover:tracking-wide">
                            Bloggist
                        </h1>

                    </div>
                    <p className="mt-3 text-gray-500 text-sm md:text-base max-w-md leading-relaxed transition-opacity duration-500 hover:opacity-80">
                        A space to share ideas, explore stories, and build your digital voice.
                    </p>
                    {username && (
                        <div className="mt-6 inline-block px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-300">
                            <p className="text-sm text-gray-600">
                                👋 Welcome back,{" "}
                                <span className="font-medium text-gray-900">{username}</span>
                            </p>
                        </div>
                    )}
            
                </div>
               <div className="py-12 flex justify-center">
                    <div className="px-10 py-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
                             <h1 className="text-3xl font-bold text-gray-800"> 🔥 Discover Our Latest Blogsss 🔥</h1>
                    </div>
                </div>

                {/* 🔥 POSTS */}
                <div className="flex justify-center">

                    <div className="w-full max-w-5xl">

                        {posts.length === 0 ? (
                            <p className="text-center text-gray-400 mt-10 animate-pulse">
                                No posts yet. Start exploring 🚀
                            </p>
                        ) : (
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                {posts.map((post) => (
                                    <div
                                        key={post.$id}
                                        className="transform transition duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                                    >
                                        <PostCard
                                            $id={post.$id}
                                            title={post.title}
                                            featuredImage={post.featuredImage}
                                            status={post.status}
                                            authorName={post.authorName}
                                            userId={post.userId}
                                        />
                                    </div>
                                ))}

                            </div>
                        )}

                    </div>

                </div>

            </Container>

        </div>
    )
}

export default Home
