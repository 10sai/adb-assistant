angular.module("adbdriver", []).factory("$adbdriver", function(){
const adbDriver = require('adb-driver');
const { exec } = adbDriver;

const appParser = require('js-app-parser');
const fs = require('fs');
const {dialog} = require('electron').remote;
return {
    exec: exec,
    parse: function(path){
        const buffer = fs.readFileSync(path).buffer;
        return new Promise(function(resolve, reject){
            if(path){
                appParser.Application.loadAsync(buffer).then(application => {
                    // get application meta info
                    resolve(application);
                }).catch(error => {
                    // do when error
                    reject(error);
                });
            } else {
                reject('no-file-path');
            }
        });
    },
    select: function(){
        return new Promise(function(resolve, reject){
            dialog.showOpenDialog({title: "Select APK File", buttonLabel: "Select", filters: [{name: "Android Package", extensions: ["apk"]}],properties: ["openFile"]}, function(file){
                if(file){
                  resolve(file);
                } else {
                  reject("no-apk-selected");
                }
            });
        });
    }
}
});