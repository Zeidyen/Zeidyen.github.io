/* ============================================================================
   CONTENT.JS: THIS IS THE ONLY FILE YOU NEED TO EDIT.
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
    bio: "I am a lecturer and researcher in the Department of Computing and " +
         "Data Analytics at the University of Mines and Technology, Tarkwa, " +
         "where I teach mathematical analysis, probability and statistics. " +
         "My research runs in two directions. I build new families of " +
         "probability distributions and study the estimators that fit them; " +
         "and I apply those methods to health data across Ghana: malaria " +
         "burden, air quality, cancer survival and mental health. I care most " +
         "about the point where the mathematics has to survive contact with " +
         "messy, real data. This site is where my students find lecture notes " +
         "and assignments, and where my papers, code and dashboards live.",

    // If this site sits inside your main portfolio (at /teaching/), this is the
    // link back to it. Set it to "" if this site stands on its own.
    parentSite: { url: "../", label: "Back to my main site" },

    // Delete any line you do not use. They appear as buttons on the home page.
    links: {
      scholar:      "https://scholar.google.com/citations?user=HL0V5SgAAAAJ",
      orcid:        "https://orcid.org/0000-0002-9399-8839",
      researchgate: "https://www.researchgate.net/profile/Abdulzeid-Anafo",
      github:       "https://github.com/Zeidyen",
      cv:           "cv.html",   // the CV page; it links to the PDF itself
    },
  },

  /* ======================================================================
     2. ANNOUNCEMENTS  (newest first; shown on the front page)
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
     Set "active" to false for a course you are not teaching this term;
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
      code:   "CE/EL/ME/GL/GM/ES 361",
      title:  "Probability and Statistics",
      term:   "EDIT ME: e.g. Semester 1, 2026/2027",
      level:  "EDIT ME: e.g. Second year engineering",
      active: true,
      description:
        "The mathematics of uncertainty for engineers. Every measurement you " +
        "take carries error and variation, and an engineer who cannot quantify " +
        "that cannot say how much to trust the number in front of them. The " +
        "course runs from descriptive statistics through probability and " +
        "distributions to estimation, hypothesis testing and regression.",
      meetingTimes: "EDIT ME: days and times",
      location:     "EDIT ME: room",

      lectures: [
        {
          week: 1, date: "", title: "Introduction to Statistics",
          topics: ["Why statistics, and its branches", "Variables and types of data",
                   "Sampling procedures", "Levels of measurement",
                   "Measures of location, dispersion and skewness"],
          files: [{ label: "Notes (28 pp)", path: "files/lectures/prob-stats/ps361-ch1-introduction-to-statistics.pdf" }],
        },
        {
          week: 2, date: "", title: "Introduction to Probability",
          topics: ["Axioms of probability", "Conditional probability",
                   "Bayes\u2019 rule", "Counting techniques"],
          files: [{ label: "Notes (21 pp)", path: "files/lectures/prob-stats/ps361-ch2-introduction-to-probability.pdf" }],
        },
        {
          week: 3, date: "", title: "Random Variables and Distributions",
          topics: ["Discrete random variables", "Continuous random variables",
                   "Probability mass and density functions"],
          files: [{ label: "Notes (15 pp)", path: "files/lectures/prob-stats/ps361-ch3-random-variables-distributions.pdf" }],
        },
        {
          week: 4, date: "", title: "Special Probability Distributions",
          topics: ["Binomial and Poisson", "Normal distribution",
                   "Choosing a distribution for engineering data"],
          files: [{ label: "Notes (19 pp)", path: "files/lectures/prob-stats/ps361-ch4-special-probability-distributions.pdf" }],
        },
        {
          week: 5, date: "", title: "Mathematical Expectation",
          topics: ["Expectation of a function", "Variance and covariance"],
          files: [{ label: "Notes (11 pp)", path: "files/lectures/prob-stats/ps361-ch5-mathematical-expectation.pdf" }],
        },
        {
          week: 6, date: "", title: "Introduction to Estimation",
          topics: ["Point estimation", "Interval estimation",
                   "Confidence interval for a population proportion"],
          files: [{ label: "Notes (9 pp)", path: "files/lectures/prob-stats/ps361-ch6-introduction-to-estimation.pdf" }],
        },
        {
          week: 7, date: "", title: "Tests of Hypotheses and Significance",
          topics: ["Tests on a single population mean", "Variance unknown",
                   "Tests on a population proportion",
                   "Difference between two population means"],
          files: [{ label: "Notes (10 pp)", path: "files/lectures/prob-stats/ps361-ch7-tests-of-hypotheses.pdf" }],
        },
        {
          week: 8, date: "", title: "Regression and Correlation Analysis",
          topics: ["The regression model", "Least squares estimation",
                   "Correlation"],
          files: [{ label: "Notes (12 pp)", path: "files/lectures/prob-stats/ps361-ch8-regression-and-correlation.pdf" }],
        },
      ],

      assignments: [],

      resources: [
        { title: "Complete lecture notes",
          note:  "All eight chapters in one file, 131 pages, 5.8 MB. The chapter " +
                 "files above are smaller if you are on mobile data.",
          path:  "files/lectures/prob-stats/ps361-full-lecture-notes.pdf" },
      ],

      submission: null,
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
      "My work runs in two directions. The first is distribution theory: " +
      "deriving new families of probability distributions, establishing their " +
      "mathematical properties, and testing how well maximum likelihood " +
      "recovers their parameters in simulation. The second is applied " +
      "biostatistics in Ghana, where those models meet real data on malaria " +
      "burden, air quality, cancer survival and mental health.",

    interests: [
      "New families of probability distributions",
      "Maximum likelihood estimation and regression models",
      "Monte Carlo simulation studies of estimator performance",
      "Applied biostatistics and public health in Ghana",
      "Survival and competing-risks analysis",
    ],

    // Taken from your CV (ABDULZEID YEN ANAFO_Resume.pdf), newest first.
    // NOTE: the CV writes your name both as "Anafo, Y. A." and "Anafo, A. Y.".
    // Normalised to A. Y. Anafo here; correct it if the other is right.
    /* Verified against ORCID 0000-0002-9399-8839 and Crossref,
       September 2026. Every entry carries a resolvable DOI except the
       last, which is not indexed anywhere I could find.
       Author lists come from the publisher record, with his name
       normalised to A. Y. Anafo (publishers spell it four ways). */
    papers: [

      {
        title:   "Aimee, an AI-powered HIV prevention and sexual and " +
                 "reproductive health intervention for adolescent girls and " +
                 "young women in South Africa: Design, pilot study methods, and " +
                 "feasibility",
        authors: "A. Spyrelis, S. Frade, S. Cooper, S. Morris, S. Smedinghoff, " +
                 "A. Y. Anafo, P. Potsane, C. Sokhela, S. Stafford, D. Rech, R. " +
                 "Mendonca, N. Maricich, K. Gupta, H. Lee, Y. Richard, P. " +
                 "Isabelli, J. Ratevosian, B. Segal, M. Sundaram and N. Mtshali",
        venue:   "VeriXiv",
        year:    2026, status: "preprint",
        url:     "https://doi.org/10.12688/verixiv.3679.1", pdf: "",
      },

      {
        title:   "Ambient particulate matter pollution and lung function among " +
                 "informal transport workers in Ghana",
        authors: "E. Akyeampong, M. Opoku-Mireku, B. Owusu, E. Ashun, A. Y. " +
                 "Anafo, A. Alvin Arnold Adjei, I. K. Agbenyezi, P. Dinko, A. A. " +
                 "Arthur and B. D. Boluwatife",
        venue:   "Scientific Reports, 16(1), 21465",
        year:    2026, status: "published",
        url:     "https://doi.org/10.1038/s41598-026-51982-1", pdf: "",
      },

      {
        title:   "Competing-risk Prognostic Modelling of Breast Cancer-specific " +
                 "Mortality in Ghana: Stability Selection, Internal Validation, " +
                 "and Risk Stratification",
        authors: "E. M. Baah, S. Bosson-Amedenu and A. Y. Anafo",
        venue:   "Asian Journal of Probability and Statistics, 28(7), 118-134",
        year:    2026, status: "published",
        url:     "https://doi.org/10.9734/ajpas/2026/v28i7921", pdf: "",
      },

      {
        title:   "Lagged climatic drivers of malaria incidence severity and " +
                 "mortality using SEM and SHAP hybrid modelling in Ghana",
        authors: "S. Bosson-Amedenu and A. Y. Anafo",
        venue:   "Discover Public Health, 23(1), 813",
        year:    2026, status: "published",
        url:     "https://doi.org/10.1186/s12982-026-02163-y", pdf: "",
      },

      {
        title:   "Malaria incidence, severity and mortality in children under " +
                 "five in Ghana: evidence from generalised additive models",
        authors: "S. Bosson-Amedenu, F. Eyiah-Bediako and A. Y. Anafo",
        venue:   "BMC Public Health, 26(1), 653",
        year:    2026, status: "published",
        url:     "https://doi.org/10.1186/s12889-025-25931-y", pdf: "",
      },

      {
        title:   "Phase-specific climatic sensitivities of under-five malaria in " +
                 "Ghana using epidemic modelling, NB-GAMs and SHAP " +
                 "explainability",
        authors: "E. M. Baah, S. Bosson-Amedenu, A. Y. Anafo, F. H. Adams and D. " +
                 "Y. Kparib",
        venue:   "Scientific Reports",
        year:    2026, status: "published",
        url:     "https://doi.org/10.1038/s41598-026-64032-7", pdf: "",
      },

      {
        title:   "Evaluating malaria burden in children under-five and " +
                 "intervention outcomes in Tarkwa-Nsuaem municipality",
        authors: "A. Y. Anafo, S. Bosson-Amedenu, V. U. Gmayinaam, A. Enock, S. " +
                 "Ocloo and J. Acquah",
        venue:   "BMC Infectious Diseases, 25(1), 294",
        year:    2025, status: "published",
        url:     "https://doi.org/10.1186/s12879-025-10705-z", pdf: "",
      },

      {
        title:   "Modeling Regional Trends in Caesarean Births across Ghana's " +
                 "Former Ten Regions over a Decade",
        authors: "S. Bosson-Amedenu, A. Y. Anafo, A. Ouerfelli and N. Ouerfelli",
        venue:   "Asian Journal of Pregnancy and Childbirth, 8(1), 505-526",
        year:    2025, status: "published",
        url:     "https://doi.org/10.9734/ajpcb/2025/v8i1186", pdf: "",
      },

      {
        title:   "Modified alpha power transformed Topp-Leone family of " +
                 "distributions with applications and regression",
        authors: "S. K. Ocloo, A. Y. Anafo and S. Nasiru",
        venue:   "Scientific African, 30, e02993",
        year:    2025, status: "published",
        url:     "https://doi.org/10.1016/j.sciaf.2025.e02993", pdf: "",
      },

      {
        title:   "Predicting depression among men who have sex with men in Ghana " +
                 "using machine learning algorithms",
        authors: "A. Y. Anafo, L. E. Nelson, L. Wilton, V. U. Gmayinaam and S. " +
                 "Ocloo",
        venue:   "PLOS Mental Health, 2(11), e0000485",
        year:    2025, status: "published",
        url:     "https://doi.org/10.1371/journal.pmen.0000485", pdf: "",
      },

      {
        title:   "Risk Stratification of Breast Cancer Metastasis: A Predictive " +
                 "Modelling Framework Using Clinical and Hormonal Receptor Data " +
                 "in a Ghanaian Cohort",
        authors: "A. Y. Anafo, S. Bosson-Amedenu, E. Ayitey, V. U. Gmayinaam, J. " +
                 "Acquah, S. Ocloo, S. B. Boateng and A. M. Baidoo",
        venue:   "Research Square",
        year:    2025, status: "preprint",
        url:     "https://doi.org/10.21203/rs.3.rs-6671298/v1", pdf: "",
      },

      {
        title:   "Application of Stacked Ensemble Techniques for Classifying " +
                 "Recurrent Head and Neck Squamous Cell Carcinoma Prognosis",
        authors: "J. Acquah, D. K. Owusu and A. Y. Anafo",
        venue:   "Asian Journal of Research in Computer Science, 17(4), 77-94",
        year:    2024, status: "published",
        url:     "https://doi.org/10.9734/ajrcos/2024/v17i4431", pdf: "",
      },

      {
        title:   "Covariate level stratification assessment of mortalities due " +
                 "to competing risks and breast cancer in Ghana",
        authors: "J. Acquah, S. Bosson-Amedenu, F. Eyiah-Bediako and A. Y. Anafo",
        venue:   "Scientific African, 23, e02060",
        year:    2024, status: "published",
        url:     "https://doi.org/10.1016/j.sciaf.2024.e02060", pdf: "",
      },

      {
        title:   "Examining Cesarean Section Rates in Ghana’s 10 Regions Over a " +
                 "Decade a Comprehensive National Investigation",
        authors: "S. Bosson-Amedenu, A. Y. Anafo, A. Ouerfelli and N. Ouerfelli",
        venue:   "BioMed Research International, 2024(1), 3774435",
        year:    2024, status: "published",
        url:     "https://doi.org/10.1155/2024/3774435", pdf: "",
      },

      {
        title:   "Malaria Projections: Simulating between Simple Forecast Models " +
                 "And  Multi-Model Ensemble",
        authors: "S. Bosson-Amedenu, T. Oduro-Okyireh, A. Y. Anafo and A. " +
                 "Constance Mensah",
        venue:   "SSRN",
        year:    2024, status: "preprint",
        url:     "https://doi.org/10.2139/ssrn.4703162", pdf: "",
      },

      {
        title:   "Mathematical Approaches to Understanding Prostate Cancer " +
                 "Progression: A Compartmental Modeling Study in Ghana",
        authors: "S. Bosson-Amedenu, E. Ayitey and A. Y. Anafo",
        venue:   "Research Square",
        year:    2024, status: "preprint",
        url:     "https://doi.org/10.21203/rs.3.rs-5282657/v1", pdf: "",
      },

      {
        title:   "New Weighted Burr XII Distribution: Statistical Properties, " +
                 "Applications, and Regression",
        authors: "A. Y. Anafo, S. K. Ocloo and S. Nasiru",
        venue:   "International Journal of Mathematics and Mathematical " +
                 "Sciences, 2024, 1-14",
        year:    2024, status: "published",
        url:     "https://doi.org/10.1155/2024/4098771", pdf: "",
      },

      {
        title:   "An Extension of the Chen Distribution: Properties, Simulation " +
                 "Study and Applications to Data",
        authors: "J. Acquah, B. Odoi, A. Y. Anafo and B. Senyea",
        venue:   "Asian Journal of Probability and Statistics, 23(4), 26-42",
        year:    2023, status: "published",
        url:     "https://doi.org/10.9734/ajpas/2023/v23i4510", pdf: "",
      },

      {
        title:   "The Modified Extended Chen Distribution: Properties and " +
                 "Application to Rainfall Data",
        authors: "A. Y. Anafo, L. Brew and S. Nasiru",
        venue:   "Applied Mathematics & Information Sciences, 16(5), 711-728",
        year:    2022, status: "published",
        url:     "https://doi.org/10.18576/AMIS/160506", pdf: "",
      },

      {
        title:   "The Equilibrium Renewal Burr XII Distribution: Properties and " +
                 "Applications",
        authors: "A. Y. Anafo, L. Brew and S. Nasiru",
        venue:   "Asian Journal of Probability and Statistics, 18-40",
        year:    2021, status: "published",
        url:     "https://doi.org/10.9734/AJPAS/2021/V15I230349", pdf: "",
      },

      {
        title:   "The Generalized Ampadu-G Family of Distributions: Properties, " +
                 "Applications and Characterizations",
        authors: "C. B. Ampadu and A. Y. Anafo",
        venue:   "Earthline Journal of Mathematical Sciences, 139-167",
        year:    2020, status: "published",
        url:     "https://doi.org/10.34198/ejms.4120.139167", pdf: "",
      },

      {
        title:   "Maximum Likelihood Estimation in an Alpha-Power Transformation " +
                 "of the Ampadu-Type",
        authors: "C. B. Ampadu and A. Y. Anafo",
        venue:   "Annals of Biostatistics & Biometric Applications, 2(4)",
        year:    2019, status: "published",
        url:     "https://doi.org/10.33552/ABBA.2019.02.000541", pdf: "",
      },

      {
        title:   "The New rT - X Family of Distributions: Some Properties with " +
                 "Applications",
        authors: "C. B. Ampadu and A. Y. Anafo",
        venue:   "Earthline Journal of Mathematical Sciences, 409-432",
        year:    2019, status: "published",
        url:     "https://doi.org/10.34198/ejms.2219.409432", pdf: "",
      },

      {
        title:   "Logit Gudermannian distribution: properties, regression " +
                 "and applications",
        authors: "A. Y. Anafo, O. Selasi and H. M. Napari",
        venue:   "Journal of Statistical Modelling: Theory and Applications",
        year:    2024, status: "published",
        url:     "",   // no DOI found online - add one if you have it
        pdf:     "",
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
    /* Project repositories. The depression study that used to sit here is
       now published (PLOS Mental Health, 2025) and has moved up to papers. */
    ongoing: [
      {
        title:  "Characterisation of air pollutants from singeing sites in Ghana",
        status: "completed",
        url:    "https://github.com/Zeidyen/Ghana-singeing-air-quality",
        note:   "Field study under the NIH GHES award. Code and analysis on GitHub.",
      },
      {
        title:  "Assessing the impact of seasonal malaria chemoprevention on " +
                "older age groups in Northern Ghana",
        status: "completed",
        url:    "https://github.com/Zeidyen/SMC-Malaria-Ghana-Project",
        note:   "Code and analysis on GitHub.",
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
