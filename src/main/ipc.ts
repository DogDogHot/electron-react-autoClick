/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { ipcMain, IpcMainEvent } from 'electron';
import Store from 'electron-store';
import { mouse, Button, Point } from '@nut-tree/nut-js';

const store = new Store();

export default class Ipc {
  clickInterval;

  constructor() {
    this.clickInterval = setTimeout(() => {}, 0);
  }

  public initIpc() {
    ipcMain.on('ipc-example', async (event, arg) => {
      const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
      console.log(msgTemplate(arg));
      event.reply('ipc-example', msgTemplate('pong'));
    });

    ipcMain.on('mouse-click', async (event, arg) => {
      const { x, y, rms } = arg;

      const point = new Point(x, y);

      this.clickInterval = setInterval(async () => {
        await mouse.setPosition(point);
        await mouse.click(Button.LEFT);
      }, rms || 1000);
    });

    ipcMain.on('mouse-click-stop', async (event, arg) => {
      clearInterval(this.clickInterval);
    });

    // IPC listener
    ipcMain.on(
      'electron-store-get',
      async (event: IpcMainEvent, key: string) => {
        event.returnValue = store.get(key);
      }
    );
    ipcMain.on(
      'electron-store-set',
      async (event: IpcMainEvent, key: string, val: string) => {
        store.set(key, val);
      }
    );
  }
}
