<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="(item, index) in list" 
                            :key="index"
                            :itemInfo="item"/>
        </scroll>
    </div> 
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from '../../../components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'

export default {
    name: "CartList",
    computed: {
        ...mapGetters({
            list: 'cartList'
        })
    },
    components: {
        Scroll,
        CartListItem 
    },
    updated() {
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart-list {
    height: calc(100% - 44px);
}

.content {
    height: calc(100% - 44px - 45px);
    overflow: hidden;
}
</style>