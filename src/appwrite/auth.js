import conf from "../conf/conf";
import { Client, Account, OAuthProvider } from "appwrite";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async loginWithGoogle() {
    try {
      await this.account.createOAuth2Session(
        OAuthProvider.Google,
        conf.redirectUrl,
         `${conf.redirectUrl}?failure=true`
        
      );
    } catch (error) {
      if (error.code === 409) {
        console.error("User already exists. Attempting to login...");
      } else {
        console.error("Login with Google Failed: " + error.message);
      }
    }
  }
  

  async logoutUser() {
    try {
      await this.account.deleteSession('current');
    } catch (error) {
      console.error("Failed to logout: " + error);
    }
  }

  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Failed to get user data: " + error);
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;
