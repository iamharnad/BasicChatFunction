// Your web app's Firebase configuration
// //var firebaseConfig = {
//     apiKey: "AIzaSyCgQovKa0wgubSO3smVCXtS5SsnJefFXZU",
//     authDomain: "fir-ignite-demo11.firebaseapp.com",
//     databaseURL: "https://fir-ignite-demo11.firebaseio.com",
//     projectId: "fir-ignite-demo11",
//     storageBucket: "fir-ignite-demo11.appspot.com",
//     messagingSenderId: "789734941689",
//     appId: "1:789734941689:web:92a58099bbb6dc3ad8d328"
//   };

const firebaseConfig = {
    apiKey: 'AIzaSyAwRtr6cc-UZ_S0J9xCGhn-qz7lXKeEA_I',
    authDomain: 'fir-ignite-demo1.firebaseapp.com',
    databaseURL: 'https://fir-ignite-demo1.firebaseio.com',
    projectId: 'fir-ignite-demo1',
    storageBucket: 'fir-ignite-demo1.appspot.com',
    messagingSenderId: '253720623500',
    appId: '1:253720623500:web:f9caaf05419a1a87c97ea9'
  };
  firebase.initializeApp(firebaseConfig);

 // Get a reference to the db
var database = firebase.database();

// Get a ref over the db. (What is Ref now?)
const dbRef = database.ref('messages');

// Attach an event on the ref
//dbRef.on('value', event => {
  //console.log(event.val());
//});

const inputbox = document.getElementById('inputbox');
const messages = document.getElementById('messages');
const CURRENT_USER = '@TheWizardJS';

//to create a message element
function getMessageElement(data) {
    const newElement = document.createElement('div');
    newElement.innerHTML = data.message;
    newElement.className = `message ${data.name == CURRENT_USER ? 'mine' : ''}`;
    return newElement;
}

//messages.appendChild(getMessageElement({ name: 'Guest', message: 'Hello' }));
//messages.appendChild(getMessageElement({ name: '@TheWizardJS', message: 'cyware' }));

inputbox.addEventListener('keyup', function(e) {
    if( e && e.code == 'Enter') {
        writeMessage(CURRENT_USER, e.target.value);
        inputbox.value = '';
    }
}
);


//TODO: WRITE FUNC

function writeMessage(name, message) {
    
        const uid = dbRef.push().key;

        dbRef.child(uid).set({
           name: name,
           message: message
       });
   }


dbRef.limitToLast(20).on('value', event => {
    const response = event.val();
if (response) {
messages.innerHTML = '';
    Object.keys(response).map(key => {
        messages.appendChild(getMessageElement(response[key]));
    });
}
});



