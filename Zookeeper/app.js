const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); 

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>ZooKeeper</title>
        <link rel="stylesheet" type="text/css" href="/app.css"> <!-- ✅ Linked CSS -->
      </head>
      <body>
        <nav>
          <a href="/about">About Us</a> | 
          <a href="/favorites">Zoo Favorites</a> | 
          <a href="/survey">Survey</a>
        </nav>  

        <h1>ZooKeeper</h1>
        <h3>Keeping Track of All Our Critters</h3>
        <p>ZooKeeper is an app designed to help zookeepers manage and keep track of their animals. 
        Whether it's monitoring feeding schedules, tracking health conditions, or simply keeping a log of 
        favorite animals, ZooKeeper makes it easy to manage all the details of caring for wildlife.</p>
      </body>
    </html>
  `);
});

// About Route
app.get("/about", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>About Us</title>
        <link rel="stylesheet" type="text/css" href="/app.css">
      </head>
      <body>
        <nav>
          <a href="/">Home</a> | 
          <a href="/favorites">Zoo Favorites</a> | 
          <a href="/survey">Survey</a>
        </nav>

        <h1>About Us</h1>
        <p>ZooKeeper is developed by the Wildlife Conservation Society, an organization dedicated 
        to protecting animals and their habitats. Our team of experienced zookeepers and developers 
        work together to create an app that simplifies zoo management and ensures animals receive 
        the best care possible.</p>
      </body>
    </html>
  `);
});

// Favorites Route
app.get("/favorites", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Zoo Favorites</title>
        <link rel="stylesheet" type="text/css" href="/app.css">
      </head>
      <body>
        <nav>
          <a href="/">Home</a> | 
          <a href="/about">About Us</a> | 
          <a href="/survey">Survey</a>
        </nav>

        <h1>Zoo Favorites</h1>
        <ul>
          <li>Lions</li>
          <li>Tigers</li>
          <li>Elephants</li>
          <li>Giraffes</li>
          <li>Pandas</li>
          <li>Penguins</li>
          <li>Koalas</li>
          <li>Red Pandas</li>
          <li>Sloths</li>
          <li>Meerkats</li>
        </ul>
      </body>
    </html>
  `);
});

// Survey Page
app.get("/survey", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Zoo Survey</title>
        <link rel="stylesheet" type="text/css" href="/app.css">
      </head>
      <body>
        <nav>
          <a href="/">Home</a> | 
          <a href="/about">About Us</a> | 
          <a href="/favorites">Zoo Favorites</a>
        </nav>

        <h1>Favorite Zoo Animal Survey</h1>
        <form action="/results" method="POST">
          <label for="fav_vote">Enter Your Favorite Zoo Animal:</label>
          <input type="text" id="fav_vote" name="fav_vote" required />
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

// Survey Results 
app.post("/results", (req, res) => {
  console.log(`Favorite animal vote: ${req.body.fav_vote}`);
  res.send(`
    <html>
      <head>
        <title>Survey Results</title>
        <link rel="stylesheet" type="text/css" href="/app.css">
      </head>
      <body>
        <nav>
          <a href="/">Home</a> | 
          <a href="/about">About Us</a> | 
          <a href="/favorites">Zoo Favorites</a> | 
          <a href="/survey">Survey</a>
        </nav>

        <h1>Thank You!</h1>
        <p>Your vote for "${req.body.fav_vote}" has been recorded.</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});