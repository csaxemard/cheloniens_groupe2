import { app, BrowserWindow } from "electron";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
    const win = new BrowserWindow({
        show: false
    })
    win.maximize();
    win.show();

    if (!app.isPackaged) {   // isPackaged is true if app was launched using the exe file
        win.loadURL('http://localhost:5173');   // npm run dev launches this to use hot reload from vite
    } else {
        win.loadFile(join(__dirname, "../front/dist/index.html"));
    }
}

app.whenReady().then(() => {
    createWindow()
})