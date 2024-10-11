export function getTheStorage(key) {
	var notes;
	try {
		const value = uni.getStorageSync(key)
		if (value) {
			notes = value
		} else {
			notes = []
		}
	} catch (e) {
		notes = []
	}
	return notes;
}