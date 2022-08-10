import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {getUser} from './user.js';
import './Homepage.scss';
import * as api from '../api/index.js';

function Homepage() {
    useEffect(() => {
        handleToken();
    }, []);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleToken = async () => {
        const query = new URLSearchParams(window.location.search);
        const expires = new Date();
        expires.setSeconds(expires.getSeconds + 360);
        localStorage.setItem('expires', expires);
        const access_token = query.get('access_token');
        const refresh_token = query.get('refresh_token');
        const cookie = new Cookies();
        cookie.set('access_token', access_token, { path: '/' , expires : expires, maxAge : 360});
        cookie.set('refresh_token', refresh_token, { path: '/refreshToken' , expires : expires, maxAge : 360});
        if (refresh_token !== null && access_token !== null) {
            const userInfo = await getUser();
            console.log("here u lil shit2: ", userInfo);
            try {
                const response = await api.fetchProfile(userInfo.email);
                console.log("here u lil shit: ", response.data);
                sessionStorage.setItem('id', response.data.id);
                sessionStorage.setItem('display_name', response.data.display_name);
                sessionStorage.setItem('profile_image', response.data.profile_image);
            }
            catch (ex) {
                if (ex && ex !== undefined && ex.toString && ex.toString !== undefined) {
                    console.log(ex.toString());
                }
                if (
                    ex.response &&
                    ex.response !== undefined &&
                    ex.response.data &&
                    ex.response.data !== undefined
                  ) {
                    // print the exception message from axios response
                    console.log(ex.response.data);
                  }
            }
            setIsLoggedIn(true);
            try {
                const response = await api.registerUser(userInfo);
            }
            catch {
                console.log("user exists");
            }
        }
    };

    const Route = () => {
        setTimeout(() => {
            window.location.href = `http://localhost:3000/dashboard/${sessionStorage.getItem('id')}`;
        }, 500);
    
        return <div></div>;
      };
    
    return (
        <div> 
            {!isLoggedIn ? (<a href = 'http://localhost:4000/login'>
                Login
            </a>) 
            : (<Route/>)}
        </div>
    );
}

export default Homepage;