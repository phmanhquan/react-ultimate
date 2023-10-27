// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import videoHome from "../../assets/video-home.mp4";
import { UserState } from "../../redux/reducer/userReducer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const userState = useSelector<{ user: UserState }, UserState>(
    (state) => state?.user
  );

  const isAuthenticated = userState?.isAuthenticated;
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHome} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">There's a better way to ask</div>
        <div className="title-2">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead-and make everyone happy.
        </div>
        <div className="title-3">
          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              Doing Quiz Now
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Get's started. It's free
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
