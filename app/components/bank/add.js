let processDb = require("nativescript-temporary-key-storage").processDb;
let Sqlite = require("nativescript-sqlcipher");
let createViewModel = require("../../main-view-model").createViewModel;
let request = require("../login/login");
let dialog = require("ui/dialogs");
let frameModule = require("ui/frame");

function onNavigatingTo(args) {
   let page = args.object; 
    let mainKey = {key:""};
    let requestKey = new processDb();
    requestKey.getKey(); 
    setTimeout(function() { 
        mainKey.key = requestKey.returnKey();
         if (mainKey === undefined){
        let options = {title:"Session expired", message:"You need to login again", okButtonText:"OK"};    
        dialog.alert(options).then(function(){
        frameModule.topmost().navigate("components/login/login");    
        });
    } else {
        new Sqlite("storage", mainKey).then(db =>{
     page.bindingContext = createViewModel(db);});
    }
    },0);    
}

function goBack(){
frameModule.topmost().navigate("components/bank/bank");     
}
exports.onNavigatingTo = onNavigatingTo;
exports.goBack = goBack;