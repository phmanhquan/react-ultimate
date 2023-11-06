import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserState } from "../../redux/reducer/userReducer";
import { NavDropdown } from "react-bootstrap";
import { logout } from "../../services/auth-service";
import { toast } from "react-toastify";

const Header = () => {
  const userState = useSelector<{ user: UserState }, UserState>(
    (state) => state?.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogOut = async () => {
    const res = await logout(userState?.account);

    if (res.EC === 0) {
      toast.success(res.EM);
      dispatch({ type: "LOGOUT_SUCCESS", payload: res });
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          React-Ultimate
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {!userState?.isAuthenticated ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  Log in
                </button>
                <button className="btn-signup" onClick={() => handleRegister()}>
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogOut()}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
