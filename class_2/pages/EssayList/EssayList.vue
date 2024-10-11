<template>
  <view class="container">
    <!-- 如果没有随笔内容，则显示提示信息 -->
    <view v-if="essays.length === 0" class="empty-message">
      <text>请编辑你的第一条随笔</text>
    </view>

    <!-- 如果有随笔内容，则显示随笔列表 -->
    <view v-else>
      <view v-for="(item, index) in essays" :key="index">
        <uni-card :title="item.title" @click="cardClick(index)">
		<text>{{ item.content }}</text>
          <view class="subtitle">
            <text>创建时间: {{ item.time }}</text>
            <text v-if="item.lastModifiedTime && item.lastModifiedTime !== item.time">
              最后修改时间: {{ item.lastModifiedTime }}
            </text>
          </view>
        </uni-card>
      </view>
    </view>

    <uni-fab horizontal="right" vertical="bottom" @fabClick="onclick"></uni-fab>
  </view>
</template>

<script>
import { parseTime } from "@/utils/tool.js";
import { getTheStorage } from "@/utils/common.js";

export default {
  data() {
    return {
      essays: [],
    };
  },
  methods: {
    cardClick(index) {
      uni.navigateTo({
        url: `/pages/EssayEdit/EssayEdit?funcode=1&index=${index}`,
      });
    },
    onclick() {
      uni.navigateTo({
        url: "/pages/EssayEdit/EssayEdit?funcode=0",
      });
    },
    onLoad() {
      this.getData();
    },
    getData() {
      this.essays = getTheStorage("essayList") || [];
      this.essays.forEach((item) => {
        item.time = parseTime(item.time);
        item.lastModifiedTime = parseTime(item.lastModifiedTime);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  font-size: 30rpx;
  line-height: 32rpx;
}

.empty-message {
  text-align: center;
  margin-top: 50rpx;
  font-size: 28rpx;
  color: #999;
}

.subtitle {
  margin-top: 10rpx; 
  font-size: 26rpx; 
  color: #666; 
}
.subtitle text {
  display: block; 
}
</style>
