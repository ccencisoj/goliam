import Randomstring from "randomstring";

export const getRandomNumber = ()=> {
  return Randomstring.generate({length: 5, charset: "numeric"});
}
