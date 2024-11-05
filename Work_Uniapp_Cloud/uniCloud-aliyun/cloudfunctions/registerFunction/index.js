'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
    const { phone, password, inviteCode } = event;

    // 验证邀请码
    if (inviteCode !== 'lihui') {
        return {
            success: false,
            message: '邀请码无效'
        };
    }

    // 验证手机号格式
    const phoneRegex = /^[1][3-9][0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        return {
            success: false,
            message: '手机号格式不正确'
        };
    }

    // 检查手机号是否已经注册
    const existingUser = await db.collection('users').where({ phone }).get();
    if (existingUser.data.length > 0) {
        return {
            success: false,
            message: '手机号已被注册'
        };
    }

    // 密码强度检查（可以根据需求进行调整）
    if (password.length < 6) {
        return {
            success: false,
            message: '密码长度至少为6个字符'
        };
    }

    // 将用户信息存储到数据库
    try {
        await db.collection('users').add({
            phone,
            password, 
            inviteCode,
            createdAt: new Date() // 记录创建时间
        });
		

        return {
            success: true,
            message: '注册成功'
        };
    } catch (error) {
        console.error('数据库操作失败:', error);
        return {
            success: false,
            message: '注册失败，请稍后再试'
        };
    }
};
