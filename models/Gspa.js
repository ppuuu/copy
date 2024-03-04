// const sql = require("../config/vacCenterDB");

// // constructor
// const VacCenter = function(Gspa){
//     this.id = Gspa.id;
//     this.name = Gspa.name;
//     this.tel = Gspa.tel;
// };

// VacCenter.getAll = result => {
//     sql.query("SELECT * FROM Gspas;", (err,res) => {
//         if(err){
//             console.log("error: ",err);
//             result(err,null);
//             return;
//         }
//         console.log("Gspas: ",res);
//         result(null,res);

//     });
// };


// module.exports = Gspa;