import "./App.css";
import { Route } from "react-router-dom";
import homePage from "./Pages/homePage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={homePage} exact></Route>
    </div>
  );
}

export default App;
