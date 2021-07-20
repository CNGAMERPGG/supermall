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
        if (this.probeType === 2 || this.probeType === 3){
            this.scroll.on('scroll', (position) => {
                this.$emit('scroll', position)
            })
        }
        

        // // 3.监听上拉事件
        // this.scroll.on('pullingUp', () => {
        //     // console.log('上拉加载更多');
        //     this.$emit('pullingUp')
        // })

        // 3.监听scroll滚动到底部
        if (this.pullUpLoad) {
            this.scroll.on('pullingUp', () => {
                // console.log('buttom');
                this.$emit('pullingUp')
            })
        }

    },
    updated() {
        // 有其他解决方法
        // // 刷新一下这个scroll才能正常使用
        // this.scroll.refresh()
    },
    methods: {
        scrollTo(x, y, time) {
            this.scroll.scrollTo(x, y, time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh() {
            // console.log('----');
            this.scroll && this.scroll.refresh()
        }
    }
}
</script>

<style scoped>

</style>