// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const adbDriver = require('adb-driver');
const { exec } = adbDriver;
 
exec(`adb devices`).then((result) => {
    if (result instanceof Error) {
      alert(`fail to execute adb devices`)
      return
    }
    alert(`you can parse your devices info here: ${result}`)
});