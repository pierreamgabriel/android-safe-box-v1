let application = require("application");
require("./bundle-config");
application.run({ moduleName: "app-root" });
application.setCssFileName("app.css");
let frame = require('ui/frame');
let Sqlite = require("nativescript-sqlcipher");

if (application.android) {
    application.android.on(application.AndroidApplication.activityBackPressedEvent, backEvent);
}
function backEvent(args) {
    var currentPage = frame.topmost().currentPage;
    if (currentPage && currentPage.exports && typeof currentPage.exports.backEvent === "function") {
         currentPage.exports.backEvent(args);
   }
}
