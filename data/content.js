/* ============================================================================
   CONTENT.JS  —  THIS IS THE ONLY FILE YOU NEED TO EDIT.
   ----------------------------------------------------------------------------
   Everything on the website comes from this file: your details, your courses,
   your lecture notes and assignments, and your research papers.

   Anything written as  "EDIT ME: ..."  is a placeholder waiting for you.

   Rules to avoid breaking the site:
     - Keep the quotes "like this" around text.
     - Keep the commas between entries.
     - Dates are "YYYY-MM-DD" (year-month-day). Times are 24-hour "HH:MM".
     - A file "path" starts from this folder, e.g. "files/lectures/week01.pdf"
   ========================================================================== */

window.SITE = {

  /* ======================================================================
     1. YOU
     ====================================================================== */
  person: {
    name:        "Dr Abdulzeid Yen Anafo",
    title:       "EDIT ME: your position, e.g. Lecturer in Statistics",
    institution: "University of Mines and Technology, Tarkwa",
    email:       "abdulzeid@aims.edu.gh",
    office:      "EDIT ME: office/building, or delete this line",
    officeHours: "EDIT ME: e.g. Tuesdays 14:00–16:00, or by appointment",

    // A short paragraph for the front page. Two or three sentences is plenty.
    bio: "EDIT ME: I teach mathematical analysis, probability and statistics at " +
         "the University of Mines and Technology, Tarkwa. My research is on ___. " +
         "This site is where my students find lecture notes and assignments, " +
         "and where my papers are listed.",

    // Delete any line you do not use. They appear as buttons on the home page.
    links: {
      scholar: "",   // https://scholar.google.com/citations?user=...
      orcid:   "",   // https://orcid.org/0000-0000-0000-0000
      github:  "",   // https://github.com/yourusername
      cv:      "",   // e.g. "files/resources/cv.pdf" once you upload one
    },
  },

  /* ======================================================================
     2. ANNOUNCEMENTS  (newest first — shown on the front page)
     Use "course" to tag it to one course, or leave it "" for everyone.
     ====================================================================== */
  announcements: [
    {
      date:   "2026-09-19",
      title:  "Course materials are now online",
      body:   "All lecture notes and assignments will be posted on this site. " +
              "Check your course page before every class.",
      course: "",
    },
  ],

  /* ======================================================================
     3. COURSES
     ----------------------------------------------------------------------
     Each course gets its own page. To add a fifth course, copy one whole
     block from { to }, and give it a new "id" (lowercase, no spaces).
     Set "active" to false for a course you are not teaching this term —
     it stays on the site but is listed under "Previously taught".
     ====================================================================== */
  courses: [

    {
      id:     "math-analysis",
      code:   "EDIT ME: e.g. MATH 301",
      title:  "Mathematical Analysis",
      term:   "EDIT ME: e.g. Semester 1, 2026/2027",
      level:  "EDIT ME: e.g. Third year undergraduate",
      active: true,
      description:
        "EDIT ME: two sentences on what the course covers and what students " +
        "will be able to do by the end of it.",
      meetingTimes: "EDIT ME: e.g. Mon & Wed, 10:00–12:00",
      location:     "EDIT ME: room",

      lectures: [
        // {
        //   week: 1,
        //   date: "2026-09-21",
        //   title: "Sequences and convergence",
        //   topics: ["Definition of a limit", "Monotone convergence"],
        //   files: [
        //     { label: "Notes",  path: "files/lectures/math-analysis/week01.pdf" },
        //     { label: "Slides", path: "files/lectures/math-analysis/week01-slides.pdf" },
        //   ],
        // },
      ],

      assignments: [
        // {
        //   id: "A1", title: "Assignment 1",
        //   due: "2026-10-03", dueTime: "23:59", points: 20,
        //   description: "Questions 1-6 from the handout.",
        //   files: [{ label: "Question paper", path: "files/assignments/math-analysis/A1.pdf" }],
        // },
      ],

      resources: [
        // { title: "Rudin, Principles of Mathematical Analysis", note: "Chapters 1-3", url: "" },
        // { title: "Formula sheet", note: "Allowed in the exam", path: "files/resources/math-analysis/formulas.pdf" },
      ],

      // Leave this out of a course to fall back on the site-wide default below.
      submission: null,
    },

    {
      id:     "prob-stats",
      code:   "EDIT ME: e.g. STAT 201",
      title:  "Probability and Statistics",
      term:   "EDIT ME: e.g. Semester 1, 2026/2027",
      level:  "EDIT ME: e.g. Second year undergraduate",
      active: true,
      description:  "EDIT ME: what this course covers.",
      meetingTimes: "EDIT ME: days and times",
      location:     "EDIT ME: room",
      lectures: [], assignments: [], resources: [], submission: null,
    },

    {
      id:     "prob-theory",
      code:   "EDIT ME: e.g. STAT 401",
      title:  "Probability Theory",
      term:   "EDIT ME: e.g. Semester 2, 2026/2027",
      level:  "EDIT ME: e.g. Final year / MSc",
      active: true,
      description:  "EDIT ME: what this course covers.",
      meetingTimes: "EDIT ME: days and times",
      location:     "EDIT ME: room",
      lectures: [], assignments: [], resources: [], submission: null,
    },

    {
      id:     "time-series",
      code:   "EDIT ME: e.g. STAT 412",
      title:  "Time Series Analysis",
      term:   "EDIT ME: e.g. Semester 2, 2026/2027",
      level:  "EDIT ME: e.g. Final year / MSc",
      active: true,
      description:  "EDIT ME: what this course covers.",
      meetingTimes: "EDIT ME: days and times",
      location:     "EDIT ME: room",
      lectures: [], assignments: [], resources: [], submission: null,
    },

  ],

  /* ======================================================================
     4. RESEARCH
     ----------------------------------------------------------------------
     "status" controls the label on each entry. Use one of:
        "published"  "accepted"  "under review"  "preprint"  "in preparation"
     "url" links out (journal page, arXiv). "pdf" is a file you uploaded.

     BEFORE UPLOADING A PDF: for a published paper you usually may post the
     accepted manuscript, but NOT the publisher's typeset version. Check the
     journal's policy on sherpa.ac.uk/romeo if you are unsure.
     ====================================================================== */
  research: {
    summary:
      "EDIT ME: a short paragraph on what you work on and why it matters.",

    interests: [
      "EDIT ME: e.g. Parameter estimation for heavy-tailed distributions",
      "EDIT ME: e.g. Monte Carlo methods",
      "EDIT ME: e.g. Time series modelling",
    ],

    papers: [
      // {
      //   title:   "Title of the paper",
      //   authors: "A. Y. Anafo, B. Someone and C. Another",
      //   venue:   "Journal of Statistical Computation and Simulation",
      //   year:    2026,
      //   status:  "under review",
      //   url:     "",                                  // DOI or arXiv link
      //   pdf:     "",                                  // e.g. "files/papers/estimators.pdf"
      //   note:    "One line on what the paper shows.",
      // },
    ],
  },

  /* ======================================================================
     5. DEFAULT SUBMISSION INSTRUCTIONS
     Used by every course unless that course sets its own "submission".
     ====================================================================== */
  submission: {
    method: "Email",
    email:  "abdulzeid@aims.edu.gh",
    url:    "",   // a Google Form or LMS link, if you prefer that to email
    steps: [
      "Write your full name, student ID and the assignment number at the top of the first page.",
      "Save your work as a single PDF named  SURNAME_FirstName_COURSE_A1.pdf",
      "Email it with the course code and assignment number as the subject line.",
      "You will get a reply confirming receipt. If you do not, your work was not received.",
    ],
    latePolicy:
      "Late submissions lose 10% per day and are not accepted more than three " +
      "days after the deadline, except with prior written permission.",
  },

};
