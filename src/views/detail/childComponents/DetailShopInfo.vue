<template>
	<div class="detail-shop-info" v-if="Object.keys(shop).length !== 0">
		<div class="flex shop-name-info">
			<img :src="shop.shopLogo" alt="" class="shop-img">
			<div>{{shop.name}}</div>
		</div>
		<div class="flex shop-other-info">
			<div class="flex shop-other-item shop-other-sell">
				<div>
					<p class="f16">{{shop.cSells|saveNum}}</p>
					<p>总销量</p>
				</div>
				<div>
					<p class="f16">{{shop.cGoods}}</p>
					<p>全部宝贝</p>
				</div>
			</div>
			<div class=" border"></div>
			<div class="shop-other-item shop-other-right">
				<div v-for="(item, index) in shop.score" :key="index">
					{{item.name}}&ensp;
					<span class="score" :class="{active:item.isBetter}">{{item.score}}</span>
					<span class="score-bg" :class="{active:item.isBetter}">{{item.isBetter? '低' : '高'}}</span>
				</div>
			</div>
		</div>
		<div class="enter-shop-wrap">
			<div class="enter-shop">进店逛逛</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailShopInfo',
		props: {
			shop: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				
			}
		},
		filters: {
			saveNum(value){
				if(value < 10000) return value;
				return (value/10000).toFixed(1)+'万'
			}
		}
	}
</script>

<style lang="less" scoped>
	.f16 {
		font-size: 16px;
	}
	.detail-shop-info {
		border-bottom: 4px solid #ededed;
	}
	.shop-name-info {
        display: flex;
		align-items: center;
		margin: 20px 10px;
		.shop-img {
            border: 1px solid rgb(201, 201, 201);
			border-radius: 100%;
			width: 50px;
			height: 50px;
			margin-right: 10px;
			vertical-align: middle;
		}
	}
	.shop-other-info {
        display: flex;
		flex: 1;
		font-size: 12px;
		align-items: center;
		line-height: 22px;
		.shop-other-item {
			flex: 1;
		}
		.shop-other-sell {
            display: flex;
            flex: 1;
            font-weight: bolder;
			// border-right: 1px solid #ececec;
			padding-left: 3.8vh;
			padding-right: 3.8vh;
			div{
				flex: 1;
				text-align: center;
			}
		}
		.border {
			display: flex;
			width: 1px;
			height: 50px;
			border-right: 1px solid #ececec;
		}
		.shop-other-right {
			// padding-left: 10px;
			// margin-left: 40px;
			padding-left: 3.8vh;
			padding-right: 3.8vh;
			.score {
				display: inline-block;
				width: 30px;
				color: #006666;
				&.active{
					color: #880000;
				}
			}
			.score-bg {
				background-color: #006666;
				color: #fff;
				padding: 1px 4px;
				font-size: 12px;
				&.active{
					background-color: #880000;
				}
			}
		}
	}
	.enter-shop-wrap{
		text-align: center;
		.enter-shop {
			display: inline-block;
			background-color: #f2f2f2;
			font-size: 12px;
			padding: 6px 30px;
			border-radius: 100px;
			margin: 10px;
		}
	}
	
</style>
