import { FormEvent, useEffect, useState } from 'react';
import icon from '../../../assets/imgs/mouse-click-white.png';
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
    if (name === 'rms' && number < 100) number = 1;
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

    ipcRenderer.on('mouse-click', function (...args) {
      const isClick = args[0];
      if (!isClick) {
        setIsStart(false);
      }
    });
  }, []);

  return (
    <div>
      <div className="main">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1 className="main__title">Auto Mouse Click</h1>
      <section>
        <article className="main__contents">
          <div>
            <span>x축 클릭 위치</span>
            <input name="x" onChange={onChange} value={x} />
          </div>
          <div>
            <span>y축 클릭 위치</span>
            <input name="y" onChange={onChange} value={y} />
          </div>
          <div>
            <span>반복 시간(ms)</span>
            <input name="rms" onChange={onChange} value={rms} />
          </div>
        </article>
        <div className="text-center">shift + esc 키를 누르면 꺼집니다.</div>
      </section>
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
