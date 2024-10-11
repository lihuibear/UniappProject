<template>
  <view class="container">
    <uni-nav-bar rightIcon="checkmarkempty" :title="detail_titles[funcode]" @clickRight="formSubmit" />
    <uni-forms ref="form" :rules="rules" :model="memoItem">
      <uni-forms-item class="formItem" name="title" required>
        <uni-easyinput class="titleInput" v-model="memoItem.title" placeholder="输入备忘录标题..." />
      </uni-forms-item>
      <uni-forms-item class="formItem" name="content" required>
        <uni-easyinput autoHeight type="textarea" v-model="memoItem.content" placeholder="输入备忘录内容..." />
      </uni-forms-item>
      <view v-if="funcode == 1" class="optBox">
        <image class="status-image" :src="imgPath + img_status[memoItem.status]" mode="" />
        <uni-data-select class="selecter" v-model="value" :localdata="range" @change="change" />
      </view>
      <view v-if="funcode == 1" class="footer">
        <uni-icons type="trash" size="30" @click="delMemo"></uni-icons>
      </view>
    </uni-forms>
  </view>
</template>

<script>
import { getTheStorage } from "@/utils/common.js";

export default {
  data() {
    return {
      detail_titles: ['新建备忘录', '修改备忘录'],
      funcode: 0,
      memoIndex: -1,
      imgPath: "/static/images/",
      img_status: ["Not-started.png", "in-progress.png", "complete.png"],
      value: 1,
      range: [
        { value: 0, text: "未开始" },
        { value: 1, text: "进行中" },
        { value: 2, text: "已结束" },
      ],
      memoItem: {
        title: '',
        content: '',
        status: 0,
        time: null,
        lastModifiedTime: null,
      },
      rules: {
        title: {
          rules: [
            { required: true, errorMessage: "请输入备忘录标题！" },
            { maxLength: 20, errorMessage: "标题超过20个字符长！" }
          ]
        },
        content: {
          rules: [
            { required: true, errorMessage: "请输入备忘录内容！" },
            { maxLength: 200, errorMessage: "内容不能超过200字！" }
          ]
        }
      }
    };
  },
  onLoad(option) {
    this.funcode = option.funcode;
    if (this.funcode === "1") {
      this.memoIndex = option.index;
      this.getMemoFromStorage();
    }
  },
  methods: {
    setTheStorage(memos, hintMessage) {
      uni.setStorageSync("memoList", memos);
      uni.showToast({
        icon: "success",
        title: hintMessage,
        duration: 1500
      });
      setTimeout(() => {
        uni.reLaunch({ url: "/pages/MemoList/MemoList" });
      }, 1500);
    },
    formSubmit() {
      this.$refs.form.validate().then(() => {
        this.memoItem.lastModifiedTime = Date.now(); // 更新最后修改时间
        let memos = getTheStorage("memoList") || [];
        if (this.funcode === "0") {
          this.memoItem.time = this.memoItem.lastModifiedTime; // 创建时间等于最后修改时间
          memos.unshift(this.memoItem);
          this.setTheStorage(memos, "增加成功！");
        } else {
          memos.splice(this.memoIndex, 1, this.memoItem);
          this.setTheStorage(memos, "更新成功！");
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    getMemoFromStorage() {
      let memos = getTheStorage("memoList");
      this.memoItem.title = memos[this.memoIndex].title;
      this.memoItem.content = memos[this.memoIndex].content;
      this.memoItem.status = memos[this.memoIndex].status;
      this.memoItem.time = memos[this.memoIndex].time;
      this.memoItem.lastModifiedTime = memos[this.memoIndex].lastModifiedTime;
      this.value = this.memoItem.status;
    },
    delMemo() {
      uni.showModal({
        content: "确定删除？",
        success: (res) => {
          if (res.confirm) {
            let memos = getTheStorage("memoList");
            memos.splice(this.memoIndex, 1);
            this.setTheStorage(memos, "删除成功！");
          }
        }
      });
    },
    change(e) {
      this.memoItem.status = e;
    }
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
.optBox {
  display: flex;
  padding: 20rpx 0;
}
.status-image {
  width: 40px;
  height: 40px;
}
.selecter {
  flex: 1;
  padding: 0 20rpx;
}
.footer {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 50rpx;
}
</style>
