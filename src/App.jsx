import "./App.css";
import Navbar from "./layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </>
  );
}

export default App;
