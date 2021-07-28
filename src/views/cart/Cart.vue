<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <cart-list/>
    </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'

import {mapGetters} from 'vuex'
import CartList from './childComps/CartList.vue'

export default {
    name: "Cart",
    components: { 
        NavBar,
        CartList ,
    },
    computed: {
        ...mapGetters({
            length: 'cartLength'
        })
    }

}
</script>

<style scoped>
.cart {
    height: 100vh;
}

.nav-bar {
background-color: rgb(253, 135, 135);
font-display: center;
color: #fff;
font-size: 18px;
z-index: 10;
}
</style>