const data = [
  {
    ticket_adult_quantity: 1,
  },
  {
    ticket_kid_quantity: 3,
  },
  {
    ticket_type: 1, //////1 - group, 2 - preferential
  },
];
let sum = data[0].ticket_adult_quantity + data[1].ticket_kid_quantity + data[2].ticket_type ;

let arrOfBarcodes = [] /////массив с barcode
for (i = 0; i<sum; i++){
    let barcode = Math.random() //// можно сделать уникальный barcode юбым способом
   arrOfBarcodes.push(barcode)
}

console.log(arrOfBarcodes)