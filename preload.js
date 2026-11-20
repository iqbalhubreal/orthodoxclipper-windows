const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("OrthodoxDesktop", true);
