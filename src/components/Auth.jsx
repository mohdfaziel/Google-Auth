import React, { useEffect, useState } from "react";
import { login, logout } from "../store/features/authSlice";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";

function Auth() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const status = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const checkUser = async () => {
      setLoader(true);
      try {
        const userInfo = await authService.getUser();
        if (userInfo) {
          dispatch(login(userInfo));
        }
      } catch (error) {
        console.error("Failed to fetch user. Logging out...");
        await authService.logoutUser();
        dispatch(logout());
      } finally {
        setLoader(false);
      }
    };
    checkUser();
  }, [dispatch]);

  const loginUser = async () => {
    setLoader(true);
    try {
      await authService.loginWithGoogle();
      const userInfo = await authService.getUser();
      dispatch(login(userInfo));
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoader(false);
    }
  };

  const logOutUser = async () => {
    setLoader(true);
    try {
      await authService.logoutUser();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return (
      <div className="text-xl flex justify-center items-center flex-col px-4 py-2 gap-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-xl flex justify-center items-center flex-col px-4 py-2 gap-4">
      {userData && status ? (
        <>
          <p>Welcome, {userData?.name}</p>
          <button
            className="px-6 py-2 hover:scale-105 bg-slate-500 rounded-full"
            onClick={logOutUser}
          >
            Logout
          </button>
        </>
      ) : (
          <button
            className="px-6 py-2 hover:scale-105 bg-slate-500 rounded-full"
            onClick={loginUser}
          >
            Login with Google
          </button>
      )}
    </div>
  );
}

export default Auth;


