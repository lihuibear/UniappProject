'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	// 获取客户端上传的参数
	const { phone, password } = event;

	// 检查输入的参数
	if (!phone || !password) {
		return {
			success: false,
			message: '手机号和密码不能为空'
		};
	}

	try {
		// 在数据库中查找用户
		const userRes = await db.collection('users')
			.where({ phone: phone })  // 根据手机号查找
			.get();

		// 检查用户是否存在
		if (userRes.data.length === 0) {
			return {
				success: false,
				message: '用户不存在'
			};
		}

		const user = userRes.data[0];

		// 验证密码（这里假设密码是明文存储，实际应用中应使用加密存储）
		if (user.password !== password) {
			return {
				success: false,
				message: '密码错误'
			};
		}

		// 登录成功，返回用户信息（可以选择返回 token 或其他信息）
		return {
			success: true,
			message: '登录成功',
			userInfo: {
				id: user._id,
				phone: user.phone,
				// 可以添加更多用户信息
			}
		};
	} catch (error) {
		console.error('登录过程中发生错误:', error);
		return {
			success: false,
			message: '登录失败，请稍后再试'
		};
	}
};
