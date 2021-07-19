<template>
    <!-- ref/children -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullDown from "@better-scroll/pull-down";
import PullUp from '@better-scroll/pull-up';
BScroll.use(PullDown);
BScroll.use(PullUp);
export default {
    name: "Scroll",
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }

    },
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            pullUpLoad: this.pullUpLoad,
            probeType: this.probeType,
            scrollbar: true,
            pullDownRefresh: true,
            
        })

        // 2.监听滚动位置
        this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
        })

        // 3.监听上拉事件
        this.scroll.on('pullingUp', () => {
            // console.log('上拉加载更多');
            this.$emit('pullingUp')
        })

    },
    updated() {
        // 刷新一下这个scroll才能正常使用(btw我也不知道为啥)
        this.scroll.refresh()
    },
    methods: {
        scrollTo(x, y, time) {
            this.scroll.scrollTo(x, y, time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        }
    }
}
</script>

<style scoped>

</style>