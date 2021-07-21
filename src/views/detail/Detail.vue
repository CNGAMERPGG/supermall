<template>
    <div id="detail">
        <detail-nav-bar/>
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
    </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'

import {getDetail, Goods, Shop} from '@/network/detail'
import DetailSwiper from './childComponents/DetailSwiper.vue'
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
import DetailShopInfo from './childComponents/DetailShopInfo.vue'

export default {
    name: "Detail",
    data() {
        return {
            iid: null,
            res: null,
            topImages: [],
            goods: {},
            shop: {}
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid

        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            console.log(res);
            const data = res.result
            // 1.获取顶部的图片轮播数据
            // console.log(res.result.itemInfo.topImages);
            this.topImages = data.itemInfo.topImages
            
            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)

            // 3.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)
        })
    }

}
</script>

<style scoped>

</style>