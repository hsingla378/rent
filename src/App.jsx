import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Properties from "./components/Properties";

function App() {
  return (
    <div>
      <Header />
      <Properties />
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
