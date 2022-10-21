import { FormEvent, useEffect, useState } from 'react';
import icon from '../../../assets/imgs/mouseImg.png';
import '../App.css';

const { ipcRenderer, store } = window.electron;

const clickValue = store.get('autoClickValue');

const Main = () => {
  const [inputs, setInputs] = useState({ x: 0, y: 0, rms: 1000 });
  const [isStart, setIsStart] = useState(false);

  const { x, y, rms } = inputs;
  //

  const onChange = (e: FormEvent & { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    let number = parseInt(value, 10);
    if (Number.isNaN(number)) {
      number = 0;
    }
    if (name === 'rms' && number < 100) number = 100;
    setInputs({
      ...inputs,
      [name]: number,
    });
  };

  const autoClick = () => {
    store.set('autoClickValue', { ...inputs });
    const toggleIsStart = !isStart;
    setIsStart(toggleIsStart);
    if (toggleIsStart) {
      ipcRenderer.sendMessage('mouse-click', { ...inputs });
    } else {
      ipcRenderer.sendMessage('mouse-click-stop', '');
    }
  };

  useEffect(() => {
    if (clickValue) setInputs({ ...clickValue });
  }, []);

  return (
    <div>
      <div className="main">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1 style={{ textAlign: 'center' }}>Auto Mouse Click</h1>
      x축 : <input name="x" onChange={onChange} value={x} />
      y축 : <input name="y" onChange={onChange} value={y} />x / millisecond{' '}
      <input name="rms" onChange={onChange} value={rms} />
      shift + esc 키를 누르면 꺼집니다.
      <div className="main">
        <button
          type="button"
          onClick={autoClick}
          style={{ backgroundColor: isStart ? 'red' : 'white' }}
        >
          {isStart ? 'stop' : 'start'}
        </button>
      </div>
    </div>
  );
};

export default Main;
