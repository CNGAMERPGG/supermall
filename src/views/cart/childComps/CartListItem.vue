<template>
    <div class="cart-list-item">
        <div class="item-selector">
            <check-button :isChecked="itemInfo.checked" 
            @click.native="checkClick"/>
        </div>
        <div class="item-img">
            <img :src="itemInfo.image" alt="商品图片">
        </div>
        <div class="item-info">
            <div class="item-title">{{itemInfo.title}}</div>
            <div class="item-desc">{{itemInfo.desc}}</div>
            <div class="info-bottom">
                <div class="item-price left">￥{{itemInfo.price}}</div>
                <div class="item-count right">×{{itemInfo.count}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
    name: "CartListItem",
    props: {
        itemInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        CheckButton,
    },
    methods: {
        checkClick() {
            this.itemInfo.checked = !this.itemInfo.checked
        }
    }
}
</script>

<style lang="less" scoped>
    .cart-list-item {
        width: 100%;
        display: flex;
        font-size: 0;
        padding: 5px;
        border-bottom: 2.5px solid #ccc;
    }

    .item-selector {
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-title, .item-desc {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .item-img {
        padding: 5px;
    }

    .item-img img {
        width: 80px;
        height: 100px;
        display: block;
        border-radius: 5px;
    }

    .item-info {
        font-size: 17px;
        color: #333;
        padding: 5px 10px;
        position: relative;
        overflow: hidden;
        .item-title {
            font-size: 16px;
        }
        .item-desc {
            font-size: 10px;
            margin-top: 10px;
            color: rgb(107, 105, 105);
        }
    }

    .item-info .item-desc {
        width: 100%;
        display: flex;
        padding: 5px;
        // border-bottom: 1px solid #ccc;
    }

    .info-bottom {
        margin-top: 10px;
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
    }

    .item-price {
        color: rgb(255, 94, 0);
    }
</style>