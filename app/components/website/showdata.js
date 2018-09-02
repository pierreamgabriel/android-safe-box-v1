let generateViewModel = require("./website").generateViewModel;
let processDb = require("nativescript-temporary-key-storage").processDb;
let Sqlite = require("nativescript-sqlcipher");
let request = require("../login/login");
let dialog = require("ui/dialogs");
let frameModule = require("ui/frame");



function onNavigatingTo(args) {
    let page = args.object;
    page.bindingContext = generateViewModel();   
}

function editData(args){
let rowId = args.object.rowId;  
let website = args.object.website;
let username = args.object.username; 
let password = args.object.password;  
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
      new Sqlite("storage", mainKey).then(db => {
    db.execSQL('UPDATE website SET site = "' + website + '",username = "' + username + '",password = "' + password + '" WHERE id = ' + rowId); 
     }).then(function() {
        let options = {title:"", message:"The information was successfully updated.",okButtonText: "Ok" };        
        dialog.alert(options).then(function(){
        frameModule.topmost().navigate("components/website/website");        
                });    
    });
    }
    },0);    
}
function deleteData(args){   
let rowId = args.object.rowId;    
dialog.confirm("Are you sure you want to proceed? Once deleted, you can't recover this data").then(function (answer){
    if (answer === true) {
    proceed(rowId);
    }
}); 
}
function proceed(args) { 
let rowId = args;   
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
      new Sqlite("storage", mainKey).then(db => {
    db.execSQL("DELETE FROM website WHERE id =" + rowId);  
     }).then(function() {
        let options = {title:"", message:"The information was successfully deleted.",okButtonText: "OK" };        
        dialog.alert(options).then(function(){
        frameModule.topmost().navigate("components/website/website");        
                }); 
    });
    }
    },0);    
}
function goBack(){
frameModule.topmost().navigate("components/website/website");     
}
exports.onNavigatingTo = onNavigatingTo;
exports.editData = editData;
exports.deleteData = deleteData;
exports.goBack = goBack;