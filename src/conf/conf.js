const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
    redirectUrl: String(import.meta.env.VITE_REDIRECT_URL),
}
export default conf;