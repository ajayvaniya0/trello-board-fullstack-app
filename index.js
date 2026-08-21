const express = require("express");
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("./middleware")
const {userModel, organizationModel} = require("./models")

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
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password

    // const userExists = USERS.find(u => u.username === username);
    const userExists = await userModel.findOne({
        username: username,
    });

    if(userExists) {
        res.status(411).json({
            message: "User with this username already exists"
        })
        return
    }

    const newUser = await userModel.create({
        username: username,
        password: password 
    })

    res.json({
        id: newUser._id,
        message: "You have signed up successfully"
    })
})

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // const userExists = USERS.find(u => u.username === username && u.password === password);
    const userExists = await userModel.findOne({
        username: username,
        password: password
    })

    if(!userExists) {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
        return
    }

    const token = jwt.sign({
        userId: userExists.id
    }, "attlasiantionsupersecret123123password")
    // create jwt for the user

    res.json({
        token
    })
})

app.post("/organization", authMiddleware, async (req, res) => {
    const userId = req.userId;

    const newOrg = await organizationModel.create({
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    })

    res.json({
        message: "Org created",
        id: newOrg._id
    })
})

app.post("/add-member-to-organization", authMiddleware,async (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUsername = req.body.memberUserUsername;

    // const organization = ORGANIZATIONS.find(org => org.id === organizationId);
    const organization = await organizationModel.findOne({
        _id: organizationId
    })

    if(!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Either this org doesn't exist or you are not an admin of this org"
        })
        return
    }

    const memberUser = await userModel.findOne({
        username: memberUserUsername
    })

    if(!memberUser) {
        res.status(411).json({
            message: "No user with this username exists in out db"
        })
        return
    }

    await organization.updateOne({
        _id: organizationId
    }, {
        $push: {
            "members" : memberUser._id
        }
    })
    // organization.members.push(memberUser.id);

    res.json({
        message: "New member added!"
    })
})

app.post("/board", authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const title = req.body.title;

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    if(!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Either this org doesn't exist or you are not an admin of this org"
        })
        return
    }

    BOARDS.push({
        id: BOARD_ID++,
        title,
        organizations: organizationId
    })

    res.json({
        message: "Board created",
        id: BOARD_ID - 1
    })
})

app.post("/issue", (req, res) => {
    
})


// READ GET ENDPOINTS
app.get("/organization", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;

    const organization = await organizationModel.findOne({
        _id: organizationId
    })

    if(!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Either this org doesn't exist or you are not an admin of this org"
        })
        return
    }

    res.json({
        ...organization,
        members: organization.members.map(memberId => {
            const user = USERS.find(user => user.id === memberId);
            return {
                id: user.id,
                username: user.username
            }
        })
    })
})

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
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUsername = req.body.memberUserUsername;

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    if(!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Either this org doesn't exist or you are not an admin of this org"
        })
        return
    }

    const memberUser = USERS.find(u == u.username === memberUserUsername)

    if(!memberUser) {
        res.status(411).json({
            message: "No user with this username exists in out db"
        })
        return
    }

    organization.members = organization.members.filter(user => user.id !== memberUser.id);

    res.json({
        message: "member deleted"
    })
})

app.listen(3000)