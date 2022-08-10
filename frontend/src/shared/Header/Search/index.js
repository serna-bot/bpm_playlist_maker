import { useEffect, useState, useNavigate } from 'react';

function Search() {
    const [searchInput, setSearchInput] = useState(undefined);
    const onSearchChange = (title) => {
        sessionStorage.setItem("searchInput", title.target.value);
        setSearchInput(title.target.value);
      }
    return (
        <div>
          <input 
            type='text' 
            placeholder='Search' 
            value={searchInput} 
            defaultValue={sessionStorage.getItem("searchInput")}
            onChange={onSearchChange} />
        </div>
    );
}
export default Search;