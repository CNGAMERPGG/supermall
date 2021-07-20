<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行', '新款', '精选']" 
                        @tabClick="tabClick" 
                        ref="tabControl1"
                        class="tab-control"
                        v-show="isTabFixed"/>
        <scroll class="content"
                ref="scroll" 
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore"
                >
            <home-swiper :banners="banners" @SwiperImageLoad="SwiperImageLoad"/>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行', '新款', '精选']" 
                        @tabClick="tabClick" 
                        ref="tabControl2"
                        />
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
    import {debounce} from '@/common/utils.js'

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
                isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false
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
        mounted() {
            // 1.图片加载的事件监听
            const refresh = debounce(this.$refs.scroll.refresh)
            this.$bus.$on('itemImageLoad', () => {
                refresh()
            })
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
                this.$refs.tabControl1.currentIndex =  index;
                this.$refs.tabControl2.currentIndex =  index;
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
                // 1.判断BackTop是否显示
                this.isShowBackTop = (-position.y) > 1000

                // 2.决定tabControl是否吸顶(position: fixed)
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
            },
            SwiperImageLoad() {
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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

        /**在使用浏览器原生滚动时， 为了让导航不跟随一起滚动 */
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; */
    }

    /* .tab-control {
        position: sticky;
        top: 44px;
    } */

    .fixed {
        position: fixed;
        left: 0;
        right: 0;
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

    .tab-control {
        position: relative;
        z-index: 9;
    }

</style>