<template>
  <view class="login-container">
    <view class="login-form">
      <image :src="imageSrc" class="logo" mode="aspectFit"></image>
      
	  <text class="login-title">登录</text>
      
	  <view class="input">
        <uni-easyinput
            v-model="phone"
            placeholder="请输入手机号"
            class="input-field"
        />
      </view>

      <view class="input">
        <uni-easyinput
            v-model="password"
            placeholder="请输入密码"
            class="input-field"
            type="password"
        />
      </view>

      <button style="background-color: skyblue;" class="login-button" @click="login" type="default">登录</button>

      <view class="register-link">
        <text @click="goToRegister">还没有账号？点击注册</text>
      </view>
	  <view class="admin-link">
	  	<text @click="goToAdmin">忘记密码？联系站长</text>
	  </view>
    </view>
  </view>
</template>

<script>
import md5 from "../../utils/md5.min.js"
let myurl  = 'https://lihuibear.cn'
export default {
  data() {
    return {
      phone: '',      // 存储手机号
      password: '',   // 存储密码
      imageSrc: '/static/images/beiwanglu.png' // 存储图片路径
    };
  },
  methods: {
    login() {
      if (!this.phone || !this.password) {
        uni.showToast({
          title: '请输入手机号和密码',
          icon: 'none'
        });
        return;
      }

      console.log(this.phone, "Phone");
      const md5password = md5(this.password);
      uniCloud.callFunction({
        name: "loginFunction",
        data: {
          phone: this.phone,
          password: md5password
        }
      }).then(res => {
        if (res.result.success) {
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          });
          // 登录成功后保存手机号到本地存储
          uni.setStorageSync('userPhone', this.phone);
          // 跳转到备忘录页面
          uni.navigateTo({
            url: '/pages/list/list'
          });
        } else {
          uni.showToast({
            title: res.result.message || '登录失败',
            icon: 'none'
          });
        }
      }).catch(err => {
        console.error('登录请求失败:', err);
        uni.showToast({
          title: '登录请求失败: ' + err.message,
          icon: 'none'
        });
      });
    },
    goToRegister() {
      uni.navigateTo({
        url: '/pages/register/register'
      });
    },
	
	goToAdmin() {
      uni.navigateTo({
        url:'/pages/webView/webView?url='+myurl
      });
    },
  }
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
}

.login-form {
  width: 80%;
  background: white;
  padding: 20rpx;
  border-radius: 8rpx;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}



.login-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding-left: 255rpx;
  padding-bottom: 20rpx;
}

.input-field {
  margin-bottom: 15px;
  margin-top: 20rpx;
}

.login-button {
  width: 100%;
  background-color: skyblue;
}

.register-link {
  margin-top: 15rpx;
  text-align: center;
  color: #007AFF;
  cursor: pointer;
}
.admin-link{
  margin-top: 15rpx;
  text-align: center;
  color: #007AFF;
  cursor: pointer;
}

.input {
  height: 110rpx;
}
</style>
