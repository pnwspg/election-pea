import moment from "moment";
// export default (value) => {
//     if (value) {
//   return moment(String(value)).format("DD/MM/YYYY HH:mm");}
  
// };


export default (value) => {
  if (value) {
return moment(String(value)).add(543,'y').format("DD/MM/YYYY HH:mm");}

};
