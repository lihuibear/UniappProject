<template>
    <view class="container">
        <view v-for="(item,index) in items" :key="index">
			<uni-card :title="item.name" :thumbnail="item.imgSrc">
				<text class="uni-body">
					<text :class="(index%2==0) ? 'userSingular' : 'userPlural'">
						讲师：{{item.instructor}}
						课程描述：{{item.description}}
						课程时长：{{item.duration}}
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
				items: [
				{
				    name: "Python基础教程",
				    imgSrc: "/static/python.png",
				    instructor: "张三",
				    duration: "30小时",
				    description: "适合编程新手的Python入门课程"
				},
				{
				    name: "Web开发实战",
				    imgSrc: "/static/web.png",
				    instructor: "李四",
				    duration: "40小时",
				    description: "学习HTML、CSS和JavaScript进行网页开发"
				},
				{
				    name: "人工智能导论",
				    imgSrc: "/static/ai.png",
				    instructor: "王五",
				    duration: "35小时",
				    description: "初识人工智能"
				},
				{
				    name: "移动应用开发",
				    imgSrc: "/static/app.png",
				    instructor: "赵六",
				    duration: "45小时",
				    description: "学习开发iOS和Android应用"
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
