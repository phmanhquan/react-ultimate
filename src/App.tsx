import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import PerfectScrollbar from "react-perfect-scrollbar";
// import MyComponent from "./components/MyComponent";

function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header></Header>
      </div>
      <div className="main-container">
        <div className="sidebar-container"></div>
        <div className="app-content">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>

      {/* <MyComponent></MyComponent> */}
    </div>
  );
}

export default App;
