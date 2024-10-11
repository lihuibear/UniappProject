<template>
  <view class="container">
    <view class="user-info">
      <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
      <text class="username">{{userInfo.name}}</text>
    </view>
    
    <uni-list>
      <uni-list-item v-for="(item, index) in menuItems" :key="index"
        :title="item.title"
        :rightText="item.rightText"
        link
        :to="item.path"
      >
        <template v-slot:icon>
          <uni-icons :type="item.icon" size="20" color="#999"></uni-icons>
        </template>
      </uni-list-item>
    </uni-list>
    
    <button class="logout-btn" @click="logout">退出登录</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "李慧",
        avatar: "/static/zp.jpg"
      },
      menuItems: [
        { title: "个人信息", path: "/pages/user/profile" },
        { title: "设置", path: "/pages/user/settings" }
      ]
    };
  },
  methods: {
    navigateTo(path) {
      uni.navigateTo({
        url: path
      });
    },
    logout() {
      // 实现退出登录的逻辑
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            //退出登录的具体实现
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 20rpx;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
}

.avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 75rpx;
  margin-bottom: 20rpx;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
}

.logout-btn {
  margin-top: 40rpx;
  background-color: #f56c6c;
  color: #ffffff;
}
</style>
