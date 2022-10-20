import { FormEvent, InputHTMLAttributes, useState } from 'react';
import { InputType } from 'zlib';
import icon from '../../../assets/imgs/mouseImg.png';
import '../App.css';

const { ipcRenderer } = window.electron;

const Main = () => {
  const [inputs, setInputs] = useState({ x: 0, y: 0, rms: 1000 });

  const onChange = (e: FormEvent & { target: HTMLInputElement }) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: parseInt(value, 10),
    });
  };

  const autoClick = () => {
    ipcRenderer.sendMessage('mouse-click', { ...inputs });
  };
  return (
    <div>
      <div className="main">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1 style={{ textAlign: 'center' }}>Auto Mouse Click</h1>
      x축 : <input name="x" onChange={onChange} />
      y축 : <input name="y" onChange={onChange} />
      x / millisecond <input name="rms" onChange={onChange} />
      <div className="main">
        <button type="button" onClick={autoClick}>
          Click
        </button>
      </div>
    </div>
  );
};

export default Main;
