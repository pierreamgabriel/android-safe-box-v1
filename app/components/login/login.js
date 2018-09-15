const observableModule = require("data/observable");
const sha512 = require("crypto-js/sha512");
const keyStorage = require("nativescript-temporary-key-storage").keyStorage;
const Sqlite = require("nativescript-sqlcipher");
const dialogsModule = require("ui/dialogs");
const frameModule = require("ui/frame");


let openKey = new observableModule.fromObject({
    key: "",
});    

function openDB() {
    let derivedKey = sha512(openKey.key).toString();
    let password = {key: derivedKey};
    
    keyStorage(derivedKey, 9000);
    
    new Sqlite("storage.db", password).then(db =>{
      db.execSQL('CREATE TABLE IF NOT EXISTS bank_account (id INTEGER PRIMARY KEY AUTOINCREMENT, bank_name TEXT, account_number TEXT, password TEXT, other_info TEXT)');
      db.execSQL('CREATE TABLE IF NOT EXISTS credit_card (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, number TEXT, verification TEXT, expiration_date TEXT, password TEXT)');  
      db.execSQL('CREATE TABLE IF NOT EXISTS website (id INTEGER PRIMARY KEY AUTOINCREMENT, site TEXT, username TEXT, password TEXT)');    
      db.execSQL('CREATE TABLE IF NOT EXISTS other_passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, other_info TEXT)'); 
      db.execSQL('CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, number TEXT, issue_date TEXT, expiration_date TEXT, other_info TEXT)'); 
      db.execSQL('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT)').then(id => {
      new Sqlite("logged");  
      openKey.key = "";      
      page.bindingContext = createViewModel(db);  
     }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        alert("There was an error opening the database. Please check your password and try again.");
    }).then(function() {
        if (Sqlite.exists("logged")) {
         frameModule.topmost().navigate({moduleName:"components/main/main", clearHistory: true});    
        }
    });
    }


exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = openKey;
};
exports.openDB = openDB;


