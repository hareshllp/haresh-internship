import axios from "axios";
import { getCookie, setCookie } from 'typescript-cookie';

import { authToken } from './auth.header';
import * as Constants from "../constants";

const API_URL = Constants.API_URL;

export const login = async (email: string, password: string):Promise<any> => await axios.post(
      API_URL + "admin-auth/login", 
      {email,password}).catch((error) => {
        console.log(error)
      });
  

export const forgotPassword = async (email: string) => await axios.post(
      API_URL + "auth/forgotPassword", 
      {email}
      );

export const resetPassword = async (token: string | null, new_password: string, confirm_password: string) => await axios.post(
    API_URL + "auth/resetPassword", 
    {resetPasswordToken: token,newPassword: new_password,confirmPassword: confirm_password});

export const logout = async():Promise<{message:string}> => await axios.post(API_URL + "admin-auth/logout", {}, { headers: authToken() });

export const register = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string,
    dob: string,
    code: string,
    phone: string
  ) => await axios.post(
      API_URL + "customer/signup", {
      firstName: first_name,
      lastName: last_name,
      email,
      password,
      confirmPassword: confirm_password,
      dateOfBirth: dob,
      code,
      phone: phone
    });

