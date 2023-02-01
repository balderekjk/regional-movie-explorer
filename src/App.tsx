import './App.css';
import MapChart from './MapChart';
import { Routes, Route } from 'react-router-dom';
import Test from './MovieViewer';

function App() {
  return (
    <div className="App">
      <h2 style={{ width: '100vw' }}>Regional Movie Explorer</h2>
      <Routes>
        <Route path="/" element={<MapChart />} />
        <Route path=":country/:code/:language" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
