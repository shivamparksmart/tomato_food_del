import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { Profiler, useState } from "react";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

function onRenderCallback(
  id, // The "id" prop of the Profiler tree that just rendered
  phase, // Either "mount" or "update"
  actualDuration, // Time spent rendering the Profiler subtree
  baseDuration, // Estimated time to render the subtree without memoization
  startTime, // When React started rendering this update
  commitTime, // When React committed this update
  interactions // Set of interactions belonging to this update
) {
  console.log(`Profiler [${id}]`);
  console.log(`Phase: ${phase}`);
  console.log(`Actual Duration: ${actualDuration}ms`);
}

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <ToastContainer />
        <Profiler id="RoutesProfiler" onRender={onRenderCallback}>
          <Helmet>
            <title>Tomato.</title>
            <meta
              name="description"
              content="Discover the best cuisines, foods, and dining experiences in India with Tomato."
            />
          </Helmet>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </Profiler>
      </div>
      <Footer />
    </>
  );
};

export default App;
