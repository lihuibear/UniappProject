<template>
  <view class="container">
    <view v-for="(item, index) in items" :key="index" class="card-wrapper">
      <uni-card :title="item.name" :extra="item.gender" :thumbnail="item.imgSrc" class="custom-card">
        <view class="card-content">
          <view class="info-item">
            <uni-icons type="phone-filled" size="18" color="#007AFF"></uni-icons>
            <text class="info-text">{{item.tel}}</text>
          </view>
        </view>
      </uni-card>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [{
        name: "李慧",
        imgSrc: "/static/zp.jpg",
        tel: "13191796473",
        gender: "男"
      },
      // 可以添加更多项目
      ]
    };
  }
}
</script>

<style lang="scss">
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.card-wrapper {
  margin-bottom: 20rpx;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5rpx);
  }
}

.custom-card {
  border-radius: 15rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 10rpx 0;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.info-text {
  font-size: 26rpx;
  color: #333;
  margin-left: 10rpx;
}

::v-deep .uni-card__header {
  padding: 15rpx 20rpx;
}

::v-deep .uni-card__header-content-title {
  font-size: 32rpx;
  font-weight: bold;
}

::v-deep .uni-card__header-extra-text {
  font-size: 24rpx;
  color: #666;
}

::v-deep .uni-card__content {
  padding: 15rpx 20rpx;
}

::v-deep .uni-card__header-avatar {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
}
</style>
