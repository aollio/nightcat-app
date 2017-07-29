import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {OrderProcessDetailPage} from "../orderprocess/orderprocess";
import {SharedService} from "../../../../service/share.service";
import {AbsCommonPage} from "../../abs";
import {DesignerMeDetailPage} from "../../../designer/me/medetail/medetail";
import {PayPage} from "../../../employer/pay/pay";
import {CommentOrderPage} from "../comment-order/comment-order";
import {ChatPage} from "../../../im/chat/chat";

declare let initializeFontSize: any
/*
 * 订单详情
 * */

// @IonicPage()
@Component({
    selector: 'page-orderdetail',
    templateUrl: 'orderdetail.html',
})
export class OrderDetailPage extends AbsCommonPage {

    order_id: string;
    isDesigner: boolean;
    collectstate: any = 0;
    pay: any = PayPage;
    commentorder: any = CommentOrderPage;
    orderProcessDetail: any = OrderProcessDetailPage;

    /**
     * 先暂时设为参数为order id，或者为order的对象。
     * 构造器判断一下，如果是order id，则显示加载符号，如果是order直接显示
     * */
    constructor(public navCtrl: NavController, public navParams: NavParams, public share: SharedService) {
        super(share);
        this.order_id = navParams.get('order_id');
        this.isDesigner = share.isDesigner;
    }

    ionViewDidEnter() {
        initializeFontSize()
        console.log("com")
    }

    openUserDetail() {
        this.navCtrl.push(DesignerMeDetailPage, {})

    }

    open(page, option) {
        this.navCtrl.push(page, {})
    }

    collect() {
        this.collectstate = (++this.collectstate) % 2;
    }

    openChat(operation) {
        this.navCtrl.push(ChatPage,operation)
    }
}
