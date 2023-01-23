import Randomstring from "randomstring"

export const getRandomString = ()=> {
  return Randomstring.generate({length: 5, charset: "alphabetic"}).toLowerCase();
}
