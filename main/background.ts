import serve from "electron-serve";
import { createWindow } from "./helpers";
import electron, { app, ipcMain } from "electron";
import { registry } from "./data/user/registry";
import { login } from "./data/user/login";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("data/user/registry:client", async (event, res) => {
  event.sender.send(
    "data/user/registry:server",
    await registry(res.email, res.password, res.name, res.birth)
  );
});

ipcMain.on("data/user/login:client", async (event, res) => {
  event.sender.send(
    "data/user/login:server",
    await login(res.email, res.password)
  );
});
