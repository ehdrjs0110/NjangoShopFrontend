import Navigation from '../../components/Nav/Navigation'
import {useCookies} from "react-cookie";
import {getNewToken} from "../../services/auth2";
import {containToken} from "../../Store/tokenSlice";
import {useDispatch, useSelector} from "react-redux";

const profile = () => {
    return (
        <div>
            <Navigation/>
            <h1>프로필 페이지를 만들자</h1>
        </div>
    )
}


export default profile;