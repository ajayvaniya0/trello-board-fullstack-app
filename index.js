const express = require("express");
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("./middleware")

let USERS_ID = 1;
let ORGANIZATIONS_ID = 1;
let BOARD_ID = 1;
let ISSUE_ID = 1;

// username, password   | USERS table
// organization     | ORGANIZATIONS table
// boards   | BOARDS table
// issues   | ISSUES table

// This was the First Step is to designing the database schema
// this is just to show the example of how the database will look like
// eventually when the application will start this will be emtpy and then the user will filled this by 
// And this will not be an empty array but these are table we can say because we haven't learn yet about the databses 
// We can say the database Schema will look like 
const USERS = [];

const ORGANIZATIONS = [{
    id: 1,
    title: "100xdevs",
    description: "Learning coding platform",
    admin: 1,
    members: [2]
}];
const BOARDS = [{
    id: 1,
    title: "100xschool website frontend",
    organizations: 1
}];
const ISSUES = [{
    id: 1,
    title: "Add dark mode",
    boardId: 1,
    state: "IN_PROGRESS"  // NEXT_UP | IN_PROGRESS | DONE | ARCHIVED
}];


const app = express();
app.use(express.json());

// CREATE - ENDPOINTS
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password

    const userExists = USERS.find(u => u.username === username);
    if(userExists) {
        res.status(411).json({
            message: "User with this username already exists"
        })
        return
    }

    USERS.push({
        username,
        password,
        id: USERS_ID++
    })

    res.json({
        message: "You have signed up successfully"
    })
})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(u => u.username === username && u.password === password);
    if(!userExists) {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }

    const token = jwt.sign({
        userId: userExists.id
    }, "attlasiantionsupersecret123123password")
    // create jwt for the user

    res.json({
        token
    })

})

app.post("/organization", authMiddleware, (req, res) => {
    const userId = req.userId
})

app.post("/add-member-to-organization", (req, res) => {
    
})

app.post("/board", (req, res) => {
    
})

app.post("/issue", (req, res) => {
    
})


// READ
app.get("/boards", (req, res) => {
    
})

app.get("/issues", (req, res) => {
    
})

app.get("/members", (req, res) => {
    
})


// UPDATE - updating issue
app.put("/issues", (req, res) => {
    
})

// DELETE
app.delete("/memebers", (req, res) => {

})

app.listen(3000)