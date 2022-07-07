var History = require('../models/history.js');

exports.allData = async (req, res) => {
    var arr = await History.find({}).sort({ date: -1 });
    res.send(arr);
}

exports.GetTempData = (req, res) => {
    console.log("OK");
    res.send([
        {
            name: "First", 
            age: 10,
        },
        {
            name: "Second", 
            age: 20,
        },
        {
            name: "Third", 
            age: 30,
        },
    ])
}