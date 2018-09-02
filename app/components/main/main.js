let Sqlite = require("nativescript-sqlcipher");
let layout = require("ui/layouts/grid-layout");
let observableModule = require("data/observable");
let dialogs = require("ui/dialogs");
let frameModule = require("ui/frame");



exports.loaded = function() {
   
if (!Sqlite.exists("registered") && !Sqlite.exists("logged")) {
    frameModule.topmost().navigate({moduleName:"components/register/register", clearHistory: true});  
    } else   
if (!Sqlite.exists("logged")) {
    frameModule.topmost().navigate({moduleName:"components/login/login", clearHistory: true});  
    }    
};

exports.goTo = function(id) {
id = id.object.id;
switch (id) {
    case "personalDoc":
frameModule.topmost().navigate("components/document/document")   
    break;
    case "note":
frameModule.topmost().navigate("components/notes/notes")   
    break;
    case "password":
frameModule.topmost().navigate("components/password/password")   
    break;
    case "webLogin":
frameModule.topmost().navigate("components/website/website")   
    break;
    case "creditCard":
frameModule.topmost().navigate("components/creditcard/creditcard")   
    break;
    case "bank":
frameModule.topmost().navigate("components/bank/bank")   
    break;
        
}    
}