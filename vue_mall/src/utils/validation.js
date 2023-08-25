function validationPassword(password) {
	const reg = /^[A-Za-z]\w{7,14}$/;
	if (password.match(reg)) return true;
	else return false;
}
export { validationPassword };
/*
const validateEmail = email => {
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export { validateEmail };
*/
