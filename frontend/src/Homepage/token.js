import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getToken = () => {
  const access_token =  cookies.get('access_token');
  const refresh_token =  cookies.get('refresh_token');
  console.log("gettoken:", access_token);
  return access_token;
    //if (tokenExpired()) {
      //console.log(access_token);
      //const token = await gettingTokenFromServer(refreshToken);
      //return token.accessToken;
    //} else {
      //console.log('token not expired');
    //}
};
  
const newExpirationDate = () => {
  var expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  return expiration;
};

const tokenExpired = () => {
  const now = Date.now();
  const expirationDate = cookies.filter(item => item.indexOf('expire'));
  const expDate = new Date(expirationDate);

  if (now > expDate.getTime()) {
    return true;
  }
  return false;
};
const refreshToken = async (refresh_token) => {
  try {
    const request = await fetch('login/refreshToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
        }),
      });
      const token = await request.json();
      return token;
    } catch (error) {
      throw new Error("Can't get new token", error.message);
    }
};
  