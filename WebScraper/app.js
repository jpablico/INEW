const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

async function scrapeNASAImageOfTheDay() {
  console.log('Starting scrape of NASA Astronomy Picture of the Day...');
  
  const browser = await puppeteer.launch({
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();

// Target site for scraping: https://apod.nasa.gov/apod/ (NASA Astronomy Picture of the Day)

    await page.goto('https://apod.nasa.gov/apod/astropix.html', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    const imageItems = [];
    
    const relativeImageUrl = $('center img').attr('src');
    const title = $('b').first().text().trim();
    const description = $('body > p').eq(2).text().trim();
    const date = new Date().toDateString();
    
    if (relativeImageUrl && title) {
      const fullImageUrl = `https://apod.nasa.gov/apod/${relativeImageUrl}`;
      imageItems.push({
        title,
        imageUrl: fullImageUrl,
        description,
        date
      });
    }
    
    console.log(`Found ${imageItems.length} APOD image`);
    return imageItems;
    
  } catch (error) {
    console.error('Error during scraping:', error);
    return [];
  } finally {
    await browser.close();
  }
}

app.get('/', async (req, res) => {
  try {
    const nasaImages = await scrapeNASAImageOfTheDay();
    res.render('index', { 
      title: 'NASA Image of the Day', 
      images: nasaImages,
      error: null
    });
  } catch (error) {
    console.error('Error rendering page:', error);
    res.render('index', { 
      title: 'NASA Image of the Day', 
      images: [],
      error: 'Failed to fetch NASA images. Please try again later.'
    });
  }
});

app.get('/search', async (req, res) => {
  const searchQuery = req.query.query;
  
  if (!searchQuery) {
    return res.redirect('/');
  }
  
  try {
    const allImages = await scrapeNASAImageOfTheDay();
    const filteredImages = allImages.filter(image => 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      image.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    res.render('index', { 
      title: `Search Results for: ${searchQuery}`, 
      images: filteredImages,
      error: filteredImages.length === 0 ? 'No results found' : null
    });
  } catch (error) {
    console.error('Error during search:', error);
    res.render('index', { 
      title: 'Search Error', 
      images: [],
      error: 'Failed to search NASA images. Please try again later.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});