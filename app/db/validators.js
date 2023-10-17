export const validateEmail = (value) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(value);
};

export const validatePassword = (value) => {
  const re = /^(?=.*[A-Z])(?=.*[$@!%*?&]).{6,}$/;
  return re.test(value);
};

export const validateLetters = (value) => {
  const re = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻqvxQVX1234567890 -]+$/;
  return re.test(value);
};

export const validateDate = (value) => {
  const re = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
  return re.test(value);
};

export const checkArray = (value) => {
  return value.length <= 2;
};