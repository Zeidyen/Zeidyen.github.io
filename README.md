# Course website

A plain, fast website for handing out lecture notes, slides and assignments.
No database, no logins, no build step — students just open the link.

**Live address (once published):** `https://YOUR-GITHUB-USERNAME.github.io/REPO-NAME/`

---

## Part 1 — Put it online (do this once, about 10 minutes)

### 1. Make a GitHub account and a repository

1. Go to <https://github.com> and sign in (or create a free account).
2. Click **+** in the top-right → **New repository**.
3. **Repository name:** something short, e.g. `stat301` — this becomes part of
   the web address, so keep it lowercase with no spaces.
4. Choose **Public**. *(GitHub Pages is free only on public repositories.)*
5. Do **not** tick "Add a README file" — this folder already has one.
6. Click **Create repository**.

### 2. Upload this folder

GitHub shows you a page with commands. In the Terminal app, run these, replacing
`YOUR-USERNAME` and `REPO-NAME` with what you just chose:

```bash
cd ~/course-site
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

If it asks for a password, GitHub will **not** accept your account password.
Create a token instead: GitHub → your avatar → **Settings** → **Developer
settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new
token**, tick the **repo** box, and paste that token as the password.

### 3. Switch Pages on

1. In your repository, go to **Settings** → **Pages** (left sidebar).
2. Under **Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)**. Click **Save**.
4. Wait 1–2 minutes, then reload. GitHub shows the live address at the top.

Share that address with your students. That's it.

---

## Part 2 — Adding materials (the only thing you'll do from now on)

Everything students see lives in **one file: `data/course.js`**.
Open it in any text editor. It is heavily commented and tells you what each
part does.

### To post a lecture

1. Copy the PDF into the `files/lectures/` folder.
   Use simple names: `week03-slides.pdf`, not `Week 3 (final) copy.pdf`.
2. Open `data/course.js`, find the `lectures:` list, and add an entry:

```js
    {
      week:   3,
      date:   "2026-10-05",
      title:  "Hypothesis testing",
      topics: ["Null and alternative", "p-values", "Type I and II errors"],
      files: [
        { label: "Slides", path: "files/lectures/week03-slides.pdf" },
        { label: "Notes",  path: "files/lectures/week03-notes.pdf"  },
      ],
    },
```

### To post an assignment

1. Copy the PDF into `files/assignments/`.
2. Add an entry to the `assignments:` list:

```js
    {
      id:          "A2",
      title:       "Assignment 2",
      due:         "2026-10-24",
      dueTime:     "23:59",
      points:      25,
      description: "Questions 1–6 from the handout.",
      files: [
        { label: "Question paper", path: "files/assignments/A2.pdf" },
      ],
    },
```

The site works out the deadline badge on its own — green when it is far off,
amber in the last three days, grey once it has closed. You never edit a status
by hand.

### To post an announcement

Add an entry at the **top** of the `announcements:` list. Students see the
newest first.

### Publishing your changes

```bash
cd ~/course-site
git add -A
git commit -m "Add week 3 slides and Assignment 2"
git push
```

The live site updates in about a minute.

---

## Checking your work before you publish

Double-click `index.html` to open it in your browser. It works straight from
your computer — no server needed. If a change looks right there, it will look
right online.

**If the page goes blank**, you have a typo in `data/course.js` — almost always
a missing comma or quote. Press `Cmd+Option+I` in Chrome, click the **Console**
tab, and it will name the line. Undo your last edit and try again.

---

## Rules worth keeping

- **Never put marks, grades or student names on this site.** It is public to
  anyone with the address.
- Keep filenames free of spaces, apostrophes and accents — some phones handle
  them badly.
- PDFs over about 25 MB are slow on mobile data. Compress large scans first
  (Preview → File → Export → Reduce File Size).
- GitHub's limit is 100 MB per file and it is not meant for video. Put lecture
  recordings on YouTube or Drive and add them under `resources:` as a `url`.

---

## What each file does

| Path | What it is |
|---|---|
| `data/course.js` | **All your content.** The only file you need to edit. |
| `files/lectures/` | Lecture PDFs |
| `files/assignments/` | Assignment PDFs |
| `files/resources/` | Textbooks, past papers, formula sheets |
| `index.html` | Page skeleton — leave alone |
| `assets/style.css` | Appearance — edit only if you want a different look |
| `assets/app.js` | Builds the page from `course.js` — leave alone |
| `.nojekyll` | Tells GitHub to serve the files as-is. Do not delete. |
