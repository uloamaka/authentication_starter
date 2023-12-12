import "./App.css";
import { Route } from "react-router-dom";
import homePage from "./Pages/homePage";
import forgetPassPage from "./Pages/forgetPassPage";
import resetPassPage from "./Pages/resetPassPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={homePage} exact></Route>
      <Route path="/forget_Password" component={forgetPassPage}></Route>
      <Route
        path="/api/v1/auth/reset-password/:userId/:resetToken"
        component={resetPassPage}
      ></Route>
    </div>
  );
}

export default App;
