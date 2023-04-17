// const obj = {
//     name: "Named",
//     age: 20,
// }
// console.log(obj.name);

// const fs = require("fs");
// // const data = fs.readFileSync("data.txt","utf-8")
// // console.log(data);

// const text = "Mindx2 \n" 
// fs.writeFileSync("data.txt",text, {flags: "a"})
// const {display, sort} = require("./index2")
// const arr = [1,0,3,4,2,6,5]
// const arr2 = arr.sort();

// console.log(arr2)

const { displayObject } = require("./index3")

const obj = {
    name: "Thanh Hà",
    age: 20,
    address: "HCM",
}
displayObject(obj)

