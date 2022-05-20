// Write a program which should do the following:
// • Read the content of csv file from ./csv directory. Example: https://epa.ms/nodejs19-hw1-ex1
// • Use the csvtojson package (https://github.com/Keyang/node-csvtojson) to convert csv file to json object.
// • Write the csv file content to a new txt file. Use the following format: https://epa.ms/nodejs19-hw1-ex2.
// • Do not load all the content of the csv file into RAM via stream (read/write file content line by line).
// • In case of read/write errors, log them in the console.
// • The program should be started via npm script using nodemon (i.e. npm run task2).

import csv from 'csvtojson'
import fs from 'fs'

const csvFilePath = './csv/nodejs-hw1-ex1.csv'
const txtFilePath = './csv/nodejs-hw1-ex2.txt'

async function doTransfer() {
  try {
    const jsonArray = await csv().fromFile(csvFilePath)
    const exist = fs.existsSync(txtFilePath)
    if (exist) {
      fs.unlinkSync(txtFilePath)
    }
    for (let i = 0; i < jsonArray.length; i++) {
      fs.writeFile(txtFilePath, JSON.stringify(jsonArray[i]) + '\r\n', {flag: 'a'}, err => {
        if (err) {
          console.log('写入出错：'+err)
        }
      })
    }
  } catch (err) {
    console.log('出错了：'+err)
  }
}

doTransfer()

// Write the csv file content to a new txt file
// const readStream = fs.createReadStream(csvFilePath);
// const writeStream = fs.createWriteStream(txtFilePath);
// readStream.pipe(csv()).pipe(writeStream);