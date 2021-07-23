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