
const firebaseConfig = {
  apiKey: "AIzaSyCWyQfMmzp41jTYV4GXFViV2wMMTIiP8XU",
  authDomain: "wallet-52a17.firebaseapp.com",
  projectId: "wallet-52a17",
  storageBucket: "wallet-52a17.appspot.com",
  messagingSenderId: "440517088889",
  appId: "1:440517088889:web:a862ab37106851c66066a8",
  measurementId: "G-28Z0S2BGEV"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Auth
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("auth-section").style.display = "none";
      document.getElementById("wallet-section").style.display = "block";
      document.getElementById("user-email").innerText = email;

      if (email === "ahmedfouad01278837444@gmail.com") {
        document.getElementById("admin-section").style.display = "block";
      }

      const userDoc = db.collection("wallets").doc(email);
      userDoc.get().then(doc => {
        if (!doc.exists) {
          userDoc.set({ balance: 0 });
        } else {
          document.getElementById("balance").innerText = doc.data().balance;
        }
      });
    })
    .catch((error) => {
      document.getElementById("error-message").innerText = error.message;
    });
}

function logout() {
  auth.signOut().then(() => {
    location.reload();
  });
}

// Wallet Actions
function deposit() {
  const amount = parseFloat(document.getElementById("deposit-amount").value);
  const email = auth.currentUser.email;

  if (amount >= 5) {
    const userDoc = db.collection("wallets").doc(email);
    userDoc.update({
      balance: firebase.firestore.FieldValue.increment(amount)
    }).then(() => location.reload());
  } else {
    alert("Minimum deposit is 5 EGP");
  }
}

function withdraw() {
  const amount = parseFloat(document.getElementById("withdraw-amount").value);
  const phone = document.getElementById("withdraw-phone").value;
  const email = auth.currentUser.email;

  if (amount >= 5) {
    const userDoc = db.collection("wallets").doc(email);
    userDoc.get().then(doc => {
      if (doc.data().balance >= amount) {
        userDoc.update({
          balance: firebase.firestore.FieldValue.increment(-amount)
        }).then(() => {
          alert("Send " + amount + " EGP to +201012265953. Include transfer proof and your number.");
          location.reload();
        });
      } else {
        alert("Insufficient balance");
      }
    });
  } else {
    alert("Minimum withdraw is 5 EGP");
  }
}

function transfer() {
  const amount = parseFloat(document.getElementById("transfer-amount").value);
  const recipient = document.getElementById("transfer-email").value;
  const sender = auth.currentUser.email;

  if (amount > 0) {
    const senderDoc = db.collection("wallets").doc(sender);
    const recipientDoc = db.collection("wallets").doc(recipient);

    senderDoc.get().then(doc => {
      if (doc.exists && doc.data().balance >= amount) {
        recipientDoc.get().then(recDoc => {
          if (recDoc.exists) {
            recipientDoc.update({
              balance: firebase.firestore.FieldValue.increment(amount)
            });
          } else {
            recipientDoc.set({ balance: amount });
          }
          senderDoc.update({
            balance: firebase.firestore.FieldValue.increment(-amount)
          }).then(() => location.reload());
        });
      } else {
        alert("Insufficient balance or account error");
      }
    });
  }
}

function addBalance() {
  const email = document.getElementById("target-email").value;
  const amount = parseFloat(document.getElementById("add-amount").value);

  if (email && amount > 0) {
    const userDoc = db.collection("wallets").doc(email);
    userDoc.get().then(doc => {
      if (doc.exists) {
        userDoc.update({
          balance: firebase.firestore.FieldValue.increment(amount)
        }).then(() => alert("Balance added"));
      } else {
        userDoc.set({ balance: amount }).then(() => alert("Balance added"));
      }
    });
  }
}
