<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="(item, index) in topImages" 
                    :key="index"
                    class="swiper-item">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/common/swiper'

export default {
    name: "DetailSwiper",
    props: {
        topImages: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper, 
        SwiperItem
    },
    created() {
        for(item in this.topImages){
            console.log(item)
        }
    }


}
</script>

<style scoped>
.detail-swiper{
   height: 40vh;
   overflow: hidden; 
}
</style>