import { Navigate } from "react-router-dom";
import { publicRequest } from "../requestMethod";

import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
  updateStart,
  updateSuccess,
  updateFailure,
} from "./features/userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      "http://localhost:5000/api/auth/login",
      user
    );

    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post(
      "http://localhost:5000/api/auth/register",
      user
    );
    // console.log("hjhsvvjbz", res);
    dispatch(registerSuccess(res.data));
    Navigate("/");
  } catch (error) {
    dispatch(registerFailure());
  }
};

export const update = async (dispatch, user) => {
  dispatch(updateStart());
  try {
    const res = await publicRequest.put(
      `http://localhost:5000/api/users/${user.id}`,
      user
    );
    dispatch(updateSuccess(res.data));
  } catch (error) {
    dispatch(updateFailure());
  }
};
