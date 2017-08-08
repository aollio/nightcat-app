import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {DesignerMeDetailPage} from "../../pages/designer/me/medetail/medetail";
import {UsersService} from "../../service/ajax/users.service";

declare let initializeFontSize: any

@Component({
    selector: 'designer-item-max',
    templateUrl: 'designer-item.html'
})
//
// @NgModule({
//     schemas: [
//         CUSTOM_ELEMENTS_SCHEMA,
//         NO_ERRORS_SCHEMA
//     ],
// })

export class DesignerItemMax {
    @Input("designer") designer;

    private userInfo;

    constructor(private userServ: UsersService) {

    }

    ionViewDidEnter() {
        this.userServ.getInfo(this.designer.uid).then(user => {
            this.userInfo = user;
        }).catch(error => {
            console.log(error);
        });

    }
}
