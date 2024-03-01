const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// Return all favorite images
router.get('/', (req, res) => {
  const queryText = `
    SELECT favorites.id, url, title, name AS category  FROM "favorites"
    LEFT JOIN "categories" ON favorites.category_id=categories.id
    ORDER BY favorites.id ASC;
  `;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

// Add a new favorite
router.post('/', (req, res) => {
  const { url, title, category_id } = req.body;
  const queryText = `
    INSERT INTO "favorites" ("url", "title", "category_id")
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [url, title, category_id];
  pool.query(queryText, values)
    .then((result) => {
      res.status(201).send(result.rows[0]);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

// Update a favorite's associated category
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { category_id } = req.body;
  const queryText = `
    UPDATE "favorites"
    SET "category_id" = $1
    WHERE "id" = $2
    RETURNING *;
  `;
  const values = [category_id, id];
  pool.query(queryText, values)
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404); // Favorite not found
      } else {
        res.sendStatus(200);
      }
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

// // Delete a favorite
// router.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   const queryText = `
//     DELETE FROM "favorites"
//     WHERE "id" = $1;
//   `;
//   const values = [id];
//   pool.query(queryText, values)
//     .then((result) => {
//       if (result.rowCount === 0) {
//         res.sendStatus(404); // Favorite not found
//       } else {
//         res.sendStatus(200);
//       }
//     })
//     .catch((error) => {
//       console.log(`Error on query ${error}`);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
