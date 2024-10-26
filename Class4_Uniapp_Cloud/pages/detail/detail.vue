<template>
  <view class="container">
    <uni-nav-bar rightIcon="checkmarkempty" :title="detail_titles[funcode]" @clickRight="formSubmit"/> <!-- 按钮点击事件 -->

    <uni-forms ref="form" :rules="rules" :model="noteItem">
      <uni-forms-item class="formItem" name="title" required>
        <uni-easyinput class="titleInput" v-model="noteItem.title" placeholder="输入备忘录标题..."/>
      </uni-forms-item>
      <uni-forms-item class="formItem" name="content" required>
        <uni-easyinput autoHeight type="textarea" v-model="noteItem.content" placeholder="输入备忘录内容..."/>
      </uni-forms-item>
      <view v-if="funcode==1" class="optBox">
        <image class="status-image" :src="imgPath+img_status[noteItem.status]" mode="">
        </image>
        <uni-data-select class="selecter" v-model="value" :localdata="range" @change="change">
        </uni-data-select>
      </view>
      <view  v-if="funcode==1" class="footer">
        <uni-icons type="trash" size="30" @click="delNote"></uni-icons>
      </view>

    </uni-forms>
  </view>
</template>


<script>
import {getTheStorage} from "@/utils/common.js"

export default {
  data() {
    return {
      detail_titles: ['新建备忘录', '修改备忘录'],
      funcode: 0,
      // noteIndex: -1, //注释
	  noteId: -1,
      imgPath: "/static/images/",
      img_status: ["Not-started.png", "in-progress.png", "complete.png"],
      value: 1,
      range: [{
        value: 0,
        text: "未开始"
      },
        {
          value: 1,
          text: "进行中"
        },
        {
          value: 2,
          text: "已结束"
        },
      ],
	  
	  noteItem: {
	  	id:'',   //新增，for 云函数记录
	  	title: '',
	  	time: null,
	  	content: '',
	  	status: 0 // 默认为0，未开始
	  },
      rules: { // 文本框规则
        title: {
          rules: [
            {
              required: true,
              errorMessage: "请输入备忘录标题！"
            },
            {
              maxLength: 20,
              errorMessage: "标题超过20个字符长！"
            }
          ]
        },
        content: {
          rules: [
            {
              required: true,
              errorMessage: "请输入备忘录内容！"
            },
            {
              maxLength: 200,
              errorMessage: "内容不能超过200字！"
            }
          ]
        }
      }
    };
  },
  onLoad(option) {
    this.funcode = option.funcode;
    if (!(this.funcode in [0, 1])) {
      this.funcode = 0
    }
    if (this.funcode == 1) {
      // this.noteIndex = option.index
	  this.noteId = option.id
      // this.getTheItemFormStorage()
	  this.getTheItemFromCloud() 
    }
  },
  methods: {
	setTheStorage(theType, hintMessage) {
		//写入云数据库
		try {
			uniCloud.callFunction({
				name: "CloudUpdateData",
				data: {
					type: theType,
					title: this.noteItem.title,
					content: this.noteItem.content,
					status: this.noteItem.status,
					id: this.noteItem.id
				}
			}).then(res => {
				console.log(res)
			})
	    } catch (e) {
			console.log(e)
		 }
		 uni.showToast({
			icon: "success",
			title: hintMessage,
			duration: 1500
		 })
		 setTimeout(() => {
			uni.reLaunch({
			    url: "/pages/list/list"
			})
		 }, 1500)
	},
    // setTheStorage(notes,hintMessage) {
    //   //将参数notes写入缓存
    //   try {
    //     uni.setStorageSync("noteList", notes)
    //   } catch (e) {
    //     console.log(e)
    //   }
    //   uni.showToast({
    //     icon: "success",
    //     title: hintMessage,
    //     duration: 1500
    //   })
    //   setTimeout(() => {
    //     uni.reLaunch({
    //       url: "/pages/list/list"
    //     })
    //   }, 1500)
    // },
    // formSubmit() {
    //   this.$refs.form.validate().then(() => {
    //     var hintMessage;
    //     this.noteItem.time = Date.now()
    //     let notes = getTheStorage("noteList");
    //     if (this.funcode == 0) {
    //       //新建时，在0位置删除0个记录，并插入新纪录；等同于新纪录插入最前面
    //       notes.splice(0, 0, this.noteItem); // 将当前数据插入列头
    //       hintMessage = "增加成功！";  //新增提示赋值

    //     } else {
    //       // 修改时，在index位置删除原来1条记录，并在原位置增加新记录
    //       notes.splice(this.noteIndex, 1, this.noteItem);
    //       hintMessage = "更新成功！";   //新增提示赋值

    //     }
    //     this.setTheStorage(notes, hintMessage)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
	formSubmit(){
		this.$refs.form.validate().then(() => {
			var hintMessage;
			var theType;
			this.noteItem.time = Date.now()
			if (this.funcode == 0) {
				hintMessage = "增加成功！";
				theType = 'add';
			} else {
				hintMessage = "更新成功！";
				theType = 'update';
			}
			this.setTheStorage(theType, hintMessage)
		}).catch((err) => {
			console.log(err)
		})
	},
    getTheItemFormStorage() {
      let notes = getTheStorage("noteList");
      this.noteItem.title = notes[this.noteIndex].title
      this.noteItem.content = notes[this.noteIndex].content
      this.noteItem.status = notes[this.noteIndex].status
      this.value = this.noteItem.status   //为选择器选择对应的状态
    },
    getTheItemFromCloud() { 
    	uniCloud.callFunction({
    		name: "CloudGetData",
    		data: {
    			type:'one',
    			id: this.noteId
    		}
    	}).then(res => {
    		console.log(res)
    		let notes = res.result.data;
    		this.noteItem.id = notes[0]._id  //返回只有一条记录的集合，so
    		this.noteItem.title = notes[0].title
    		this.noteItem.content = notes[0].content
    		this.noteItem.status = notes[0].status
           //为选择器选择对应的状态
    		this.value = this.noteItem.status 
    	})
    },
	delNote() {
		uni.showModal({
			content: "确定删除？",
			success: (res) => {
				if (res.confirm) {
					this.setTheStorage('delete', "删除成功！")
				}
			}
		})
	},
	// delNote() {
 //      uni.showModal({
 //        content: "确定删除？",
 //        success: (res) => {
 //          if (res.confirm) {
 //            let notes = getTheStorage("noteList");
 //            notes.splice(this.noteIndex, 1)//删除一条记录
 //            this.setTheStorage(notes)
 //          }
 //        }
 //      })
 //    },
    change(e) {
      this.noteItem.status = e
    },

  },

}
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
  padding: 20rpx 0rpx 20rpx 0rpx;
}

.status-image {
  // flex: 1;
  width: 40px;
  height: 40px;
}

.selecter {
  flex: 1;
  padding: 0rpx 0rpx 0rpx 20rpx; //上 右 下 左
}

.footer {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 50rpx;
}
</style>
