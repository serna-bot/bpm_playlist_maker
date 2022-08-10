import { useEffect, useState, useNavigate } from 'react';
import Search from "./Search/";

function Header() {
    let display_name = sessionStorage.getItem('display_name');
    let profile_image = sessionStorage.getItem('profile_image');
    return (
        <div>
            <Search/>
            <p>{display_name}</p>
            <img src={profile_image}></img>
        </div>
    );
}
export default Header;