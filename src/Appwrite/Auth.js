import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite"


export class AuthService{

    Client = new Client()
    Account;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.Account = new Account(this.Client)
    }

    async createAccount({email,password,name}) {
        try {
            const response = await this.Account.create(ID.unique(), email, password, name)
            if(response)
            await this.login({email,password});
            else return response;
        }catch (error) {
            throw error;
        }
    }

    loginWithGoogle() {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const successUrl = import.meta.env.VITE_APPWRITE_OAUTH_SUCCESS_URL || `${origin}/`;
    const failureUrl = import.meta.env.VITE_APPWRITE_OAUTH_FAILURE_URL || `${origin}/login`;

    return this.Account.createOAuth2Session(
      "google",
      successUrl,
      failureUrl
    );
  }

        async login({email,password}) {

            try{
                return await this.Account.createEmailPasswordSession(email,password);
            }catch (error){
                throw error;
            }
    }

    async getUser(){
        try {
            return await this.Account.get();
        }catch (error) {
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            await this.Account.deleteSession("current");
        }catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService()
export default authService;
