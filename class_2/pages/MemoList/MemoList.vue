<template>
  <view class="container">
    <!-- 如果没有备忘录内容，则显示提示信息 -->
    <view v-if="memos.length === 0" class="memos-message">
      <text>请编辑你的第一条备忘事件</text>
    </view>
    <view v-else>
      <view v-for="(item, index) in memos" :key="index">
        <uni-card :title="item.title" :thumbnail="imgPath + img_status[item.status]"
                  @click="cardClick(index)">
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
      imgPath: "/static/images/",
      img_status: ["Not-started.png", "in-progress.png", "complete.png"],
      memos: [],
    };
  },
  methods: {
    cardClick(index) {
      uni.navigateTo({
        url: `/pages/MemoEdit/MemoEdit?funcode=1&index=${index}`,
      });
    },
    onclick() {
      uni.navigateTo({
        url: "/pages/MemoEdit/MemoEdit?funcode=0",
      });
    },
    onLoad() {
      this.getData();
    },
    getData() {
      this.memos = getTheStorage("memoList") || [];
      this.memos.forEach((item) => {
        item.time = parseTime(item.time);
        item.lastModifiedTime = parseTime(item.lastModifiedTime);
      });
    },
    getMemoSubtitle(item) {
      return item.lastModifiedTime && item.lastModifiedTime !== item.time
        ? `创建时间: ${item.time} 最后修改时间: ${item.lastModifiedTime}`
        : `创建时间: ${item.time}`;
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
.memos-message {
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
