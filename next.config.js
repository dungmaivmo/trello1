const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    apiKey: 'AIzaSyDffEaD8HVhGNrvM5pLJv8n-z0Qma694Bw',
    authDomain: 'trello-2021.firebaseapp.com',
    databaseURL: "https://trello-2021-default-rtdb.firebaseio.com",
    projectId: "trello-2021",
    storageBucket: "trello-2021.appspot.com",
    messagingSenderId: "693579815206",
    appId: "1:693579815206:web:c43b73283605b5fed1c9e7",
    measurementId: "G-G2CZH3YB0X"
  },
}