import Randomstring from "randomstring";

export const generateNumber = ()=> {
  return Randomstring.generate({length: 5, charset: "numeric"});
}
