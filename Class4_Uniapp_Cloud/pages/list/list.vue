<template>
  <view class="container">
    <view v-for="(item,index) in items" :key="index">
      <view>
        <uni-card :title="item.title" :sub-title="item.time" :thumbnail="imgPath+img_status[item.status]"
                  @click="cardClick(index)">
          <text> {{ item.content }}</text>
        </uni-card>
      </view>
    </view>
    <uni-fab horizontal="right" vertical="bottom" @fabClick="onclick"></uni-fab>
  </view>
</template>

<script>
import {parseTime} from "@/utils/tool.js"
import {getTheStorage} from "@/utils/common.js"

export default {
  data() {
    return {
      detail_titles: ['新建备忘录', '修改备忘录'],
      funcode: 0,
      noteIndex: -1,
      imgPath: "/static/images/",
      img_status: ["Not-started.png", "in-progress.png", "complete.png"],
      items: [],
	  /*
      items: [{
        title: "备忘录1",
        status: 0,
        content: "后天要做完作业",
        time: parseTime(Date.now())
      },
        {
          title: "备忘录2",
          status: 1,
          content: "今天要做完作业",
          time: parseTime(Date.now())
        },
        {
          title: "备忘录3",
          status: 2,
          content: "昨天要做完作业",
          time: parseTime(Date.now())
        }
      ]
	  */
    };
  },
  methods: {
	cardClick(index) {
	    uni.navigateTo({
			url: "/pages/detail/detail?funcode=1&&id=" + this.items[index]._id
		})
	},
    // cardClick(index) {
    //   uni.navigateTo({
    //     url: "/pages/detail/detail?funcode=1&&index=" + index
    //   })
    // },
    onLoad() {
      this.getData()
    },
    onclick() {
      uni.navigateTo({
        url: "/pages/detail/detail?funcode=0"
      })
    },
getData() {
	uniCloud.callFunction({
		name: "CloudGetData",
		data: {
			type:'all',   //要求返回全部备忘录
			id:"000"      //当type为'all'时候，id无意义
		}
	}).then(res => {
		console.log(res)
		this.items = res.result.data
		for (let index in this.items) {  //for循环每次获得index
			if (!this.items[index].time) {  //但创建时间为空时
				this.items[index].time = Date.now()
			}
			this.items[index].time =  parseTime(this.items[index].time)
		}
	})
}
  }
}
</script>

<style lang="scss" scoped>
/deep/ .uni-card .uni-card__header .uni-card__header-content.uni-card__header-content-title {
  font-size: 38rpx;
  font-weight: bold;
}

.container {
  padding: 20rpx;
  font-size: 30rpx;
  line-height: 32rpx;
}
</style>
