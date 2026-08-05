import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dataService from "../Appwrite/Data";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);

    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (!slug) return navigate("/All-posts");

        const fetchPost = async () => {
            try {
                const postData = await dataService.getPost(slug);
                if (!postData) return navigate("/All-posts");

                setPost(postData);

                if (postData.featuredImage) {
                    const url = await dataService.getPreview(postData.featuredImage);
                    setImgUrl(url + "&mode=admin");
                }

            } catch (error) {
                console.error(error);
                navigate("/All-posts");
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const deletePost = async () => {
        const status = await dataService.deletePost(post.$id);
        if (status) {
            await dataService.deleteFile(post.featuredImage);
            navigate("/All-posts");
        }
    };

    if (!post) {
        return (
            <div className="h-60 flex items-center justify-center text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">

            <Container>

                <div className="flex flex-col md:flex-row gap-10 py-10">

                    {/* 🔥 LEFT IMAGE (STICKY) */}
                    {imgUrl && (
                        <div className="md:w-1/2">
                            <div className="sticky top-24 rounded-2xl overflow-hidden shadow-sm border">
                                <img
                                    src={imgUrl}
                                    alt={post.title}
                                    className="w-full h-400px object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* 🔥 RIGHT CONTENT */}
                    <div className="md:w-1/2 relative">

                        {/* TITLE */}
                        <h1 className="text-4xl font-semibold text-gray-900 leading-tight">
                            {post.title}
                        </h1>

                        {/* ACTIONS */}
                        {isAuthor && (
                            <div className="flex gap-3 mt-4">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg">
                                        Edit
                                    </Button>
                                </Link>

                                <Button
                                    onClick={deletePost}
                                    className="px-3 py-1.5 text-sm bg-red-100 text-red-600 hover:bg-red-200 rounded-lg"
                                >
                                    Delete
                                </Button>
                            </div>
                        )}

                        {/* CONTENT */}
                        <div className="mt-8 text-gray-700 leading-relaxed space-y-4">
                            {parse(post.content)}
                        </div>

                    </div>

                </div>

            </Container>

        </div>
    );
}