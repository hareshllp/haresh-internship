
import axios from 'axios';
import { authToken } from './auth.header';
import { RECORDS_PER_PAGES } from '../constants';

const API_URL = "https://evenmd.cmdev.cc/";


export const getUserInfo = async () => {
  return await axios.get(API_URL + 'admin-auth/whoAmI', { headers: authToken() })
};

export const updateProfile = async (firstName: string, lastName: string, email: string, phone: string, code: string) => {
  return axios.patch(API_URL + "admin-auth/profile", {
    firstName,
    lastName,
    email,
    phone,
    code
  }, { headers: authToken() });
}

export const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
  return await axios.patch(API_URL + "admin-auth/changePassword", {
    currentPassword,
    newPassword,
    confirmPassword
  }, { headers: authToken() });
}

export const getAllSessions = (limit: number, skip: number) => axios.get(
  API_URL + 'admin-session?take=' + limit + '&skip=' + skip,
  { headers: authToken() }
);

export const deleteActiveSession = (sessionId: string) => axios.delete(
  API_URL + 'admin-session/' + sessionId + '/expire',
  { headers: authToken() }
  // { headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDQ3ZDk1Y2I3MDAwNDJkMTNiMzQwZCIsImZpcnN0TmFtZSI6IkFkbWluIDIiLCJsYXN0TmFtZSI6IlVzZXIgMiIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjcxNjIxOTQ5LCJleHAiOjE2NzE2MjkxNDl9' } }
);

export const deleteAllSessions = async () => await axios.delete(
  API_URL + 'admin-session/expire/all',
  { headers: authToken() }
  // { headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDQ3ZDk1Y2I3MDAwNDJkMTNiMzQwZCIsImZpcnN0TmFtZSI6IkFkbWluIDIiLCJsYXN0TmFtZSI6IlVzZXIgMiIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjcxNjIxOTQ5LCJleHAiOjE2NzE2MjkxNDl9' } }
);


export const getAllSessionsWithSorting = (page: number, sortBy: { field: string, direction: string }[]) => {

  const skip = (page - 1) * RECORDS_PER_PAGES;

  let sortingQueryArray: any = [];
  sortBy.forEach((sortElem) => {
    sortingQueryArray.push(`${sortElem.field}|${sortElem.direction}`);
  });
  let sortingQuery = sortingQueryArray.join('&');
  let apiUrl = `${API_URL}admin-session?`;

  if (sortingQueryArray.length === 0) {
    apiUrl += `take=${RECORDS_PER_PAGES}&skip=${skip}`;
  } else {
    apiUrl += `orderBy=${sortingQuery}&take=${RECORDS_PER_PAGES}&skip=${skip}`;
  }
  return axios.get(apiUrl,
    { headers: authToken() }
  )
}




