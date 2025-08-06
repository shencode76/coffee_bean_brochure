# Coffee Bean Brochure

We created this online coffee brochure to walk you through the different types of coffee beans, the processing steps they undergo, their geospatial distribution around the world, and trends in the global coffee bean market. Finally, we'll also take a look at how people talk about coffee online — especially on platforms like Reddit.

---

## Project Structure

```
.
├── code/                 # Data cleaning and preprocessing scripts
├── data/                 # Cleaned and raw datasets
│   └── text_data/        # Reddit comments and JSON data for visualizations
├── website/              # Quarto website source (QMD, JS, CSS, data)
│   ├── img               # Visual assets (videos, gifs)
│   ├── index.qmd         # Homepage integrating all modules
│   ├── coffee_bubbles.qmd # Interactive bubble plot section
│   ├── sentiment_plot.qmd # Interactive sentiment block plot section
│   ├── tree.qmd          # Export destinations + pricing visualization
│   ├── geo_linking_plots.qmd # Choropleth + rank plot visual module
│   ├── main.qmd          # iframe wrapper for linked visualizations
│   ├── styles.css        # Custom styling
│   └── visualization/    # D3 + HTML visual modules (bubble, sentiment)
└── _site/                # Quarto-rendered static site
```

---


## Setup Instructions

### 1. Install Required Tools

Make sure you have **Quarto CLI** installed:

```bash
pip install quarto-cli
```

Or from: [https://quarto.org/docs/get-started/](https://quarto.org/docs/get-started/)

---

### 2. Clone Repository

```bash
git clone https://github.com/gu-dsan5200/dsan5200-spring2025-project-group-09.git
cd dsan5200-spring2025-project-group-09
```

---

### 3. Set Up Python Environment

```bash
conda env create -f environment.yml
conda activate base
```

---

### 4. Install Required R Packages

```r
pkgs <- readLines("r_packages.txt")
install.packages(pkgs)
```

Your can also uses [`renv`](https://rstudio.github.io/renv/) for R package management.
To restore the same environment:

```r
renv::restore()
```
---

### 5. Launch the Website

Navigate to the website folder:

```bash
cd website
quarto render index.qmd
```

After rendering, the file will be generated in _site/index.html, and you could find and open it from _site file(_site file is also under the website file).
---

## Feature Highlights

### Fullscreen Coffee Processing Carousel

- **File:** `index.qmd`
- **Step-by-step Visualization**: A 4-stage carousel walks users through the transformation from raw coffee fruit to ground beans.
- **Rich Media**: Each step uses high-quality images or videos (e.g., baking, grinding) for visual immersion.
- **Layered Explanations**: Descriptive texts overlay the media, explaining the **picking**, **fermentation**, **baking**, and **grinding** processes in plain language.
- **Automatic Transition**: The carousel auto-scrolls through each stage every 3.5 seconds, simulating a smooth production timeline.

---

### Scroll-driven Coffee Bean Explorer

- **File:** `main.qmd`
- **Sticky Sidebar Narrative**: As you scroll, the **left panel updates dynamically**, telling the story of Arabica, Robusta, Liberica, and Excelsa beans.
- **D3 Visualizations**: For each coffee type, the right panel presents:
  - A **cute animated bean shape** with expressive faces
  - A **cup chart** visualizing caffeine content
  - A **radar chart** showing its flavor profile
- **Smooth Scrolling Experience**: Powered by **Scrollama.js**, the section detects scroll positions and updates both content and visualizations seamlessly.

---

### Geospatial Distribution Map (Cup Score by Country)

**File:** `geo_linking_plots.qmd`
A choropleth map visualizing the global distribution of coffee quality scores.

**Key Features:**

* Three linked plots: scatter plot, rank bar chart, and world map
* Country-level cup scores over time
* Color shading from light to dark brown
* Interactive selectors for Arabica vs Robusta
* Dashed red equator line for the "Coffee Belt"
* Hover tooltips reveal score details

---

### Market Flow: Export Sankey + Price Bars

**File:** `combined_all_export.csv`
Explore export flows from key coffee-producing countries.

**Key Features:**

* Sankey diagram: flows from Thailand, U.S., Lao PDR to top importers
* Bar charts: trade value (USD) and unit price (USD/kg)
* Color-coded by exporter
* Hover highlights linked flows
* Charts update based on Sankey node selection

---

### Coffee Bubble Chart (Reddit Keyword Explorer)

**Files:** `coffee_bubbles.qmd`, `bubble_bounce_hover.js`

This packed bubble chart highlights the most commonly mentioned keywords in Reddit coffee discussions.

**Features:**

* Categories: `flavor`, `type`, `brew`, `origin`
* Bubble size = keyword frequency
* Hover reveals category & frequency
* Click to search keyword on Google


### Sentiment Block Timeline

**Files:** `sentiment_block_plot.js`, `sentiment_blocks.json`

A horizontal block chart that visualizes Reddit user sentiment around coffee.

**Features:**

* Each block = one comment, positioned by sentiment score
* All blocks rendered in neutral grayscale
* Hover shows comment text, keyword, and score
* Click to open original Reddit post
* Filter bar allows highlighting by keyword (others dimmed)

---

## Data Sources

* **Reddit API** (`code/text/data_collection/scrape_data.py`) — collected user-generated posts and comments related to coffee for text analysis and sentiment modeling
* **Coffee Quality Scores (2018–2025)** — scraped from the [Coffee Quality Institute](https://www.coffeeinstitute.org/?gad_source=1&gbraid=0AAAAACqEDLmWKCFWp8MNpJc2RXXDrsZRg&gclid=Cj0KCQjw2tHABhCiARIsANZzDWoKyZLrEwdfmZiaevStYYKvVWkXpBAoq3ej6oto0G7X28AW2mhcaAEaAqYrEALw_wcB) official database
* **Coffee Quality Scores (2012–2018)** — retrieved from the [TidyTuesday (R4DS GitHub Project)](https://github.com/rfordatascience/tidytuesday), limited to older Arabica cupping data
* **Global Trade Data (Marketing Section)** — downloaded from [Comtrade via WITS](https://wits.worldbank.org/trade/comtrade/en/country/ALL/year/2009/tradeflow/Exports/partner/WLD/product/090111#), covering international exports of unroasted coffee beans

---

## Frontend Dependencies

This project uses:

* **[D3.js v7](https://d3js.org/)** for interactive SVG-based visualizations (bubble, sentiment)
* All JavaScript modules are loaded via `<script type="module">` from local files
* No additional installation is needed if run with Quarto

---


## Media & Assets

All videos and animations used in the homepage (e.g., `baking.mp4`, `grinding.mp4`, `walking.gif`) are stored in the `/img/` folder. These are used in the animated landing carousel.

Keep relative paths unchanged to ensure rendering consistency.

---

## Browser Support

For best results, use the latest version of **Google Chrome**, **Firefox**, or **Edge**. Some features (e.g., D3 SVG interactivity) may degrade on Safari.

---

## Summary

This interactive Quarto project, developed for the **Georgetown DSAN 5200** course, showcases a fully responsive data storytelling website featuring:

* Animated intro with scroll effects
* Interactive D3.js modules (bubble plot, block timeline, choropleth)
* Hoverable and clickable data elements for transparency and exploration
* Smooth layout switching via iframe

All components are self-contained and GitHub Pages–ready.

---

## Acknowledgments

This work draws on open-source data and libraries. Special thanks to:

* Reddit API & community
* TidyTuesday contributors
* Coffee Quality Institute
* Quarto & D3.js developers

Feel free to contribute ideas or enhancements via pull requests!
