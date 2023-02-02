import './App.css';
import MapChart from './MapChart';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieViewer from './MovieViewer';

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <h2
        onClick={() => navigate('/')}
        style={{ width: '100vw', cursor: 'pointer' }}
      >
        Regional Movie Explorer
      </h2>
      <Routes>
        <Route path="/" element={<MapChart />} />
        <Route path=":country/:code/:language" element={<MovieViewer />} />
      </Routes>
    </div>
  );
}

export default App;
