import React from 'react'
import { Container , postCard } from '../components/index'
import dataService from '../Appwrite/Data';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";


function AllPost() {
    const userId = useSelector((state) => state.auth.userData?.$id);
    const [posts,setPosts] = React.useState([]);
    const dispatch=useDispatch();
    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("Fetching posts...");
                const data = await dataService.getUserPost(userId);
                console.log("Fetched posts data:", data);
                if (data && data.documents) {
                    setPosts(data.documents.reverse());
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);
    if(posts.length > 0) {
        return (
            <div>
                <Container>
                    <div className='flex flex-wrap gap-4'>
                        {posts.map((post) => (
                            <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} status={post.status} slug="true" authorName={post.authorName} userId={post.userId}/>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='py-8'>
            <Container>
                
                <h1 className='text-3xl font-bold text-center text-gray-700'>No posts available</h1>
            </Container>
        </div>
    );
}

export default AllPost
