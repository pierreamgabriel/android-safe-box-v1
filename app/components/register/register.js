const observableModule = require("data/observable");
const sha256 = require("crypto-js/sha256");
const keyStorage = require("nativescript-temporary-key-storage").keyStorage;
const Sqlite = require("nativescript-sqlcipher");
const dialogsModule = require("ui/dialogs");
const frameModule = require("ui/frame");


let openKey = new observableModule.fromObject({
    key: "",
    confirmKey: ""
});    

function openDB() {
    let derivedKey = sha256(openKey.key).toString();
    let password = {key: derivedKey};
    
    if (openKey.key.length < 10){
    dialogsModule.alert("Your password must contain at least 10 characters.")    
    } 
    else if (openKey.key != openKey.confirmKey){
    dialogsModule.alert("Passwords don't match.")    
    }
    else {
        
    new Sqlite("storage.db", password).then(db =>{
      db.execSQL('CREATE TABLE IF NOT EXISTS bank_account (id INTEGER PRIMARY KEY AUTOINCREMENT, bank_name TEXT, account_number TEXT, password TEXT, other_info TEXT)');
      db.execSQL('CREATE TABLE IF NOT EXISTS credit_card (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, number TEXT, verification TEXT, expiration_date TEXT, password TEXT)');  
      db.execSQL('CREATE TABLE IF NOT EXISTS website (id INTEGER PRIMARY KEY AUTOINCREMENT, site TEXT, username TEXT, password TEXT)');    
      db.execSQL('CREATE TABLE IF NOT EXISTS other_passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, other_info TEXT)'); 
      db.execSQL('CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, number TEXT, issue_date TEXT, expiration_date TEXT, other_info TEXT)'); 
      db.execSQL('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT)').then(id => {
      keyStorage(derivedKey, 9000);      
      new Sqlite("registered");       
      new Sqlite("logged");       
      page.bindingContext = createViewModel(db);  
     }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log(error);
    }).then(function() {
        if (Sqlite.exists("registered")) {
         frameModule.topmost().navigate({moduleName:"components/main/main", clearHistory: true});    
        }
    });
    }
}

exports.loaded = function(args) {
dialogsModule.alert({title:"",message:"This is your first access. In order to create your encrypted database you need to provide a strong password containing at least 10 characters.",okButtonText:"GOT IT"})    
    page = args.object;
    page.bindingContext = openKey;
};
exports.openDB = openDB;