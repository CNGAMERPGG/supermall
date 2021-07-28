<template>
    <div class="cart-list">
        <scroll class="content">
            <cart-list-item v-for="(item, index) in list" 
                            :key="index"
                            :product="item"/>
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
}
</script>

<style scoped>
.cart-list {
    height: calc(100% - 44px);
}

.content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
}
</style>