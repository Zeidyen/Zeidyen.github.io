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
    email:       "ayanafo@umat.edu.gh",   // your UMaT address, from your CV
    office:      "EDIT ME: office/building, or delete this line",
    officeHours: "EDIT ME: e.g. Tuesdays 14:00–16:00, or by appointment",

    // A short paragraph for the front page. Two or three sentences is plenty.
    bio: "I teach mathematical analysis, probability and statistics at the " +
         "University of Mines and Technology, Tarkwa. My research is in " +
         "distribution theory and statistical estimation — new families of " +
         "probability distributions, their mathematical properties, and how " +
         "well maximum likelihood recovers their parameters in simulation. " +
         "This site is where my students find lecture notes and assignments, " +
         "and where my papers are listed.",

    // If this site sits inside your main portfolio (at /teaching/), this is the
    // link back to it. Set it to "" if this site stands on its own.
    parentSite: { url: "../", label: "Back to my main site" },

    // Delete any line you do not use. They appear as buttons on the home page.
    links: {
      scholar: "",   // https://scholar.google.com/citations?user=...
      orcid:   "",   // https://orcid.org/0000-0000-0000-0000
      github:  "https://github.com/Zeidyen",
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
      "I work on new families of probability distributions — deriving their " +
      "mathematical properties, estimating their parameters by maximum " +
      "likelihood, and testing how well that estimation behaves in simulation " +
      "before applying the models to real data.",

    interests: [
      "New families of probability distributions",
      "Maximum likelihood estimation and regression models",
      "Monte Carlo simulation studies of estimator performance",
      "Applied biostatistics and public health in Ghana",
      "Survival and competing-risks analysis",
    ],

    // Taken from your CV (ABDULZEID YEN ANAFO_Resume.pdf), newest first.
    // NOTE: the CV writes your name both as "Anafo, Y. A." and "Anafo, A. Y.".
    // Normalised to A. Y. Anafo here — correct it if the other is right.
    papers: [

      {
        title:   "Modified alpha power transformed Topp-Leone family of " +
                 "distributions with applications and regression",
        authors: "A. Y. Anafo, S. Ocloo and S. Nasiru",
        venue:   "Scientific African, vol. 30, e02993",
        year:    2025, status: "published", url: "", pdf: "",
      },
      {
        title:   "Evaluating malaria burden in children under-five and " +
                 "intervention outcomes in Tarkwa-Nsuaem municipality",
        authors: "A. Y. Anafo, S. Bosson-Amedenu, V. U. Gmayinaam, A. Enock, " +
                 "S. Ocloo and J. Acquah",
        venue:   "BMC Infectious Diseases, 25(1), 294",
        year:    2025, status: "published", url: "", pdf: "",
      },
      {
        title:   "Examining Cesarean section rates in Ghana\u2019s 10 regions " +
                 "over a decade: a comprehensive national investigation",
        authors: "S. Bosson-Amedenu, A. Y. Anafo, A. Ouerfelli, N. Ouerfelli " +
                 "and N. Ouerfelli",
        venue:   "BioMed Research International, 3774435",
        year:    2024, status: "published", url: "", pdf: "",
      },
      {
        title:   "New weighted Burr XII distribution: statistical properties, " +
                 "applications and regression",
        authors: "A. Y. Anafo, S. K. Ocloo and S. Nasiru",
        venue:   "International Journal of Mathematics and Mathematical Sciences, 4098771",
        year:    2024, status: "published", url: "", pdf: "",
        // Your CV lists this paper twice, under two slightly different titles.
        // Merged into one entry here.
      },
      {
        title:   "Covariate level stratification assessment of mortalities due " +
                 "to competing risks and breast cancer in Ghana",
        authors: "J. Acquah, F. Eyiah-Bediako and A. Y. Anafo",
        venue:   "Scientific African",
        year:    2024, status: "published", url: "", pdf: "",
      },
      {
        title:   "Logit Gudermannian distribution: properties, regression and " +
                 "applications",
        authors: "A. Y. Anafo, O. Selasi and H. M. Napari",
        venue:   "Journal of Statistical Modelling: Theory and Applications",
        year:    2024, status: "published", url: "", pdf: "",
      },
      {
        title:   "An extension of the Chen distribution: properties, simulation " +
                 "study and applications to data",
        authors: "J. Acquah, B. Odoi and A. Y. Anafo",
        venue:   "Asian Journal of Probability and Statistics",
        year:    2023, status: "published", url: "", pdf: "",
      },
      {
        title:   "The modified extended Chen distribution: properties and " +
                 "applications to rainfall data",
        authors: "A. Y. Anafo, L. Brew and S. Nasiru",
        venue:   "Applied Mathematics and Information Sciences",
        year:    2023, status: "published", url: "", pdf: "",
      },
      {
        title:   "The equilibrium renewal Burr XII distribution: properties and " +
                 "applications",
        authors: "A. Y. Anafo, L. Brew and S. Nasiru",
        venue:   "Asian Journal of Probability and Statistics",
        year:    2021, status: "published", url: "", pdf: "",
      },
      {
        title:   "The new rT\u2212X family of distributions: some properties " +
                 "with applications",
        authors: "C. Ampadu and A. Y. Anafo",
        venue:   "Earthline Journal of Mathematical Sciences",
        year:    2019, status: "published",
        url:     "https://doi.org/10.34198/ejms.2219.409432", pdf: "",
      },
      {
        title:   "Maximum likelihood estimation in an alpha power transformation " +
                 "of the Ampadu-type",
        authors: "C. Ampadu and A. Y. Anafo",
        venue:   "Annals of Biostatistics & Biometric Applications",
        year:    2019, status: "published",
        url:     "https://doi.org/10.33552/ABBA.2019.02.000541", pdf: "",
      },
      {
        title:   "The generalized Ampadu-G family of distributions: properties " +
                 "and applications",
        authors: "A. Y. Anafo and C. Ampadu",
        venue:   "Earthline Journal of Mathematical Sciences, 4(1), 139\u2013167",
        year:    2019, status: "published",
        url:     "https://doi.org/10.34198/ejms.4120.139167", pdf: "",
      },

    ],

    /* Doctoral thesis, shown under its own heading. */
    thesis: {
      title:   "Development of the Modified Extended Chen and Equilibrium " +
               "Renewal Burr XII Distributions Using the Burr\u2013Hatke " +
               "Differential Equation",
      authors: "A. Y. Anafo",
      venue:   "PhD thesis, University of Mines and Technology, Tarkwa",
      year:    2022,
      status:  "thesis",
      pdf:     "files/papers/anafo-phd-thesis-2022.pdf",
      note:    "Develops two new univariate continuous distributions from the " +
               "Burr\u2013Hatke differential equation and the equilibrium " +
               "renewal process, derives their statistical properties, and " +
               "compares maximum likelihood against ordinary and weighted least " +
               "squares by Monte Carlo simulation. Bias and root mean square " +
               "error fall as the sample size grows, indicating consistent and " +
               "asymptotically unbiased estimators. Both distributions fit real " +
               "meteorological and health science data well.",
    },

    /* Ongoing / recently completed projects, shown under their own heading.
       Same fields as papers. */
    ongoing: [
      {
        title:   "Predicting depression among men who have sex with men in " +
                 "Ghana using machine learning algorithms",
        venue:   "PLOS Mental Health",
        status:  "accepted",
        url:     "https://github.com/Zeidyen/msm-depression-ml",
        note:    "Code and analysis on GitHub.",
      },
      {
        title:   "Characterisation of air pollutants from singeing sites in Ghana",
        status:  "completed",
        url:     "https://github.com/Zeidyen/Ghana-singeing-air-quality",
        note:    "Code and analysis on GitHub.",
      },
      {
        title:   "Assessing the impact of seasonal malaria chemoprevention on " +
                 "older age groups in Northern Ghana",
        status:  "completed",
        url:     "https://github.com/Zeidyen/SMC-Malaria-Ghana-Project",
        note:    "Code and analysis on GitHub.",
      },
    ],
  },


  /* ======================================================================
     5. DEFAULT SUBMISSION INSTRUCTIONS
     Used by every course unless that course sets its own "submission".
     ====================================================================== */
  submission: {
    method: "Email",
    email:  "ayanafo@umat.edu.gh",
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
