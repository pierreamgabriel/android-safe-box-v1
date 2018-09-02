let processDb = require("nativescript-temporary-key-storage").processDb;
let Sqlite = require("nativescript-sqlcipher");
let dialog = require("ui/dialogs");
let Observable = require("data/observable").Observable;
let createViewModel = require("../../main-view-model").createViewModel;
let listViewModule = require("ui/list-view");
let frameModule = require("ui/frame");


let rowId = "";
let name = "";    
let account = ""; 
let password = ""; 
let other = "";

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

function add() {
frameModule.topmost().navigate("components/bank/add");    
}
function generateViewModel() {
 var viewModel = new Observable();
 viewModel.rowId2 = rowId;    
 viewModel.name2 = name;    
 viewModel.account2 = account; 
 viewModel.password2 = password; 
 viewModel.other2 = other;
    
    return viewModel;
}

function receiveData(args){
 rowId = args.object.rowId;
 name = args.object.name;    
 account = args.object.account; 
 password = args.object.password; 
 other = args.object.other;     
frameModule.topmost().navigate("components/bank/showdata")    
}

exports.backEvent = function(args) {
  args.cancel = true; 
  frameModule.topmost().navigate({moduleName:"components/main/main",clearHistory: true }); 
 
}
function goBack(){
frameModule.topmost().navigate("components/main/main");     
}

exports.onNavigatingTo = onNavigatingTo;
exports.add = add;
exports.generateViewModel = generateViewModel;
exports.receiveData = receiveData;
exports.goBack = goBack;


