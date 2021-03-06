import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default {
    addCart(context, payload){
        // payload新添加的商品
        return new Promise((resolve, reject) => {
            // 1. 查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            
            // 2.判断oldProduct
            if (oldProduct) { // 数量+1
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('添加成功');
            } else { // 添加新的商品
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('已为您添加到购物车');
            }
        })
    }
}