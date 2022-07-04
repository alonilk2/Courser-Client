import cookie from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { signout } from "../../Actions/authActions";
import "../../css/Profile.css";
import avatar from "../../images/avatar.png";

function ProfileNavComp(props) {
  const userInstance = cookie.get("userInstance");
  const dispatch = useDispatch();
  if (userInstance) {
    const user = JSON.parse(userInstance);

    return (
      <div className="newDiv">
        <img className="avatar" src={avatar} alt="profile picture"></img>
        <Dropdown className="user-instance">
          <Dropdown.Toggle id="dropdown-basic">
            Hello {user.first_name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
            <Dropdown.Item
              href="/"
              onClick={() => {
                dispatch(signout());
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  } else {
    return (
      <form className="form-inline my-2 my-lg-0">
        <a
          href="/Signin"
          className="btn btn-primary btn-lg active"
          role="button"
          aria-pressed="true"
        >
          Sign In
        </a>
        <a
          href="/Signup"
          className="btn btn-secondary btn-lg active"
          role="button"
          aria-pressed="true"
        >
          Sign Up
        </a>
      </form>
    );
  }
}
export default ProfileNavComp;
