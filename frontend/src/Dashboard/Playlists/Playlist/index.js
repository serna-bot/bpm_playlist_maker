import './Playlist.scss';
import * as api from '../../../api/index.js';
import { useParams, useSearchParams } from 'react-router-dom';

function Playlist() {
    //get playlist and edit
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const playlist_id = searchParams.get("playlist_id");

    const loadPlaylist = async () => {
        //const response = await api.loadPlaylist(id, {
            //headers: {
                //Playlist_ID : playlist_id
            //}
        //});
    }
    const editPlaylist = async () => {

    }
    return (
        <div></div>
    );
};
export default Playlist;