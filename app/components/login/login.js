let Sqlite = require("nativescript-sqlcipher");
let observableModule = require("data/observable");
let CryptoJS = require("crypto-js");
let createViewModel = require("../../main-view-model").createViewModel;
let dialogsModule = require("ui/dialogs");
let frameModule = require("ui/frame");
let keyStorage = require("nativescript-temporary-key-storage").keyStorage;


let openKey = new observableModule.fromObject({
    key: "",
});    

function openDB() {
    let derivedKey = CryptoJS.PBKDF2(openKey.key, "", { keySize: 512/64, iterations: 1000 }).toString(CryptoJS.enc.Hex);
    let password = {key: derivedKey};
    keyStorage(derivedKey, 9000);
    
   
    new Sqlite("storage", password).then(db =>{
      db.execSQL('CREATE TABLE IF NOT EXISTS bank_account (id INTEGER PRIMARY KEY AUTOINCREMENT, bank_name TEXT, account_number TEXT, password TEXT, other_info TEXT)');
      db.execSQL('CREATE TABLE IF NOT EXISTS credit_card (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, number TEXT, verification TEXT, expiration_date TEXT, password TEXT)');  
      db.execSQL('CREATE TABLE IF NOT EXISTS website (id INTEGER PRIMARY KEY AUTOINCREMENT, site TEXT, username TEXT, password TEXT)');    
      db.execSQL('CREATE TABLE IF NOT EXISTS other_passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, other_info TEXT)'); 
      db.execSQL('CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, number TEXT, issue_date TEXT, expiration_date TEXT, other_info TEXT)'); 
      db.execSQL('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT)').then(id => {
      page.bindingContext = createViewModel(db); 
      openKey.key = "";
      openKey.confirmKey = ""; 
      derivedKey = CryptoJS.PBKDF2(openKey.key, "", { keySize: 512/64, iterations: 1000 }).toString(CryptoJS.enc.Hex);            
      goTo();    
     }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        alert("There was an error opening the database. Please check your password and try again.");
    });
    }

function goTo() {

   frameModule.topmost().navigate("components/main/main");   
    }

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = openKey;
};
exports.openDB = openDB;


