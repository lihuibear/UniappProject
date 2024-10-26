'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	let { type, id} = event
	let res;
	if (type == 'all'){
		res = await db.collection("notes").orderBy(
                                      "time","desc").get();
	}else{
		res = await db.collection("notes").doc(id).get()
	}
	
	return res;
};
