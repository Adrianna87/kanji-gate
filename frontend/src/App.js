import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from "./NavBar"
import NavRoutes from "./NavRoutes"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavRoutes />
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
