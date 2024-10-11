<template>
  <view class="container">
    <uni-nav-bar rightIcon="checkmarkempty" :title="detail_titles[funcode]" @clickRight="formSubmit" />
    <uni-forms ref="form" :rules="rules" :model="essayItem">
      <uni-forms-item class="formItem" name="title" required>
        <uni-easyinput class="titleInput" v-model="essayItem.title" placeholder="输入随笔标题..." />
      </uni-forms-item>
      <uni-forms-item class="formItem" name="content" required>
        <uni-easyinput autoHeight type="textarea" v-model="essayItem.content" placeholder="输入随笔内容..." />
      </uni-forms-item>
      <view v-if="funcode == 1" class="footer">
        <uni-icons type="trash" size="30" @click="delEssay"></uni-icons>
      </view>
    </uni-forms>
  </view>
</template>

<script>
import { getTheStorage } from "@/utils/common.js";

export default {
  data() {
    return {
      detail_titles: ['新建随笔', '修改随笔'],
      funcode: 0,
      essayIndex: -1,
      essayItem: {
        title: '',
        content: '',
        time: null,
        lastModifiedTime: null, // 确保最后修改时间被定义
      },
      rules: {
        title: {
          rules: [
            { required: true, errorMessage: "请输入随笔标题！" },
            { maxLength: 20, errorMessage: "标题超过20个字符长！" }
          ]
        },
        content: {
          rules: [
            { required: true, errorMessage: "请输入随笔内容！" },
            { maxLength: 200, errorMessage: "内容不能超过200字！" }
          ]
        }
      }
    };
  },
  onLoad(option) {
    this.funcode = option.funcode;
    if (this.funcode === "1") {
      this.essayIndex = option.index;
      this.getEssayFromStorage();
    }
  },
  methods: {
    setTheStorage(essays, hintMessage) {
      uni.setStorageSync("essayList", essays);
      uni.showToast({
        icon: "success",
        title: hintMessage,
        duration: 1500
      });
      setTimeout(() => {
        uni.reLaunch({ url: "/pages/EssayList/EssayList" });
      }, 1500);
    },
    formSubmit() {
      this.$refs.form.validate().then(() => {
        this.essayItem.lastModifiedTime = Date.now(); // 更新最后修改时间
        let essays = getTheStorage("essayList") || [];
        if (this.funcode === "0") {
          this.essayItem.time = this.essayItem.lastModifiedTime; // 创建时间等于最后修改时间
          essays.unshift(this.essayItem);
          this.setTheStorage(essays, "增加成功！");
        } else {
          essays.splice(this.essayIndex, 1, this.essayItem); // 使用正确的索引更新随笔
          this.setTheStorage(essays, "更新成功！");
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    getEssayFromStorage() {
      let essays = getTheStorage("essayList");
      if (essays && essays.length > this.essayIndex) { // 检查索引是否有效
        this.essayItem.title = essays[this.essayIndex].title; // 使用正确的索引
        this.essayItem.content = essays[this.essayIndex].content;
        this.essayItem.time = essays[this.essayIndex].time;
        this.essayItem.lastModifiedTime = essays[this.essayIndex].lastModifiedTime; // 获取最后修改时间
      }
    },
    delEssay() {
      uni.showModal({
        content: "确定删除？",
        success: (res) => {
          if (res.confirm) {
            let essays = getTheStorage("essayList");
            if (essays) {
              essays.splice(this.essayIndex, 1); // 使用正确的索引删除随笔
              this.setTheStorage(essays, "删除成功！");
            }
          }
        }
      });
    },
  }
};
</script>

<style lang="scss">
.container {
  padding: 20rpx;
  font-size: 30rpx;
  line-height: 32rpx;
}
.formItem {
  margin: 10rpx 20rpx;
}
.footer {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 50rpx;
}
</style>
