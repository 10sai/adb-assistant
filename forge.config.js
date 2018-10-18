module.exports = {
    publishers: [
        {
            "name": "@electron-forge/publisher-github",
            "config": {
              "repository": {
                "owner": "10sai",
                "name": "adb-assistant"
              },
              "prerelease": true,
              "authToken": "260d8be65dbde9d0f9f87c313c73fc0efe648c0f"
            }
        }
    ]
  }