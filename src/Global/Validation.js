export const formValidation = type => {
  let pattern = null;
  switch (type) {
    case "text":
      pattern = /[a-zA-Z]*/g;
      break;
    case "email":
      pattern = /.{3,}?@.+[.].+/g;
      break;
    case "password":
      pattern = /^.{6,20}$/g;
      break;

    default:
      pattern = /[a-zA-Z]*/g;
      break;
  }
  return pattern;
};
