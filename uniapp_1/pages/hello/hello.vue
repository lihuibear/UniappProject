<template>
	<view>
		<view style="text-align: center;">
			<image class="mylogo" :src="myLogo"  mode="aspectFit"></image>
		</view>
	
		<view class="nameWord">
			<p>i am lihuibear ,你好 {{name}}</p>
		</view>	
	
	</view>

</template>

<script>
	export default {
		data() {
			return {
				name:"石家庄学院",
				myLogo: "/static/uni.png" //新增图片路径

			};
		}
	}
</script>

<style lang="scss">
	.nameWord {
		font-size: 50rpx;
		color: rgb(30,111,255); //使用截图工具，获取任意颜色设置
		text-align: center;
	}
	.mylogo {
		width: 60px;
		height: 60px;
		margin: 10px;
	}


</style>
