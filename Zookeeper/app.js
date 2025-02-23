const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
  res.send(`
    <h1>ZooKeeper</h1>
    <h3>Keeping Track of All Our Critters</h3>
    <p>ZooKeeper is an app designed to help zookeepers manage and keep track of their animals. 
    Whether it's monitoring feeding schedules, tracking health conditions, or simply keeping a log of 
    favorite animals, ZooKeeper makes it easy to manage all the details of caring for wildlife.</p>
    
    <nav>
      <a href="/about">About Us</a> | 
      <a href="/favorites">Zoo Favorites</a> | 
      <a href="/survey">Survey</a>
    </nav>
  `);
});

// About Route
app.get("/about", (req, res) => {
  res.send(`
    <h1>About Us</h1>
    <p>ZooKeeper is developed by the Wildlife Conservation Society, an organization dedicated 
    to protecting animals and their habitats. Our team of experienced zookeepers and developers 
    work together to create an app that simplifies zoo management and ensures animals receive 
    the best care possible.</p>
    
    <nav>
      <a href="/">Home</a> | 
      <a href="/favorites">Zoo Favorites</a> | 
      <a href="/survey">Survey</a>
    </nav>
  `);
});

// Favorites Route
app.get("/favorites", (req, res) => {
  res.send(`
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
    
    <nav>
      <a href="/">Home</a> | 
      <a href="/about">About Us</a> | 
      <a href="/survey">Survey</a>
    </nav>
  `);
});

// Survey Page (Bonus)
app.get("/survey", (req, res) => {
  res.send(`
    <h1>Favorite Zoo Animal Survey</h1>
    <form action="/results" method="POST">
      <label for="fav_vote">Enter Your Favorite Zoo Animal:</label>
      <input type="text" id="fav_vote" name="fav_vote" required />
      <button type="submit">Submit</button>
    </form>
    
    <nav>
      <a href="/">Home</a> | 
      <a href="/about">About Us</a> | 
      <a href="/favorites">Zoo Favorites</a>
    </nav>
  `);
});

// Survey Results Page (Bonus)
app.post("/results", (req, res) => {
  console.log(`Favorite animal vote: ${req.body.fav_vote}`);
  res.send(`
    <h1>Thank You!</h1>
    <p>Your vote for "${req.body.fav_vote}" has been recorded.</p>
    
    <nav>
      <a href="/">Home</a> | 
      <a href="/about">About Us</a> | 
      <a href="/favorites">Zoo Favorites</a> | 
      <a href="/survey">Survey</a>
    </nav>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});