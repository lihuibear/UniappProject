'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	let { type, id, phone } = event; // 增加 phone
	let res;

	if (type === 'all') {
		if (phone) { // 如果提供了 phone，则根据 phone 查询
			res = await db.collection("worknotes")
				.where({ phone: phone }) // 根据 phone 过滤
				.orderBy("time", "desc")
				.get();
		} else {
			res = await db.collection("worknotes").orderBy("time", "desc").get();
		}
	} else {
		res = await db.collection("worknotes").doc(id).get();
	}
	
	return res;
};
