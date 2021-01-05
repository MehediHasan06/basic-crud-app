// For all the routing, we should create new folders for "routes", like this.

const router = require("express").Router(); // for routing purpose
const Alien = require("../models/alien.js"); // Model handler


//@route  -  GET /home
//@desc   -  a route to home page
router.get("/", async (req, res) => {
  // when we want to fetch data, we have to use async reuest.
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (err) {
    console.log("ERROR !");
  }
});

//@route  -  GET /home/id
//@desc   -  a route to home page with specific id
router.get("/:id", async (req, res) => {
  // Another get request to get the specific input value with id.
  try {
    const aliens = await Alien.findById(req.params.id);
    res.json(aliens);
  } catch (err) {
    console.log("ERROR !");
  }
});

//@route  -  POST /home
//@desc   -  a route to post json data in home page
router.post("/", async (req, res) => {
  // To have the data served by the clients.

  //Object of Alien()
  const alien = new Alien({
    // The value coming from client body
    name: req.body.name,
    tech: req.body.tech,
    sub: req.body.sub,
  });

  try {
    const a1 = await alien.save();
    res.json(a1); // It'll show the current posted value in the postman.
  } catch (err) {
    res.send("error");
  }
});

//@route  -  PATCH /id
//@desc   -  a route to specific id, which value is updated
router.patch("/:id", async (req, res) => {

  try {
    const alien = await Alien.findById(req.params.id);
    alien.sub = req.body.sub;
    alien.name = req.body.name;
    alien.tech = req.body.tech;
    const a1 = await alien.save();
    res.send(a1);
  } catch (err) {
    res.send("error");
  }
});

//@route  -  DELETE /id
//@desc   -  a route to specific id, which value is deleted
router.delete("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    const a1 = await alien.remove();
    res.json(a1);
  } catch (err) {
    console.log("error");
  }
});
// Now we have to set the file in such a way that whenever we get the request for alien page, (GET: http://localhost:9000/aliens) we have to execute this file in here.
//we need middleware for that purpose.

module.exports = router; // we've to export the router variable, in which we've done the necessary routing. we're exporting so that, app.js can have it while get the request for '/aliens' page request from client.
