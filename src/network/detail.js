import {request} from './request'

// 请求详情
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {
	return request({
		url: '/recommend'
	})
}

// 请求商品详情
export class Goods {
    constructor(itemInfo, columns, shopInfo) {
	    this.title = itemInfo.title;
		this.price = itemInfo.price;
		this.oldPrice = itemInfo.oldPrice;
		this.lowNowPrice = itemInfo.lowNowPrice;
		this.discountDesc = itemInfo.discountDesc;
		this.columns = columns;
		this.services = shopInfo.services;
		this.desc = itemInfo.desc;
	}
}

// 商铺信息
export class Shop {
    constructor(shopInfo) {
        this.shopLogo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.score = shopInfo.score;
		this.cSells = shopInfo.cSells;
		this.cGoods = shopInfo.cGoods;
    }
}

//参数信息
export class Param {
	constructor(info, rule) {
	    this.info = info.set;
		this.rule = rule.tables;
	}
}