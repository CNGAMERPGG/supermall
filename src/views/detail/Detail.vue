<template>
    <div class="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="content" ref="scroll"
                :probeType="3"
                @scroll="contentScroll">
            <detail-swiper :topImages="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imgLoad="goodsImgLoad"/>
            <detail-param-info :paramInfo="paramInfo"/>
            <detail-comment-info :commentInfo="commentInfo"/>
        </scroll>
        <back-top class="back-top" @click.native="backTop" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'

import {getDetail, Goods, Shop, Param} from '@/network/detail'
import DetailSwiper from './childComponents/DetailSwiper.vue'
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
import DetailShopInfo from './childComponents/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
import DetailParamInfo from './childComponents/DetailParamInfo.vue'
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue'
import BackTop from '@/components/content/backTop/BackTop'

export default {
    name: "Detail",
    data() {
        return {
            iid: null,
            res: null,
            isShowBackTop: false,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: [],
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        BackTop,
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

            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo

            // 5.获取参数信息
            this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule)

            // 6.取出评论的信息
            if (data.rate.cRate !== 0){
                this.commentInfo = data.rate.list
            }
        })
    },
    methods: {
        goodsImgLoad() {
            this.$refs.scroll.refresh()
        },
        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        contentScroll(position) {
            // 1.判断BackTop是否显示
            this.isShowBackTop = (-position.y) > 1000

            // // 2.决定tabControl是否吸顶(position: fixed)
            // this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
    }

}
</script>

<style scoped>
.detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
}

.detail-nav {
    position: relative;
    z-index: 9;
    background: #fff;
}

.content {
    height: calc(100% - 44px);
}

.back-top {
    z-index: 10;
}
</style>