import {Component} from "@angular/core";

declare let initializeFontSize: any

@Component({
    selector: 'page-designertypes-home',
    templateUrl: 'designertypes.html'
})
export class DesignerTypesPage {
    pageState: any = 0;

    ionViewDidEnter() {
        initializeFontSize()
    }
}