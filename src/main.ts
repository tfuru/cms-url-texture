import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import { VueFire } from 'vuefire'
import { initializeApp } from 'firebase/app'

import 'bulma/css/bulma.css'

const firebaseConfig = {
  apiKey: "AIzaSyCHs0w5vGunjZ7ukgJ22ZB_EZs4LW6gui0",
  authDomain: "cms-url-texture.firebaseapp.com",
  projectId: "cms-url-texture",
  storageBucket: "cms-url-texture.appspot.com",
  messagingSenderId: "291373635562",
  appId: "1:291373635562:web:50560dd15071222a93c493",
  measurementId: "G-F1YJ40JXYQ"
};
const firebaseApp = initializeApp(firebaseConfig)

const app = createApp(App)
app.use(VueFire, {firebaseApp, modules: []})
app.mount('#app')
