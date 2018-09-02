let Sqlite = require("nativescript-sqlcipher");
let observableModule = require("data/observable");
let CryptoJS = require("crypto-js");
let dialogsModule = require("ui/dialogs");
let frameModule = require("ui/frame");
let keyStorage = require("nativescript-temporary-key-storage").keyStorage;

let openKey = new observableModule.fromObject({
    key: "",
    confirmKey: ""
});    

function openDB() {
    let derivedKey = CryptoJS.PBKDF2(openKey.key, "", { keySize: 512/64, iterations: 1000 }).toString(CryptoJS.enc.Hex);
    let password = {key: derivedKey};
    keyStorage(derivedKey, 9000);
    
    if (openKey.key.length < 10){
    dialogsModule.alert("Your password must contain at least 10 characters.")    
    } 
    else if (openKey.key != openKey.confirmKey){
    dialogsModule.alert("Passwords don't match.")    
    }
    else {
        
    new Sqlite("storage2", password).then(db =>{
      db.execSQL('CREATE TABLE IF NOT EXISTS bank_account (id INTEGER PRIMARY KEY AUTOINCREMENT, bank_name TEXT, account_number TEXT, password TEXT, other_info TEXT)');
      db.execSQL('CREATE TABLE IF NOT EXISTS credit_card (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, number TEXT, verification TEXT, expiration_date TEXT, password TEXT)');  
      db.execSQL('CREATE TABLE IF NOT EXISTS website (id INTEGER PRIMARY KEY AUTOINCREMENT, site TEXT, username TEXT, password TEXT)');    
      db.execSQL('CREATE TABLE IF NOT EXISTS other_passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, other_info TEXT)'); 
      db.execSQL('CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, number TEXT, issue_date TEXT, expiration_date TEXT, other_info TEXT)'); 
      db.execSQL('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT)').then(id => {
      new Sqlite("registered");
      new Sqlite("logged");       
      page.bindingContext = createViewModel(db); 
      openKey.key = "";
      openKey.confirmKey = ""; 
      derivedKey = CryptoJS.PBKDF2(openKey.key, "", { keySize: 512/64, iterations: 1000 }).toString(CryptoJS.enc.Hex);      
      alert(derivedKey);      
      goTo();    
     }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        alert("There was an error opening the database. Please check your password and try again.");
    });
    }
}
function goTo() {
       
    frameModule.topmost().navigate({moduleName:"components/main/main", clearHistory: true});         
                              
    }

exports.loaded = function(args) {
dialogsModule.alert({title:"",message:"This is your first access. In order to create your encrypted database you need to provide a strong password containing at least 10 characters.",okButtonText:"GOT IT"})    
    page = args.object;
    page.bindingContext = openKey;
};
exports.openDB = openDB;