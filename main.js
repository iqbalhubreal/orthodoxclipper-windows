const { app, BrowserWindow, shell } = require("electron");
const path = require("path");

const APP_URL = "https://orthodoxclipper.pages.dev";

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 480,
    minHeight: 640,
    title: "Orthodox Clipper",
    backgroundColor: "#101116",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL(APP_URL);

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, url) => {
    try {
      const host = new URL(url).hostname;
      if (host === "orthodoxclipper.pages.dev" || host.endsWith(".orthodoxclipper.pages.dev")) return;
    } catch {}
    event.preventDefault();
    shell.openExternal(url);
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
