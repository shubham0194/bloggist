import conf from "../conf/conf"
import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite"

export class DataService{

    Client = new Client();
    Databases;
    Bucket;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.Databases = new Databases(this.Client);
        this.Bucket = new Storage(this.Client);
    }

    async createPost({title,content,slug,featuredImage,status,userId}){
        try{
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                },
                // [
                //     Permission.read(Role.user(userId)),
                //     Permission.read(Role.any()),
                //     Permission.update(Role.user(userId)),
                //     Permission.delete(Role.user(userId))
                // ]
            )
        }catch (error){
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try{
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch (error){
            throw error;
        }
    }

    async deletePost(slug){
        try{
            return await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }catch (error){
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try{
            const post = await this.Databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return post;
        }catch (error){
            throw error;
        }
    }

    async getUserPost(userId){
        try {
            const post = await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId",userId)
                ]
            ); 
            console.log("ho gya")
            return post;
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    }

    async getPosts(){
        try{
            const posts = await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "Active")
                ]
            );
            console.log("Posts fetched successfully:", posts);
            return posts;
        }catch (error){
            console.error("Error fetching posts:", error);
            throw error;
        }
    }

    //File Upload and Management
    async uploadFile(file){
        try{
            const x= await this.Bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
           console.log("File uploaded successfully:", x);
            return x;

        }
        catch (error){
            throw error;
        }
    }

    async deleteFile(fileId){
        try{
            await this.Bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        }
        catch (error){
            throw error;
            return false;
        }
    }

    async getPreview(fileId){
        try{
            const x= await this.Bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
            return x;
        }
        catch (error){
            throw error;
            return null;
        }
    }
}

const dataService = new DataService()
export default dataService;