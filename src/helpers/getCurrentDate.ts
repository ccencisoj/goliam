import moment from "moment";

export const getCurrentDate = (): string => {
  return moment().toString();
}
