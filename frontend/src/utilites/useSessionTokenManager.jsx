import { deleteFromStorage, writeStorage } from "@rehooks/local-storage";
let token;
let userID;

const useSessionTokenManager = () => {
    const tokenKey = "token";
    const userIDKey = "userID";

    const writeToken = (newToken) => {
        token = newToken;
        writeStorage(tokenKey, newToken);
    };

    const writeUserID = (newUserID) => {
        userID = newUserID;
        writeStorage(userIDKey, newUserID);
    };

    const clearToken = () => {
        token = null;
        deleteFromStorage(tokenKey);
    };

    const clearUserID = () => {
        userID = null;
        deleteFromStorage(userIDKey);
    };

    const fetchToken = () => {
        const storedToken = localStorage.getItem(tokenKey);
        return token || storedToken;
    };

    const fetchUserID = () => {
        const storedUserID = localStorage.getItem(userIDKey);
        return userID || storedUserID;
    };

    return { writeToken, clearToken, fetchToken, 
             writeUserID, clearUserID, fetchUserID };
};

export default useSessionTokenManager;