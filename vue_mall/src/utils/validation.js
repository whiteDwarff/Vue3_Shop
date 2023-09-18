const validateId = id => {
	const reg = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{6,14}$/;
	return reg.test(id);
};

const validatePassword = password => {
	const reg =
		/^(?=.*[A-Z])(?=.*[\d!@#$%^&*()_+[\]{};':"|,<>.?/~\\-])(?=.*[a-z])[\w\d!@#$%^&*()_+[\]{};':"|,<>.?/~\\-]{7,14}$/;
	return reg.test(password);
};
const validateEmail = email => {
	let re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export { validateId, validatePassword, validateEmail };
