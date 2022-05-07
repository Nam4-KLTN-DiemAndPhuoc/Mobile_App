const GeneratorCodeOrder = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hours = new Date().getHours();
  var minutes = new Date().getMinutes();
  var seconds = new Date().getSeconds();
  return `${seconds}${minutes}${hours}${date}${month}${year}`;
};

export default GeneratorCodeOrder;
