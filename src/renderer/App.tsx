import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/imgs/mouseImg.png';
import './App.css';

const { ipcRenderer } = window.electron;

console.log(window);

const Main = () => {
  function autoClick() {
    console.log('autoClick!!!!');
    ipcRenderer.sendMessage('mouse-click', { name: 'name', key: 'key' });
  }
  return (
    <div>
      <div className="main">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1 style={{ textAlign: 'center' }}>Auto Mouse Click</h1>
      x축 : <input />
      y축 : <input />
      x / millisecond <input />
      <div className="main">
        <button type="button" onClick={autoClick}>
          Click
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
