# Academic website — Dr Abdulzeid Yen Anafo

A fast, plain website for your courses and research. Students open a link and
download their notes. No database, no logins, no build step, nothing to break.

**Sections:** Home · Teaching (four courses, each with its own page) · Research · Contact

---

## Part 1 — Put it online (once, about 10 minutes)

### 1. Create the repository

1. Sign in at <https://github.com> (create a free account if you need one).
2. Click **+** top-right → **New repository**.
3. **Repository name:** use your username followed by `.github.io` — for example
   `zeidyen.github.io`. That gives you the clean address
   `https://zeidyen.github.io/` with nothing after it, which is what you want on
   a CV. *(Any other name works too, it just puts the name in the address.)*
4. Choose **Public**. GitHub Pages is free only on public repositories.
5. Do **not** tick "Add a README file" — this folder already has one.
6. **Create repository**.

### 2. Upload this folder

In the Terminal app, replacing `YOUR-USERNAME`:

```bash
cd ~/course-site
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

When it asks for a password, GitHub will **not** accept your account password.
Make a token instead: GitHub → your avatar → **Settings** → **Developer
settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new
token (classic)**, tick the **repo** checkbox, generate, and paste that token
where it asks for the password.

### 3. Switch Pages on

**Settings** → **Pages** → Source: **Deploy from a branch** → Branch: **main**,
folder: **/ (root)** → **Save**. Wait a minute or two; the address appears at the
top of that page.

---

## Part 2 — Fill in your details

Open **`data/content.js`**. It is the only file you ever edit.

Search it for **`EDIT ME`** — every placeholder is marked that way, and
**anything still saying `EDIT ME` is hidden from visitors**, so a half-finished
site never looks broken. Fill them in as you go.

The parts to do first:

| Section | What to fill |
|---|---|
| `person` | your position, office, office hours, and the short bio paragraph |
| `courses` | the course code, term, level, times and room for each of the four |
| `research` | your summary, interests, and papers |
| `person.links` | Google Scholar / ORCID links, if you have them |

---

## Part 3 — Posting materials during the term

### A lecture

1. Put the PDF in the folder for that course, e.g.
   `files/lectures/time-series/week03.pdf`. Use simple names — no spaces,
   apostrophes or accents.
2. In `data/content.js`, find that course's `lectures:` list and uncomment or
   add an entry:

```js
        {
          week: 3,
          date: "2026-10-05",
          title: "Stationarity and autocorrelation",
          topics: ["Weak vs strict stationarity", "The ACF and PACF"],
          files: [
            { label: "Notes",  path: "files/lectures/time-series/week03.pdf" },
            { label: "Slides", path: "files/lectures/time-series/week03-slides.pdf" },
          ],
        },
```

### An assignment

Put the PDF in `files/assignments/<course>/`, then add to that course's
`assignments:` list:

```js
        {
          id: "A2", title: "Assignment 2",
          due: "2026-10-24", dueTime: "23:59", points: 25,
          description: "Questions 1-6 from the handout.",
          files: [{ label: "Question paper", path: "files/assignments/time-series/A2.pdf" }],
        },
```

The deadline badge looks after itself — green when it is far off, amber inside
the last three days, grey once it has closed. Open deadlines from every course
also collect on the front page automatically. You never edit a status by hand.

### A paper

Add to `research.papers`. Use `url` for the DOI or arXiv link and `pdf` for a
file you have uploaded to `files/papers/`.

### Publishing your changes

```bash
cd ~/course-site
git add -A
git commit -m "Add week 3 time series notes"
git push
```

Live in about a minute.

---

## Checking before you publish

Double-click `index.html`. It works straight from your computer, no server
needed. If it looks right there, it will look right online.

**Page goes blank?** You have a typo in `data/content.js` — nearly always a
missing comma or quote. In Chrome press `Cmd+Option+I`, open the **Console**
tab, and it names the line. Undo your last edit and retry.

---

## Two rules worth keeping

**Never put marks, grades or student names on this site.** It is public to
anyone with the address, and git keeps a copy of everything you have ever
pushed even after you delete it.

**Check before posting a published paper's PDF.** You can usually post your own
accepted manuscript but not the publisher's typeset version. Look the journal up
at <https://sherpa.ac.uk/romeo>. Linking with `url` instead of uploading a `pdf`
is always safe.

Large scans are slow on phone data — compress them first (Preview → File →
Export → Reduce File Size). GitHub refuses files over 100 MB and is not for
video; put recordings on YouTube or Drive and add the link under `resources`.

---

## What each file does

| Path | What it is |
|---|---|
| `data/content.js` | **All your content.** The only file you need to edit. |
| `files/lectures/<course>/` | Lecture PDFs, one folder per course |
| `files/assignments/<course>/` | Assignment PDFs |
| `files/resources/<course>/` | Textbook extracts, past papers, formula sheets |
| `files/papers/` | Your research PDFs |
| `index.html` | Page skeleton — leave alone |
| `assets/style.css` | Appearance — edit only to change the look |
| `assets/app.js` | Builds the pages from `content.js` — leave alone |
| `.nojekyll` | Tells GitHub to serve the files as-is. Do not delete. |
