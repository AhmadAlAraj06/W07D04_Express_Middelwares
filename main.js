const express = require("express");

const app = express();
const port = 3000;

const users = ["John", "Mark"];





//1)
const logUsers = (req, res, next) => {
    const err = new Error("Internal err");
    err.status = 404
    if (users[0] === undefined) {
        next(err);
    } else { 
        console.log(users);
        next();
    }
}

//2)
app.use((req, res, next) => {
    console.log(users);
    next();
});


// 3)
const logMethod = (req, res, next) => {
    console.log(req.method);

    next();
}
app.use('/users', logMethod)


//Pulse 4
app.use(express.json())

//5)
app.use((err, req, res, next) => {
    res.status = err.status
    res.json({
            error: {
                status: err.status,
                message: err.message
            }
        })
})

app.get("/users", (req, res, next) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});