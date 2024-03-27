// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/database');

// const ExcelData = sequelize.define('excelData', {
//     id: {
//         type: DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     age: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true 
//     }
// });
// sequelize.sync({
// }).then(() => {
//     console.log('Table synchronized successfully!');
// }).catch((error) => {
//     console.error('Unable to synchronized table: ', error);
// });

// module.exports = {
//     ExcelData
// };
///////////////////////////////////////////////////////////////////////////////////////

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Trivia = sequelize.define('trivia', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
});

const Player = sequelize.define('player', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
});

const Question = sequelize.define('question', {
    name: DataTypes.STRING,
    image_in_drive: DataTypes.JSON,
    video_in_drive: DataTypes.JSON,
});

const Answer = sequelize.define('answer', {
    name: DataTypes.STRING,
    is_correct: DataTypes.BOOLEAN,
  });

const Score = sequelize.define('score', {
    point: DataTypes.INTEGER,
});  



sequelize.sync({
}).then(() => {
    console.log('Table synchronized successfully!');
}).catch((error) => {
    console.error('Unable to synchronized table: ', error);
});

Trivia.hasMany(Player);
Player.belongsTo(Trivia);

Trivia.hasMany(Question);
Question.belongsTo(Trivia);

Question.hasMany(Answer);
Answer.belongsTo(Question);

Player.hasMany(Score);
Score.belongsTo(Player);

Trivia.hasMany(Score);
Score.belongsTo(Trivia);

module.exports = {
    Trivia,
    Player,
    Question,
    Answer,
    Score
};

