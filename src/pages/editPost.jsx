import React, { use } from 'react'
import { useEffect,useState } from 'react'
import  { Container, Postform } from '../components/index'
import dataService from '../Appwrite/Data';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function EditPost() {
        const [post, setPost] = useState(null);
        const {slug} = useParams();
        const navigate = useNavigate();

        useEffect(() => {
            if (slug) {
                dataService.getPost(slug)
                    .then((data) => {
                        setPost(data);
                        console.log("Fetched post:", data);
                    })
                    .catch((error) => {
                        console.error("Error fetching post:", error);
                    });
            }else {
                navigate("/");
            }
        }, [slug, navigate]);

  return post ? (
    <div className='py-8'>
        <Container>
            <Postform form={post} />
        </Container>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default EditPost