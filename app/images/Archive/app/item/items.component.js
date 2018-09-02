"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("platform");
var nativescript_file_picker_1 = require("nativescript-file-picker");
var item_service_1 = require("./item.service");
var ItemsComponent = (function () {
    function ItemsComponent(itemService, zone) {
        this.itemService = itemService;
        this.zone = zone;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    ItemsComponent.prototype.onTap = function () {
        if (platform_1.isAndroid) {
            var filepicker = new nativescript_file_picker_1.FilePicker();
            filepicker.allowMultiple = false;
            this.zone.run(function () {
                filepicker.show().then(function (args) {
                    console.log("-----------------------------------------------------------------------");
                    console.log("-----------------------------------------------------------------------");
                    console.log("-----------------------------------------------------------------------");
                    console.log("selected file");
                    console.log("-----------------------------------------------------------------------");
                    console.log("-----------------------------------------------------------------------");
                    console.log("-----------------------------------------------------------------------");
                    console.log(args);
                    var filePath = "" + args[0];
                    console.log(filePath);
                });
            });
        }
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService, core_1.NgZone])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMEQ7QUFDMUQscUNBQW1DO0FBQ25DLHFFQUFzRDtBQUd0RCwrQ0FBNkM7QUFTN0MsSUFBYSxjQUFjO0lBR3ZCLHdCQUFvQixXQUF3QixFQUFVLElBQVc7UUFBN0MsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFPO0lBQUksQ0FBQztJQUV0RSxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFDRCw4QkFBSyxHQUFMO1FBR0ksRUFBRSxDQUFBLENBQUMsb0JBQVMsQ0FBQyxDQUFBLENBQUM7WUFFVixJQUFJLFVBQVUsR0FBSSxJQUFJLHFDQUFVLEVBQUUsQ0FBQztZQUNuQyxVQUFVLENBQUMsYUFBYSxHQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDVixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtvQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO29CQUN2RixPQUFPLENBQUMsR0FBRyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7b0JBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMseUVBQXlFLENBQUMsQ0FBQztvQkFDdkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO29CQUN2RixPQUFPLENBQUMsR0FBRyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7b0JBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMseUVBQXlFLENBQUMsQ0FBQztvQkFDdkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxRQUFRLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDLENBQUMsQ0FBQTtRQUdOLENBQUM7SUFDTCxDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBbENELElBa0NDO0FBbENZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO0tBQ3hDLENBQUM7cUNBSW1DLDBCQUFXLEVBQWUsYUFBTTtHQUh4RCxjQUFjLENBa0MxQjtBQWxDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtpc0FuZHJvaWR9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0IHtGaWxlUGlja2VyLCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmlsZS1waWNrZXJcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQge29wZW5Vcmx9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpdGVtczogSXRlbVtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsIHByaXZhdGUgem9uZTpOZ1pvbmUpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gICAgfVxuICAgIG9uVGFwKCl7XG4gICAgXG5cbiAgICAgICAgaWYoaXNBbmRyb2lkKXtcblxuICAgICAgICAgICAgdmFyIGZpbGVwaWNrZXIgPSAgbmV3IEZpbGVQaWNrZXIoKTtcbiAgICAgICAgICAgIGZpbGVwaWNrZXIuYWxsb3dNdWx0aXBsZT1mYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIGZpbGVwaWNrZXIuc2hvdygpLnRoZW4oKGFyZ3MpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWQgZmlsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWxlUGF0aD1cIlwiK2FyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGVQYXRoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19