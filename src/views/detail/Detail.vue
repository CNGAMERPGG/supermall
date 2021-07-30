<template>
    <div class="detail">
        <detail-nav-bar class="detail-nav" 
                        @titleClick="titleClick"
                        ref="nav"/>
        <scroll class="content" ref="scroll"
            :probeType="3"
            @scroll="contentScroll">
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detailInfo="detailInfo" @imgLoad="goodsImgLoad"/>
        <detail-param-info ref="params" :paramInfo="paramInfo"/>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
        <good-list ref="recommend" :goods="recommend"/>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop" class="back-top"></back-top>
        <detail-bottom-bar @addCart="addToCart"/>
    </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'

import {getDetail, Goods, Shop, Param, getRecommend} from '@/network/detail'
import DetailSwiper from './childComponents/DetailSwiper.vue'
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
import DetailShopInfo from './childComponents/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
import DetailParamInfo from './childComponents/DetailParamInfo.vue'
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue'
import GoodList from '../../components/content/goods/GoodList.vue'
import {debounce} from '@/common/utils'
import {itemListenerMixin, backTopMixin} from '@/common/mixin'
import DetailBottomBar from './childComponents/DetailBottomBar.vue'

import { mapActions } from 'vuex'

export default {
    name: "Detail",
    mixins: [itemListenerMixin, backTopMixin],
    data() {
        return {
            iid: null,
            res: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: [],
            recommend: [],
            itemImgListener: null,
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0
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
        GoodList,
        DetailBottomBar,
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid

        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            // console.log(res);
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

            // this.$nextTick(() => {
            //     this.themeTopYs = []
            //     this.themeTopYs.push(0);
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            //     console.log(this.themeTopYs);
            // })

            
        })

        // 3.请求推荐数据
        getRecommend().then(res => {
            this.recommend = res.data.list
        })

        // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []

            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
            this.themeTopYs.push(Number.MAX_VALUE)

            // console.log(this.themeTopYs);
        }, 500)

    },
    methods: {
        ...mapActions(['addCart']),
        goodsImgLoad() {
            this.$refs.scroll.refresh()
            this.getThemeTopY()            
        },
        // backTop() {
        //     this.$refs.scroll.scrollTo(0, 0, 300)
        // },
        contentScroll(position) {
            // 1.判断BackTop是否显示
            this.listenShowBackTop(position)

            // // 2.决定tabControl是否吸顶(position: fixed)
            // this.isTabFixed = (-position.y) > this.tabOffsetTop

            // 获取Y值
            const positionY = -position.y
            let length = this.themeTopYs.length
            for(let i = 0; i < length-1; i++) {
                // if(positionY >= this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i)+1]) {
                //     console.log(i);
                // }
                if (this.currentIndex !== i && 
                    (positionY >= this.themeTopYs[i] && 
                    positionY < this.themeTopYs[i+1])) {
                    this.currentIndex = i
                    // console.log(this.currentIndex);
                    // console.log(this.$refs.nav.currentIndex);
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
        },
        titleClick(index) {
            // console.log(index);
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)            
        },
        addToCart() {
            // console.log('-----');

            // 1.获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.lowNowPrice
            product.iid = this.iid

            // console.log(product);
            // 2.将商品添加到购物车
            this.addCart(product).then(res => {
                console.log(res);
            })
            // this.$store.dispatch('addCart', product).then(res => {
            //     console.log(res);
            // })
        }
    },
    mounted() {
        
    },
    updated() {
        
    },
    destroyed() {
        this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
}
</script>

<style scoped>
.detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
    /* height: calc(100% - 44px - 49px); */
}

.detail-nav {
    position: relative;
    z-index: 9;
    background: #fff;
}

.content {
    height: calc(100% - 44px - 49px);
}

.back-top {
    bottom: 60px;
    z-index: 10;
}
</style>