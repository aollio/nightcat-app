import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import {AlertController, NavController, Platform, ToastController} from "ionic-angular";
import {NotificationsPage} from "../../designer/nofitications/notifications";
import {AccountSecurityPage} from "../securitycenter/accountsecurity/accountsecurity";
import {SupportPage} from "../support/support";
import {SharedService} from "../../../service/share.service";
import {WelcomePage} from "../../welcome/welcome";
import {NetworkService} from "../../../service/network.service";
import {NoticesService} from "../../../service/ajax/notices.serveic";


@Component({
    selector: 'page-slidemenu',
    templateUrl: 'slidemenu.html'
})
export class SlideMenuComponment {

    messagePage: any = NotificationsPage;
    supportPage: any = SupportPage;
    accountSecurityPage: any = AccountSecurityPage;
    aboutPage: any = AboutPage

    user;
    isDesigner: boolean;

    // maincolor;

    constructor(public navCtrl: NavController,
                public platform: Platform,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                public shared: SharedService,
                private noticesServ:NoticesService,
                private http: NetworkService) {
        this.user = shared.getCurrentUser();
        // this.isDesigner = this.shared.isDesigner();
        // this.maincolor = this.shared.getPrimaryColor();
    }



    open(page, option) {
        this.navCtrl.push(page, option)
    }

    clearCache() {
        let alert = this.alertCtrl.create({
            title: '是否要完全清除缓存',
            message: '清除缓存可以节省系统内存空间，但是可能会造成运行速度减慢',
            buttons: [
                {
                    text: '撤销',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确认',
                    handler: () => {
                        //todo 清除缓存的后台逻辑
                        this.presentToast()
                        console.log('Comfirm clicked');
                    }
                }
            ]
        });
        alert.present();
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: '清除缓存成功',
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }

    exitApp() {
        if (!this.shared.isLogin()) {
            this.navCtrl.push(WelcomePage, {state: 2});
            return;
        }

        this.alertCtrl.create({
            subTitle: "是否退出？",
            buttons: [{
                text: "取消",
            }, {
                text: "确定",
                handler: data => {
                    this.shared.clearCurrentUser();
                    this.http.clearToken();

                    this.navCtrl.push(WelcomePage, {state: 2});
                }
            }]
        }).present();
    }
}
