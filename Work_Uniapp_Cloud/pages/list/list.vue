<template>
  <view class="container">
    <view v-for="(item, index) in items" :key="index">
      <view>
        <uni-card :title="item.title" 
		:sub-title="'创建时间: ' + item.creationTime" 
                  :thumbnail="imgPath + img_status[item.status]"
                  @click="cardClick(index)">
          <text>保存时间: {{ item.saveTime }}</text><br>
		   <text>{{ item.content }}</text><br>
        </uni-card>
      </view>
    </view>
    <uni-fab horizontal="right" vertical="bottom" @fabClick="onclick"></uni-fab>
    <button class="logout-button" @click="logout">退出登录</button>
  </view>
</template>

<script>
import { parseTime } from "@/utils/tool.js";

export default {
  data() {
    return {
      detail_titles: ['新建备忘录', '修改备忘录'],
      funcode: 0,
      noteIndex: -1,
      imgPath: "/static/images/",
      img_status: ["Not-started.png", "in-progress.png", "complete.png"],
      items: []
    };
  },
  methods: {
    cardClick(index) {
      uni.navigateTo({
        url: "/pages/detail/detail?funcode=1&&id=" + this.items[index]._id
      });
    },
    onclick() {
      const userPhone = uni.getStorageSync('userPhone'); // 从存储中获取手机号
      uni.navigateTo({
        url: `/pages/detail/detail?funcode=0&phone=${userPhone}` // 传递手机号
      });
    },
    logout() {
      uni.navigateTo({
        url: "/pages/login/login"
      });
      uni.clearStorage();
      wx.showToast({
        title: '用户已退出登录',
        icon: 'success',
        duration: 2000 // 持续的时间
      });
      console.log("用户已退出登录");
    },
    onLoad() {
      this.getData();
    },
    getData() {
      const userPhone = uni.getStorageSync('userPhone'); // 从存储中获取手机号
      uniCloud.callFunction({
        name: "CloudGetData",
        data: {
          type: 'all',
          id: "000",
          phone: userPhone
        }
      }).then(res => {
        if (res.result && res.result.data) {
          this.items = res.result.data;
          this.items.forEach(item => {
            if (!item.time) {
              item.time = Date.now();
            }
            // 设置创建时间和保存时间
            item.creationTime = parseTime(item.creationTime || Date.now()); // 使用现有时间或当前时间
            item.saveTime = parseTime(item.saveTime || Date.now()); // 使用现有时间或当前时间
          });
        } else {
          console.error("未返回数据");
        }
      }).catch(err => {
        console.error("获取数据时出错:", err);
      });
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

.logout-button {
  position: fixed; /* 使用 fixed 使按钮浮动 */
  left: 20rpx;
  bottom: 70rpx;
  z-index: 1000; /* 确保按钮在其他元素之上 */
}
</style>
