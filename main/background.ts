import serve from "electron-serve";
import { createWindow } from "./helpers";
import electron, { app, ipcMain } from "electron";
import tryLogin from "./data/user/login";
import tryRegistry from "./data/user/registry";
import getUserList from "./data/user/userList";

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

ipcMain.on("data/user/registry", async (event, res) => {
  event.sender.send(
    "data/user/registry",
    await tryRegistry(res.email, res.password, res.name, res.birth)
  );
});

ipcMain.on("data/user/login", async (event, res) => {
  event.sender.send("data/user/login", await tryLogin(res.email, res.password));
});

ipcMain.on("data/user/list", async (event, res) => {
  event.sender.send("data/user/list", await getUserList());
});
