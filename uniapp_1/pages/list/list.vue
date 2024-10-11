<template>
    <view class="container">
        <view v-for="(item,index) in items" :key="index">
			<uni-card :title="item.name" :sub-title="item.subTitle" :thumbnail="item.imgSrc">
				<text class="uni-body">
					<text :class="(index%2==0) ? 'userSingular' : 'userPlural'">
						{{item.body}}
					</text>
				</text>
			</uni-card>      
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				items: [{
						name: "Lucy",
						imgSrc: "/static/c1.png",
						subTitle: "c1",
						body: "这里是Lucy的一些信息"
					},
					{
						name: "Tom",
						imgSrc: "/static/c2.png",
						subTitle: "c2",
						body: "这里是Tom的一些信息"
					},
					{
						name: "Jack",
						imgSrc: "/static/c3.png",
						subTitle: "c3",
						body: "这里是Jack的一些信息"
					},
					{
						name: "John",
						imgSrc: "/static/c4.png",
						subTitle: "c4",
						body: "这里是John的一些信息"
					},
					{
						name: "Mary",
						imgSrc: "/static/c5.png",
						subTitle: "c5",
						body: "这里是Mary的一些信息"
					}
				]
			};
		}
	}
</script>


<style lang="scss">
	.container {
		padding: 20rpx;
		font-size: 30rpx;
		line-height: 54rpx;
	}
	.uni-body{
		font-size: 32rpx;
	}
	.userSingular{
		color: blue;
	}
	.userPlural{
		color: orchid;
	}

</style>
