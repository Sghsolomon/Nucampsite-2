import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

import CampsitesList from "./features/campsites/CampsitesList.js";

function App() {
  return (
    <div className="App">
      <Header />
      <CampsitesList></CampsitesList>
      <Footer />
    </div>
  );
}

export default App;
