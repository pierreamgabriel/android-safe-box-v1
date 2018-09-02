import { Component, OnInit, NgZone } from "@angular/core";
import {isAndroid} from "platform";
import {FilePicker, } from "nativescript-file-picker";

import { Item } from "./item";
import { ItemService } from "./item.service";
import {openUrl} from "utils/utils";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private itemService: ItemService, private zone:NgZone) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }
    onTap(){
    

        if(isAndroid){

            var filepicker =  new FilePicker();
            filepicker.allowMultiple=false;
                this.zone.run(()=>{
                    filepicker.show().then((args)=>{
                    console.log("-----------------------------------------------------------------------");
                    console.log("-----------------------------------------------------------------------");
                    console.log("-----------------------------------------------------------------------");
                    console.log("selected file");
                    console.log("-----------------------------------------------------------------------");
                    console.log("-----------------------------------------------------------------------");
                    console.log("-----------------------------------------------------------------------");
                    console.log(args);
                    var filePath=""+args[0];
                    console.log(filePath);
                })
            })
            
        
        }
    }

}
