<template>
  <view class="container">
    <view class="header">
      <text class="title">慧学程序员学习平台</text>
    </view>
    
    <view class="content">
      <view class="intro-card">
        <text class="intro-text">这是一个用来展示移动端开发第一章的小demo</text>
      </view>
      
      <view class="module-list">
        <text class="module-title">本项目分为三个模块：</text>
        
        <view class="module-item">
          
          <view class="module-info">
            <text class="module-name">主页</text>
            <text class="module-desc">主要介绍本demo的页面及用途</text>
          </view>
        </view>
        
        <view class="module-item">
          
          <view class="module-info">
            <text class="module-name">课程学习</text>
            <text class="module-desc">使用v-for循环单元，通过样式布局平均分配页面</text>
          </view>
        </view>
        
        <view class="module-item">
          
          <view class="module-info">
            <text class="module-name">个人中心</text>
            <text class="module-desc">包括个人信息、设置、退出登录等功能</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.container {
  padding: 40rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  margin-bottom: 40rpx;
  
  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
  }
}

.content {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.intro-card {
  background-color: #e6f7ff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
  
  .intro-text {
    font-size: 28rpx;
    color: #0066cc;
    line-height: 1.5;
  }
}

.module-list {
  .module-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .module-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30rpx;
    .module-info {
      flex: 1;
      
      .module-name {
        font-size: 28rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 6rpx;
      }
      
      .module-desc {
        font-size: 24rpx;
        color: #666;
        line-height: 1.4;
      }
    }
  }
}
</style>
