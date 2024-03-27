// const xlsx = require('xlsx');
// const { ExcelData } = require('../models/ExcelData');

// exports.uploadExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send('No file uploaded.');
//         }

//         const workbook = xlsx.readFile(req.file.path);
//         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//         const excelData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//         const headers = excelData[0];

//         for (let i = 1; i < excelData.length; i++) {
//             const rowData = excelData[i];
//             const obj = {};
//             let hasValidData = true;
//             for (let j = 0; j < headers.length; j++) {
//                 const columnName = headers[j].toLowerCase();
//                 if (!rowData[j] && rowData[j] !== 0) {
//                     hasValidData = false;
//                     break;
//                 }
//                 obj[columnName] = rowData[j]; 
//             }
//             if (hasValidData) {
//                 if (obj.name && obj.age && obj.email) {
//                     console.log('uploaded Data', obj);
//                     await ExcelData.create(obj);
//                 } else {
//                     console.warn('Skipping row with missing required fields:', obj);
//                 }
//             }
//         }
//         res.send('Data uploaded successfully.');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// };

const xlsx = require('xlsx');
const { Trivia, Player, Question, Answer, Score } = require('../models/ExcelData');

uploadExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const workbook = xlsx.readFile(req.file.path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelData = xlsx.utils.sheet_to_json(worksheet);

        console.log('Excel Data:', excelData); 
        await processTriviaData(excelData);
        await processPlayerData(excelData);
        await processQuestionData(excelData);
        await processAnswerData(excelData);
        await processScoreData(excelData);

        res.send('Data uploaded successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

async function processTriviaData(excelData) {
    console.log('Processing Trivia Data...');
    for (const row of excelData) {
        if (row['Game Name'] && row['(Learn to play) SURVIVOR THEME']) {
            console.log('Adding Trivia:', row);
            await Trivia.create({
                name: row['Game Name'],
                description: row['(Learn to play) SURVIVOR THEME']
            });
        }
    }
}

async function processPlayerData(excelData) {
    console.log('Processing Player Data...');
    for (const row of excelData) {
        if (row['Game Name'] && row['(Learn to play) SURVIVOR THEME']) {
            console.log('Adding Player:', row);
            await Player.create({
                name: row['Game Name'],
                user_id: row['(Learn to play) SURVIVOR THEME']
            });
        }
    }
}

async function processQuestionData(excelData) {
    console.log('Processing Question Data...');
    for (const row of excelData) {
        if (row['Game Name'] && row['(Learn to play) SURVIVOR THEME']) {
            console.log('Adding Question:', row);
            await Question.create({
                name: row['Game Name'],
                type: row['(Learn to play) SURVIVOR THEME']
            });
        }
    }
}

async function processAnswerData(excelData) {
    console.log('Processing Answer Data...');
    for (const row of excelData) {
        if (row['Game Name'] && row['(Learn to play) SURVIVOR THEME']) {
            console.log('Adding Answer:', row);
            await Answer.create({
                name: row['Game Name'],
                is_correct: row['(Learn to play) SURVIVOR THEME']
            });
        }
    }
}

async function processScoreData(excelData) {
    console.log('Processing Score Data...');
    for (const row of excelData) {
        if (row['Game Name'] && row['(Learn to play) SURVIVOR THEME']) {
            console.log('Adding Score:', row);
            await Score.create({
                point: row['Game Name']
            });
        }
    }
}

module.exports = { 
    uploadExcel 
}

