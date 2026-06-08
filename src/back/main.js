import { app, BrowserWindow } from "electron";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile(join(__dirname, "../front/dist/index.html"));
}

app.whenReady().then(() => {
    createWindow()
})