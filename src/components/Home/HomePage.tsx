// import { Link } from "react-router-dom";
import videoHome from "../../assets/video-home.mp4";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHome} type="video/mp4" />
      </video>
    </div>
  );
};

export default HomePage;
