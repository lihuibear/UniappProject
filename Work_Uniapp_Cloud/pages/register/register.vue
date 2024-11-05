<template>
  <view class="register-container">
    <view class="register-form">
      <text class="register-title">注册</text>
      <view class="input">
        <uni-easyinput
            v-model="phone"
            placeholder="请输入手机号"
            class="input-field"
            type="text"
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
      <view class="input">
        <uni-easyinput
            v-model="repassword"
            placeholder="请再次输入密码"
            class="input-field"
            type="password"
        />
      </view>
      <view class="input">
        <uni-easyinput
            v-model="inviteCode"
            placeholder="请输入邀请码"
            class="input-field"
            type="text"
        />
      </view>
      <button @click="register" type="default" class="register-button" style="background-color: skyblue;">注册</button>
      <view class="login-link">
        <text @click="goToLogin">已有账号？点击登录</text>
      </view>
    </view>
  </view>
</template>

<script>
import md5 from "../../utils/md5.min.js"
export default {
  data() {
    return {
      phone: '',          // 存储手机号
      password: '',       // 存储密码
      repassword: '',     // 存储确认密码
      inviteCode: '' // 邀请码
    };
  },
  methods: {
    register() {
      // 检查输入的参数
      if (!this.phone || !this.password || !this.repassword) {
        uni.showToast({
          title: '手机号、密码和确认密码不能为空',
          icon: 'none'
        });
        return;
      }
	  if(this.password.length<8){
		 uni.showToast({
		   title: '密码长度必须大于等于8位',
		   icon: 'none'
		 });
		 return; 
	  }

      if (this.password !== this.repassword) {
        uni.showToast({
          title: '密码和确认密码不一致',
          icon: 'none'
        });
        return;
      }
	  const md5password =md5(this.password)
	  
      // 调用注册的云函数
      uniCloud.callFunction({
        name: "registerFunction",
        data: {
          phone: this.phone,
          password:md5password,
          inviteCode: this.inviteCode
        }
      }).then(res => {
        if (res.result.success) {
          uni.showToast({
            title: '注册成功',
            icon: 'success'
          });
          // 注册成功后可以进行页面跳转或其他操作
          uni.navigateTo({
            url: '/pages/login/login'
          });
        } else {
          uni.showToast({
            title: res.result.message || '注册失败',
            icon: 'none'
          });
        }
      }).catch(err => {
        console.error('注册请求失败:', err);
        uni.showToast({
          title: '注册请求失败，请稍后再试',
          icon: 'none'
        });
      });
    },
    goToLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    }
  }
}
</script>

<style lang="scss">
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.register-form {
  width: 80%;
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.register-title {
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

.register-button {
  width: 100%;

}

.login-link {
  margin-top: 15px;
  text-align: center;
  color: #007AFF;
  cursor: pointer;
}

.input {
  height: 110rpx;
}
</style>
