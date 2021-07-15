<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"></recommend-view>
    </div>
</template>

<script>
    import NavBar from '@/components/common/navbar/NavBar'
    import {getHomeMultidata} from '@/network/home'
    // import Swiper from '@/components/common/swiper/Swiper'
    // import SwiperItem from '@/components/common/swiper/SwiperItem'
    // import {Swiper, SwiperItem} from '@/components/common/swiper'

    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'

    export default {
        name: "Home",
        data() {
            return {
                banners: [],
                recommends: []
            }
        },
        components: {
            NavBar,
            HomeSwiper,
            RecommendView
        },
        created(){
            // 1. 请求多个数据
            getHomeMultidata().then(res => {
                console.log(res);
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        }
    }
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: white;
    }
</style>