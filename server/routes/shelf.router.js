const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the items on the shelf
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = "SELECT * FROM item;";
  pool
    .query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for items:", error);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  const queryText =
    "INSERT INTO item (description, image_url, user_id) VALUES ($1, $2, $3);";

  const {description, image_url, user_id} = req.body;
  // let image = req.body.image_url;
  // let userId = req.body.user_id;
  const params = [description, image_url, user_id];
  pool
    .query(queryText, params)
    .then((results) => res.sendStatus(201))
    .catch((error) => {
      console.log("Error making POST for items:", error);
      res.sendStatus(500);
    });
  // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id/:user_id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id
  const itemUserId = req.params.user_id
  const userId = req.user.id
  // const itemId = req.item.user_id
  const queryText = 'DELETE from item WHERE id = $1'
  const params = [id]

   if(itemUserId == userId){
    pool
    .query(queryText, params)
    .then((results) => res.sendStatus(200))
    .catch((error) => {
      console.log("Error making DELETE for items:", error);
      res.sendStatus(500);
    });
  }
});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", rejectUnauthenticated, (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {
  // endpoint functionality
});

module.exports = router;
