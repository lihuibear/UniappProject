'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {type,title,content,status,id} = event
	let res;
	let data = {
		'title': title,
		'time': Date.now(),
		'content': content,
		'status': status
	}
	if (type == 'add') {
		res = await db.collection("notes").add(data);
	} else if (type == 'update') {
		res = await db.collection("notes").doc(id).update(data)
	} else if (type == 'delete') {
		res = await db.collection("notes").doc(id).remove()
	}

	return res;
};
