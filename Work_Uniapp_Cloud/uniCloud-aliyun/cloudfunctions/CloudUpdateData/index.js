'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	let { type, title, content, status, id, phone, creationTime } = event; // 添加 creationTime 到参数中
	let res;
	let data = {
		'title': title,
		'content': content,
		'status': status,
		'phone': phone // 将 phone 存储到数据库
	};

	if (type === 'add') {
		data.creationTime = Date.now(); // 在添加时设置 creationTime
		data.saveTime = Date.now(); // 在添加时也设置 saveTime
		res = await db.collection("worknotes").add(data);
	} else if (type === 'update') {
		data.saveTime = Date.now(); // 在更新时设置 saveTime
		// 如果需要保留 creationTime，可以在这里传递
		if (creationTime) {
			data.creationTime = creationTime; // 使用传入的 creationTime 值
		}
		res = await db.collection("worknotes").doc(id).update(data);
	} else if (type === 'delete') {
		res = await db.collection("worknotes").doc(id).remove();
	}

	return res;
};
