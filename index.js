const express = require("express");



// username, password   | USERS table
// organization     | ORGANIZATIONS table
// boards   | BOARDS table
// issues   | ISSUES table

// This was the First Step is to designing the database schema
// this is just to show the example of how the database will look like
// eventually when the application will start this will be emtpy and then the user will filled this by 
// And this will not be an empty array but these are table we can say because we haven't learn yet about the databses 
// We can say the database Schema will look like 
const users = [{                             
    id: 1,
    username: "harkirat",
    password: "123123 "
}, {
    id: 2,
    username: "raman",
    password: "123123"
}];
const organizations = [{
    id: 1,
    title: "100xdevs",
    description: "Learning coding platform",
    admin: 1,
    members: [2]
}, {
    id: 1,
    title: "ramans org",
    description: "Expirementing",
    admin: 2,
    members: []
}];
const boards = [{
    id: 1,
    title: "100xschool website frontend",
    organizations: 1
}];
const issues = [{
    id: 1,
    title: "Add dark mode",
    boardId: 1,
    state: "IN_PROGRESS"  // NEXT_UP | IN_PROGRESS | DONE | ARCHIVED
},{
    id: 1,
    title: "Allow admins to create more courses",
    boardId: 1,
    state: "DONE"
}];


const app = express();

app.listen(3000)