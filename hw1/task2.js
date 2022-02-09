import csv from "csvtojson";
import fs from "fs";

const csvFilePath = 'csv/1.csv';
const txtFilePath = 'csv/1result.txt'

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
        const strForWriteStream = row.toString().trim();
        console.log(strForWriteStream);
        console.log(123)
        return strForWriteStream;
    })
    .pipe(fs.createWriteStream(txtFilePath));
