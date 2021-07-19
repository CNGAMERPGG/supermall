<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <scroll class="content"
                ref="scroll" 
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <home-swiper :banners="banners"/>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行', '新款', '精选']" 
                        class="tab-control"
                        @tabClick="tabClick" />
            <good-list :goods="showGoods"/>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
    import NavBar from '@/components/common/navbar/NavBar'
    import {getHomeMultidata, getHomeGoods} from '@/network/home'
    // import Swiper from '@/components/common/swiper/Swiper'
    // import SwiperItem from '@/components/common/swiper/SwiperItem'
    // import {Swiper, SwiperItem} from '@/components/common/swiper'

    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView.vue'
    import TabControl from '../../components/content/tabControl/TabControl.vue'
    import GoodList from '../../components/content/goods/GoodList.vue'
    import Scroll from '../../components/common/scroll/Scroll.vue'
    import BackTop from '../../components/content/backTop/BackTop.vue'

    export default {
        name: "Home",
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                isShowBackTop: false
            }
        },
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodList,
            Scroll,
            BackTop,
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        created(){
            // 1. 请求多个数据
            this.getHomeMultidata()

            // 2.请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
        },
        methods: {
            /**
             * 事件监听相关方法
             */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                    
                }
            },


            /**
             * 网络请求相关方法
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    // console.log(res);
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1

                    this.$refs.scroll.finishPullUp()
                })
            },
            backTop() {
               this.$refs.scroll.scrollTo(0, 0, 300)
            },
            contentScroll(position) {
                // console.log(position);
                this.isShowBackTop = (-position.y) > 1000
            },
            loadMore() {
                // console.log('上拉');
                this.getHomeGoods(this.currentType)
            }
        }
    }
</script>

<style scoped>
    #home {
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: white;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

    .tab-control {
        position: sticky;
        top: 44px;
    }

    .content {
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>