let generateViewModel = require("./document").generateViewModel;
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
let type = args.object.type;    
let number = args.object.number; 
let issue = args.object.issue; 
let expiration = args.object.expiration; 
let other = args.object.other;     
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
    db.execSQL('UPDATE documents SET type = "' + type + '",number = "' + number + '",issue_date = "' + issue + '",expiration_date = "' + expiration + '",other_info = "' + other + '" WHERE id = ' + rowId); 
     }).then(function() {
        let options = {title:"", message:"The information was successfully updated.",okButtonText: "OK" };        
        dialog.alert(options).then(function(){
        frameModule.topmost().navigate("components/document/document");        
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
    db.execSQL("DELETE FROM documents WHERE id =" + rowId);  
     }).then(function() {
        let options = {title:"", message:"The information was successfully deleted.",okButtonText: "OK" };        
        dialog.alert(options).then(function(){
        frameModule.topmost().navigate("components/document/document");        
                }); 
    });
    }
    },0);    
}
function goBack(){
frameModule.topmost().navigate("components/document/document");     
}
exports.onNavigatingTo = onNavigatingTo;
exports.editData = editData;
exports.deleteData = deleteData;
exports.goBack = goBack;