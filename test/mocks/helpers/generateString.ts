import Randomstring from "randomstring"

export const generateString = ()=> {
  return Randomstring.generate({length: 5, charset: "alphabetic"}).toLowerCase();
}
