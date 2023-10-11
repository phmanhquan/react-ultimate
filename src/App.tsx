import { Link } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
// import MyComponent from "./components/MyComponent";

function App() {
  return (
    <div className="app-container">
      <Header></Header>
      <div>
        test link
        <div>
          <button>
            <Link to="/user">go user</Link>
          </button>
          <button>
            <Link to="/admin">go admin</Link>
          </button>
        </div>
      </div>
      {/* <MyComponent></MyComponent> */}
    </div>
  );
}

export default App;
