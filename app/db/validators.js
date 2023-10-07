export const validateEmail = (value) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(value);
};

export const validatePassword = (value) => {
  var re = /^(?=.*[A-Z])(?=.*[$@!%*?&]).{6,}$/;
  return re.test(value);
};