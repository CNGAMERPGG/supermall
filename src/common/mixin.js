import BackTop from "@/components/content/backTop/BackTop"

export const itemListenerMixin = {
    data() {
        return {
            itemListenerMixin: null
        }
    },
    mounted() {
        //请求数据列表后刷新
        this.itemImgLister = () => {
            this.$refs.scroll.refresh();
        }
        this.$bus.$on('itemImageLoad',this.itemImgLister);
        // console.log('mixin');
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = (-position.y) > 1000
        },
    },
    components: {
        BackTop
    }
}