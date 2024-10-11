<template>
  <view class="settings-container">
    <view class="settings-group">
      <view class="settings-title">账户设置</view>
      <view class="settings-item">
        <text>修改密码</text>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
      <view class="settings-item">
        <text>绑定手机号</text>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
    </view>

    <view class="settings-group">
      <view class="settings-title">通知设置</view>
      <view class="settings-item">
        <text>推送通知</text>
        <switch checked color="#007AFF" />
      </view>
      <view class="settings-item">
        <text>邮件通知</text>
        <switch color="#007AFF" />
      </view>
    </view>

    <view class="settings-group">
      <view class="settings-title">其他设置</view>
      <view class="settings-item">
        <text>清除缓存</text>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
      <view class="settings-item">
        <text>关于我们</text>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
  
}
</script>

<style lang="scss">
.settings-container {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.settings-group {
  background-color: #ffffff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  padding: 0 20rpx;
}

.settings-title {
  font-size: 28rpx;
  color: #888;
  padding: 20rpx 0;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-top: 1rpx solid #eee;

  text {
    font-size: 30rpx;
    color: #333;
  }
}

.logout-btn {
  margin-top: 40rpx;
  background-color: #ff3b30;
  color: #ffffff;
}
</style>
