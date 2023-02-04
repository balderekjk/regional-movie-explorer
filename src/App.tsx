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
        style={{
          cursor: 'pointer',
          textShadow: '0px 1px 2px forestgreen',
          color: 'darkgreen',
          paddingBottom: '2px',
        }}
        className="sticky-x"
      >
        Regional Movie Explorer
      </h2>
      <Routes>
        <Route path="/" element={<MapChart />} />
        <Route
          path=":country/:code/:language/:filter/:pgnum"
          element={<MovieViewer />}
        />
      </Routes>
    </div>
  );
}

export default App;
