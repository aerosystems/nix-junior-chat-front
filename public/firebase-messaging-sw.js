importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

const firebaseConfig = {
    apiKey: "AIzaSyBpk8bySp1Vo1APTqVq_u3TtG0kAPNtb3o",
    authDomain: "nix-course.firebaseapp.com",
    projectId: "nix-course",
    storageBucket: "nix-course.appspot.com",
    messagingSenderId: "140305000798",
    appId: "1:140305000798:web:cdfc454ec02cf0510ec7cf"
};

const app = firebase.initializeApp(firebaseConfig);