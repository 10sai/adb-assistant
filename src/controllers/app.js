angular.module("adba.controller", []).controller("AppCtrl", function($scope, $adbdriver, $ionicLoading, $ionicPopup){
    $scope.device = {}
    $scope.isConnected = false;
    $scope.connect = function(){
        if($scope.device.ip){
            $ionicLoading.show({template: 'Connecting to ' + $scope.device.ip + '...'});
            $adbdriver.exec('adb connect ' + $scope.device.ip).then(function(result){
                if(result instanceof Error){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: "Connection Error",
                        template: "fail to connect to " + $scope.device.ip
                    });
                }
                $ionicLoading.hide();
                if(result.match("connected to " + $scope.device.ip + ":5555")){
                    $scope.isConnected = true;
                }
                document.getElementById("log").innerHTML += '<p>$: ' + result +'</p>';
            });
        } else {
            $ionicPopup.alert({
                title: 'IP Error',
                template: 'type device IP eg. 192.168.100.x or usb to connect with usb.'
            });
        }
    }
    $scope.disconnect = function(){
        $ionicLoading.show({template: "Disconnecting from " + $scope.device.ip + '...'});
        $adbdriver.exec("adb disconnect").then(function(result){
            if(result instanceof Error){
                $ionicPopup.alert({
                  title: 'Disconnection Error',
                  template: 'Fail to run disconnection command.'
                });
            }
            $ionicLoading.hide();
            $scope.isConnected = false;
            document.getElementById("log").innerHTML += "<p>$: " + result + "</p>";
        });
    }
    $scope.install = function(){
      if($scope.filePath && $scope.isConnected){
          $ionicLoading.show({template: 'Installing ' + $scope.manifest.name + '... '})
          $adbdriver.exec('adb install "' + $scope.filePath + '"').then(function(result){
                if(result instanceof Error){
                    $ionicPopup.alert({
                      title: 'Installation Error',
                      template: 'fail to run installation'
                    });
                }
                $ionicLoading.hide();
                document.getElementById("log").innerHTML += "<p>$: " + result + "</p>";
            });
        } else {
            $ionicPopup.alert({
                title: 'Apk Error',
                template: 'please select apk file first'
            });
        }  
    }

    $scope.select = function(){
        $ionicLoading.show();
        $adbdriver.select().then(function(file){
            $ionicLoading.show({template: 'Parsing APK file..'});
            $scope.filePath = file;
            $adbdriver.parse(file.toString()).then(function(application){
                $ionicLoading.hide();
                $scope.manifest = application;
            }).catch(function(error){
                $ionicLoading.hide();s
                alert(error);
            });
        }).catch(function(error){
            $ionicLoading.hide();
            alert(error);
        })
    }
});