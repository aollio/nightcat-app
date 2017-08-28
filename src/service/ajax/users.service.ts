import {Injectable} from "@angular/core";
import {SharedService} from "../share.service";
import {HttpUrls} from "../httpurls.service";
import {NetworkService} from "../network.service";
import {KeynoteService} from "../keynote.service";
import {Util} from "../util";
import {ImService} from "../im/service.im";
import {Events} from "ionic-angular";

@Injectable()
export class UsersService {

    // 缓存
    private users_uidmap = {};
    private users_accidmap = {};

    constructor(public keynote: KeynoteService,
                public shared: SharedService,
                public util: Util,
                private http: NetworkService,
                private urls: HttpUrls,
                private imServ: ImService,
                private event: Events) {
        //刷新当前用户信息
        event.subscribe("refresh_user", () => {
            this.getInfo(shared.getCurrentUser().uid).then(user => {
                shared.setCurrentUser(user);
            }).catch(err => {
                console.log(err);
            })
        })
    }

    cacheUser(user) {
        this.users_uidmap[user.uid] = user;
        this.users_accidmap[user.accid] = user;
    }


    //startnew
    // phone , password
    async login(userInfo) {
        console.log("开始登录");

        let data = await this.http.post(this.urls.user_login_post, userInfo);

        if (data.status != 200) {
            throw data
        }

        //set token
        localStorage[SharedService.TOKEN] = data.content.token;
        this.http.setToken(data.content.token);

        let user = await
            this.getInfo(data.content.uid);
        console.log("获取用户信息 OK", user);

        //set imtoken
        this.imServ.setToken(user)

        return user;
    }

    //nickname, password, role, phone, img_url
    async register(userInfo) {
        console.log("开始注册");

        let data = await this.http.post(this.urls.user_register_post, userInfo);
        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }

    async getInfo(uid) {
        console.log("获取用户信息");

        // if (this.users_uidmap[uid] != null) {
        //     return this.users_uidmap[uid];
        // }

        let data = await this.http.getWithToken(this.urls.user_info_get, {uid: uid});

        if (data.status != 200) {
            throw data;
        }
        this.cacheUser(data.content);
        return data.content;
    }

    async getInfoByAccid(accid) {
        console.log("获取用户信息 accid");


        if (this.users_uidmap[accid] != null) {
            return this.users_uidmap[accid];
        }

        let data = await this.http.getWithToken(this.urls.user_info_accid_get, {accid: accid});

        if (data.status != 200) {
            throw data;
        }
        this.cacheUser(data.content)
        return data.content;
    }

    //todo
    async resetPassword() {

    }

    async getHonors(uid) {
        console.log("获取荣誉", uid);
        let data = await this.http.get(this.urls.user_honors_get, {uid: uid});

        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }

    //name, img_url, get_time
    async setHonors(params) {
        let data = await this.http.postWithToken(this.urls.user_honors_get, params);

        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }

    async getExperience(uid) {
        console.log("获取经历");
        let data = await this.http.get(this.urls.user_experience_get, {uid: uid});

        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }

    async setExperience(name, description) {
        let data = await this.http.getWithToken(this.urls.user_experience_get, {
            name: name,
            description: description,
        });

        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }

    //type level name id_number img
    async setAuthentication(params) {
        console.log("上传用户证书认证");
        let data = await this.http.postWithToken(this.urls.user_authentication, params);

        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }


    // nickname,position,official,page,limit
    async getDesigners(params = {}) {
        let data = await this.http.get(this.urls.designer_list, params);

        if (data.status != 200) {
            throw data;
        }

        return data.content;
    }

//response: nickname,img_url
    async getInfoSimple(uid) {
        let data = await this.http.get(this.urls.user_info_simple_get, {uid: uid});

        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }

    async getExperienceComments(id) {
        let data = await this.http.get(this.urls.user_exp_comments_get, {id: id});

        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }

    async getVerifyCode(phone) {
        let data = await this.http.get(this.urls.verify_get, {phone: phone});

        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }

// todo 关注功能 获取是否关注
//uid,token
    async follow(uid) {
        console.log("关注");
        let data = await this.http.postWithToken(this.urls.user_follow_post,
            {uid: uid}
        );
        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }

    // uid,token
    async unfollow(uid) {
        console.log("取消关注");
        let data = await this.http.getWithToken(this.urls.user_unfollow_post, {uid: uid});
        if (data.status != 200) {
            throw data;
        }
        return data.content;
    }

    async following_list() {
        console.log("获取关注列表");
        let data = await  this.http.getWithToken(this.urls.user_folowing_get,);
        if (data.status != 200) {
            throw data;
        }
        console.log(data.content);
        return data.content;
    }
}