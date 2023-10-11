import moment from "moment";

export const convertRelativeTime = (date) => {
  return moment(date).fromNow();
};
