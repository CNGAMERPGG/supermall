<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button"/>
            <span>全选</span>
        </div>
        <div class="totalPrice">
            合计:{{totalPrice}}
        </div>

        <div class="calculate">
            去计算({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'

import {mapGetters} from 'vuex'

export default {
    name: "CartBottomBar",
    components: { 
        CheckButton 
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice() {
            return '￥' + this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + parseInt(item.price) * item.count
            }, 0)
        },
        checkLength() {
            return this.cartList.filter(item => item.checked).length
        }
    }

}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    bottom: 90px;
    line-height: 40px;

    position: relative;
    display: flex;

    background-color: #eee;
    font-size: 16px;
}

.check-content {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    /* position: relative; */
    /* top: 10px; */
    width: 75px;
}

.check-button {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-left: 10px;
    margin-right: 5px;
    /* line-height: 22px; */
}

.totalPrice {
    margin-left: 30px;
    flex: 1;
}

.calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
}
</style>