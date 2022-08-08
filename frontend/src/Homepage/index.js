import { useEffect, useState, useNavigate } from 'react';
import Cookies from 'universal-cookie';
import {getUser} from './user.js';
import './Homepage.scss';

function Homepage() {
    useEffect(() => {
        handleToken();
    }, []);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleToken = async () => {
        const query = new URLSearchParams(window.location.search);
        const expires = new Date();
        expires.setSeconds(expires.getSeconds + 360);
        const access_token = query.get('access_token');
        const refresh_token = query.get('refresh_token');
        const cookie = new Cookies();
        cookie.set('access_token', access_token, { path: '/' , expires : expires, maxAge : 360});
        cookie.set('refresh_token', refresh_token, { path: '/refreshToken' , expires : expires, maxAge : 360});
        if (refresh_token !== null && access_token !== null) {
            setIsLoggedIn(true);
            const userInfo = await getUser();
            console.log(userInfo);
            
        }
    };

    const Route = () => {
        setTimeout(() => {
          //window.location.href = `http://localhost:3000/dashboard`;
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