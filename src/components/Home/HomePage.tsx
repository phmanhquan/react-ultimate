// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import videoHome from "../../assets/video-home.mp4";
import { UserState } from "../../redux/reducer/userReducer";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

const HomePage = () => {
  const userState = useSelector<{ user: UserState }, UserState>(
    (state) => state?.user
  );

  const isAuthenticated = userState?.isAuthenticated;
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHome} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">{t("homePage.title1")}</div>
        <div className="title-2">
          <Trans i18nKey="homePage.title2" components={{ 1: <br /> }} />
        </div>
        <div className="title-3">
          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              {t("homePage.title3a")}
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("homePage.title3b")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
