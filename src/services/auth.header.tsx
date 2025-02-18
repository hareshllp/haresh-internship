import { getCookie, setCookie, removeCookie } from 'typescript-cookie';



function authToken() {
  const token = getCookie("authToken");
  if (token !== null) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return { Authorization: '' };
  }
}

function isLoggedIn():boolean {
  return getCookie("loggedInUid") === undefined ? false : true;
}

export {
  authToken,
  isLoggedIn
}
