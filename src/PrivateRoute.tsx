import userApi from 'api/userApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectIsLoggedIn } from 'features/auth/authSlice';
import React, { useEffect } from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

export default function PrivateRoute(props: RouteProps) {
  const isLoggedInState = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const res = await userApi
        .getUserDetail(localStorage.getItem('token') || '')
        .catch((error) => {
          console.log(error.response.data);
          dispatch(authActions.setIsLoggedIn(true));
        });
      if (res) {
        dispatch(authActions.setIsLoggedIn(true));
      }
    })();
  }, []);

  return isLoggedInState ? <Outlet /> : <Navigate to="/login" />;
}
