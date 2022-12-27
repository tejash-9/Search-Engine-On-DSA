const express = require("express")
const ejs = require("ejs")
const fs = require('fs');
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, 'Public')));

app.set("view enginge", "ejs")

const PORT = 3000

//@Get request to home page
app.get("/", (req, res, next) => {
    res.render("index.ejs")
});


app.get("/search", (req, res) => {
    const query = req.query;
    const question = query.question;

    setTimeout(() => {

        TfIdf = require('tf-idf-search');
        
        var array1 = fs.readFileSync('Problems/IB_problem_urls.txt').toString().split("\n");
        var array2 = fs.readFileSync('Problems/IB_problem_titles.txt').toString().split("\n");

        tf_idf = new TfIdf();
        const arr = [];
        for (let i = 1; i <= 441; i++) {
            if (i == 269) {
                continue;
            }
            const t = "Problems/IB_problem" + i.toString() + ".txt";
            arr.push(t);
        }
        const disp = [];
        var corpus = tf_idf.createCorpusFromPathArray(arr);
        const content = question;
        var search_result = tf_idf.rankDocumentsByQuery(content);
        for (let i = 0; i < 5; i++) {
          
            const str1 = (i + 1).toString();
            const str2 = array2[search_result[i].index];
            const str3 = str1 + ' ' + ')' + ' ' + str2;
            disp.push({ url: array1[search_result[i].index], title: str3 });
        }
        res.json(disp);
    }, 2000);
});

//Assigning Port to our application
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
