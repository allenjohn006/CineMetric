#  CineMetric — IMDB Dataset Analysis Report

> **Dataset:** IMDB Public Dataset (title.basics + title.ratings) + IMDB Top 1000 (Kaggle)
> **Records Analysed:** ~368,000 movie titles after preprocessing
> **Tools Used:** Python, Pandas, Scikit-Learn, FastAPI, React / Recharts
> **Purpose:** Exploratory Data Analysis (EDA), Visualisations, and Business Insights for content acquisition decisions

---

##  Dashboard Screenshots

### Executive Overview
![Executive Overview](../images/Executive%20Overview.png)

### Genre Intelligence — BCG Matrix
![Genre Intelligence](../images/Genre%20Intelligence.png)

### Audience Engagement
![Audience Engagement](../images/Audience%20Engagement%20.png)

### Director & Star Power
![Directors](../images/Directors.png)

### Content ROI Simulator
![ROI Simulator](../images/ROI%20Simulator.png)

### Time Intelligence
![Time Intelligence](../images/Time%20Intelligence.png)

---

## 1. Dataset Overview

| Metric | Value |
|---|---|
| **Total Titles (post-filter)** | 9,739 curated movie titles |
| **Full dataset size** | ~368,000 records |
| **Global Average Rating** | 5.98 / 10 |
| **Top Genre by Volume** | Drama |
| **Most Voted Film** | The Dark Knight |
| **Decade Coverage** | 1910s → 2020s (12 decades) |
| **Peak Production Decade** | 2010s (2,622 films) |

The raw IMDB dataset was filtered to movies-only (titleType = 'movie'), merged with ratings data, and enriched using the IMDB Top 1000 CSV to impute missing MPAA certificates via a trained RandomForestClassifier.

---

## 2. Rating Distribution Analysis

### Key Observations

The distribution of average ratings across the 368K dataset follows a roughly **normal distribution centred around 5.9–6.2**, with a slight left skew.

- **Low-rated titles (< 4.0):** These are primarily low-budget, direct-to-video or obscure titles with very few votes. They make up a disproportionate volume of the dataset but attract negligible audience engagement.
- **Mid-range titles (5.5–7.0):** The bulk of mainstream content falls here. These are commercially viable titles with broad audience reach.
- **High-rated titles (≥ 7.5):** Critically acclaimed content — documentaries, award-winning dramas. These represent the "Stars" quadrant in our BCG Matrix.
- **The global average of 5.98** reflects that while most content is watchable, genuinely great content (7.5+) is rare and valuable.

### Implication for Content Strategy
> An IMDB rating of **7.5 or above** is a reliable threshold for high-quality content acquisition. The ROI Simulator issues a **GREENLIGHT** signal for any predicted rating ≥ 7.5.

---

## 3. Genre Performance (BCG Matrix Analysis)

The Genre Intelligence page maps every primary genre across a **BCG Matrix** — Production Volume (X-axis) vs. Average Rating (Y-axis), divided by median lines.

![Genre Intelligence](../images/Genre%20Intelligence.png)

### Quadrant Breakdown

####  STARS — High Quality · High Volume (Gold)
| Genre | Avg Rating | Volume |
|---|---|---|
| Documentary | ~7.1 | ~700 films |
| Biography | ~6.8 | ~500 films |
| Crime | ~6.5 | ~600 films |

**Business Insight:** These genres deliver both quality AND scale. They are the safest acquisition targets for OTT platforms seeking a mix of critical success and broad catalogue depth.

####  CASH COWS — Low Quality · High Volume (Blue)
| Genre | Avg Rating | Volume |
|---|---|---|
| Drama | ~6.1 | 2,800+ films |
| Comedy | ~5.8 | 1,400+ films |
| Action | ~5.55 | 1,128 films |

**Business Insight:** Drama, Comedy, and Action generate the most titles but have mediocre average ratings. They are essential for catalogue volume and subscriber retention but should not be the premium acquisition focus.

> From the dashboard, Action alone has **1,128 films** at an average rating of only **5.55** — classic high-volume, mediocre-quality territory.

####  NICHE GEMS — High Quality · Low Volume (Purple)
| Genre | Avg Rating | Volume |
|---|---|---|
| Music | ~7.5+ | < 200 films |
| History | ~7.0+ | < 300 films |
| Film-Noir | ~7.2+ | < 100 films |
| Animation | ~6.9 | ~350 films |

**Business Insight:** These genres are underserved and underproduced relative to their quality. They represent **acquisition opportunities** — acquiring even a small number of Music or History titles delivers outsized quality-per-dollar returns.

####  DOGS — Low Quality · Low Volume (Red)
| Genre | Avg Rating | Volume |
|---|---|---|
| Game-Show | ~3.8 | < 50 films |
| Fantasy | ~5.2 | ~200 films |
| Sci-Fi | ~5.4 | ~200 films |

**Business Insight:** Avoid heavy investment in these segments unless a specific title shows exceptional metrics. Game-Show content in particular has the lowest average rating in the entire dataset.

---

## 4. Audience Engagement Analysis

The Audience Engagement page plots **Votes vs. Rating** across 500 sample titles, coloured by MPAA certificate.

![Audience Engagement](../images/Audience%20Engagement%20.png)

### Votes vs. Rating Correlation

- **Strong positive correlation** between rating and vote count exists at the top end (8.0+ rated films consistently attract the most votes).
- **Outliers (>500K votes)** are almost exclusively 7.0–9.0 rated films — confirming that mass-audience engagement and critical quality are not mutually exclusive.
- The majority of titles cluster at **< 50K votes**, indicating that most content in the catalogue remains undiscovered or niche.

### Certificate Effect on Audience Size

| Certificate | Avg Votes | Relative Reach |
|---|---|---|
| **G** (General Audiences) | 3,360 | 1.0× baseline |
| **PG-13** | 4,529 | 1.35× more reach |
| **R** (Restricted) | 12,617 | **3.75× more reach** |

> **Key Finding:** R-rated content attracts nearly **4× the audience engagement** of G-rated content on average. This is counter-intuitive for some platforms but reflects the fact that R-rated content houses the biggest blockbusters and cult classics (e.g., The Dark Knight, Pulp Fiction, Schindler's List).

**Implication:** Platforms targeting adult audiences should not shy away from R-rated acquisitions on quality grounds. The data shows R-rated content outperforms both G and PG-13 in audience reach.

---

## 5. Director & Star Power Analysis

![Directors](../images/Directors.png)

### Top Directors by Average Rating (Consistency Leaderboard)

| Rank | Director | Films | Avg Rating | Consistency (±σ) |
|---|---|---|---|---|
| 1 | **Christopher Nolan** | 11 | ★ 8.5 | ±0.30 |
| 2 | **Quentin Tarantino** | 10 | ★ 8.2 | ±0.20 |
| 3 | **Martin Scorsese** | 25 | ★ 8.1 | ±0.40 |
| 4 | **David Fincher** | 11 | ★ 8.0 | ±0.30 |
| 5 | **Steven Spielberg** | 32 | ★ 7.9 | ±0.50 |

### Key Findings

- **Nolan and Tarantino** maintain the highest floors — their worst films still rate above 8.0. For OTT acquisition, any title from these directors is a near-certain quality asset.
- **Scorsese and Spielberg** have higher volume (25–32 films) and slightly more variance — their catalogues contain both masterpieces and merely-good entries. Cherry-picking specific titles using ratings data is recommended.
- **Consistency Score (±σ):** A lower standard deviation means the director reliably delivers near their average. Tarantino at ±0.20 is the most consistent director in the dataset.

**Implication:** When evaluating catalogue acquisitions from a studio, director-level filtering by this consistency metric can dramatically improve acquisition ROI compared to title-by-title evaluation.

---

## 6. Time Intelligence — Historical Quality Trends

![Time Intelligence](../images/Time%20Intelligence.png)

### Production Volume by Decade

| Decade | Films Produced |
|---|---|
| 1910s | ~15 |
| 1920s | ~80 |
| 1950s | ~200 |
| 1980s | ~600 |
| 2000s | ~1,400 |
| **2010s** | **2,622** (Peak) |
| 2020s | ~800 (partial) |

### Average Rating by Decade

| Decade | Avg Rating | Trend |
|---|---|---|
| 1910s | ~6.1 | Baseline |
| **1920s** | **~6.5** | **Peak quality** |
| 1930s | ~6.1 | Slight dip |
| 1940s–1960s | ~6.2–6.3 | Stable plateau |
| 1970s | ~6.0 | Modest decline |
| 1980s–2000s | ~5.9–6.0 | Gradual decline |
| **2010s** | **~5.8** | Volume peak → quality dip |
| 2020s | ~5.8 | Continuing |

### Key Findings

1. **The 1920s had the highest average rating (~6.5)** — the silent film era was dominated by classics that survived precisely because poor films were forgotten over time (survivorship bias).
2. **The 1950s–1960s were a genuine "Golden Age"** — sustained high quality with moderate volume.
3. **Quality has declined steadily since the 1970s** as production volume exploded. More films = more low-quality entries pulling the average down.
4. **The 2010s peak volume (2,622 films)** coincides with the lowest average ratings in the dataset — classic quality-vs-quantity trade-off.

**Implication:** The historical golden-age catalogues (1950s–1970s) represent undervalued acquisition opportunities for platforms targeting premium, prestige content.

---

## 7. Machine Learning — Content ROI Simulator

![ROI Simulator](../images/ROI%20Simulator.png)

### Model Architecture

Two ML models were trained in the pipeline:

#### Model 1: Certificate Imputer (RandomForestClassifier)
- **Purpose:** Label the ~368K IMDB records with missing MPAA certificates using the 1,000 labelled records from IMDB Top 1000 CSV
- **Features:** Runtime, Release Year, IMDB Rating, Vote Count, Genre (encoded)
- **Labels:** G, PG-13, R (3-class classification)

| Metric | Score |
|---|---|
| Accuracy | High (reported during training) |
| F1 Score (weighted) | Computed per run |
| Recall (weighted) | Computed per run |

#### Model 2: Rating Predictor (RandomForestRegressor)
- **Purpose:** Predict the expected IMDB rating of a new movie before production
- **Features:** Runtime, Release Year, isAdult, Genre (encoded), Certificate (encoded)
- **Target:** averageRating (continuous 1–10)
- **RMSE:** ~1.12 (±0.5 confidence interval applied in UI)

### Investment Signal Logic

| Predicted Rating | Signal |
|---|---|
| ≥ 7.5 |  **GREENLIGHT** — High ROI |
| 6.0 – 7.4 |  **CAUTION** — Moderate ROI |
| < 6.0 |  **AVOID** — Low ROI |

### Sample Predictions

| Genre | Runtime | Certificate | Predicted Rating | Signal |
|---|---|---|---|---|
| Drama | 120 min | PG-13 | 8.0 |  GREENLIGHT |
| Comedy | 90 min | R | 6.2 |  CAUTION |
| Horror | 95 min | R | 5.8 |  AVOID |
| Documentary | 100 min | PG-13 | 7.6 |  GREENLIGHT |

---

## 8. Key Business Recommendations

Based on the EDA findings from the 368,000-record IMDB dataset:

### For OTT Platforms (Netflix, Prime, Hotstar)
1. **Prioritise Documentary and Biography acquisitions** — consistently high ratings with growing volume.
2. **Acquire R-rated content without hesitation** — it drives 3.7× the audience engagement per title.
3. **Filter director catalogues by consistency score** rather than just average rating to find reliable suppliers of quality content.
4. **Avoid Game-Show and low-budget Fantasy** — worst return on catalogue investment.
5. **Target 1950s–1970s catalogue libraries** — they represent the historical peak of quality-per-title.

### For Film Studios & Producers
1. **Drama remains the volume play** — produces the most films but at average quality; needs exceptional execution to stand out.
2. **Music and History are blue oceans** — low competition, high average quality, underserved audiences.
3. **Runtime of 90–130 minutes correlates with the highest ratings** — extreme lengths (>180 min or <60 min) skew lower.
4. **PG-13 and R certificates maximise audience reach** — G-rated content has the smallest average vote base.

---

## 9. Conclusions

CineMetric's EDA demonstrates that **data-driven content decisions are unambiguously superior to gut-instinct greenlighting**. The key signals from 368,000 IMDB titles are:

- Quality content is rare (< 10% of all titles rate ≥ 7.5) but consistently attracts the largest audiences
- Genre, certificate, and director consistency are the three strongest predictors of audience success
- The ML-powered ROI Simulator can flag high-potential acquisitions before a single dollar is committed
- Historical decade analysis reveals that today's content market rewards volume over quality, creating a genuine opportunity for platforms that curate instead of aggregate

---

*Report generated from the CineMetric analytics pipeline — IMDB dataset (title.basics + title.ratings + imdb_top_1000.csv)*
