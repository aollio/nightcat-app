import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {ResetPasswordPage} from "../resetpassword/resetpassword";
import {User} from "../../../model/user";
import {AbsCommonPage} from "../abs";
import {UsersService} from "../../../service/ajax/users.service";
import {DesignerTabsPage} from "../../designer/tabs/tabs";
import {EmployerModulePage} from "../../employer/employer";
import {DesignerModulePage} from "../../designer/designer";
import {SharedService} from "../../../service/share.service";
import {WelcomePage} from "../../welcome/welcome";
import {async} from "rxjs/scheduler/async";

declare let initializeFontSize: any

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {


    user: any = {};

    //the view that jump
    resetPasswordPage: ResetPasswordPage;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public toastCtrl: ToastController,
                public viewCtrl: ViewController,
                public event: Events,
                public userSev: UsersService,
                public shared: SharedService) {
    }

    ionViewDidEnter() {
        initializeFontSize()
    }

    close(){
        // console.log('asd');
        this.viewCtrl.dismiss();
    }



    login() {

        if (this.user.phone == null || this.user.phone == '') {
            this.toast('请输入手机号')
            return
        }
        if (this.user.password == null || this.user.password == '') {
            this.toast('请输入密码')
            return
        }

        console.log("开始登录");


        (async ()=> {
            await this.userSev.login(this.user)
            let user = await this.userSev.getLoginUser()
            //todo 登陆成功
            if (user.role == '00'){
                // this.navCtrl.setRoot(DesignerModulePage)
                this.viewCtrl.dismiss();
                this.event.publish('backdoor')
            }else if (user.role == '01'){
                // this.navCtrl.setRoot(EmployerModulePage)
                this.viewCtrl.dismiss();
                this.event.publish('backdoor')
            }else {
                throw {}
            }

        })().catch(error => {
            this.toast("登录出现了异常");
            console.log("login.ts error", error)
        });

    }

    openRegisterPage() {
        this.navCtrl.push(RegisterPage, {
            register: 'true'
        })
    }

    openResetPasswordPage() {
        this.navCtrl.push(ResetPasswordPage, {});
    }

    open(page, option) {
        this.navCtrl.push(page, option);
    }

    toast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }

}
