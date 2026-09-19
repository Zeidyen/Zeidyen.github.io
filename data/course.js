/* ============================================================================
   COURSE.JS  —  THIS IS THE ONLY FILE YOU NEED TO EDIT.
   ----------------------------------------------------------------------------
   Everything students see on the site comes from this file.
   To add a lecture or assignment: drop the PDF in files/lectures/ (or
   files/assignments/), then add one entry to the list below.

   Rules to avoid breaking the site:
     - Keep the quotes "like this" around text.
     - Keep the commas between entries.
     - Dates are "YYYY-MM-DD" (year-month-day). Times are 24-hour "HH:MM".
     - A file "path" is the location of the PDF, starting from this folder.
   ========================================================================== */

window.COURSE = {

  /* ---------- 1. COURSE DETAILS (shown in the header and on Home) -------- */
  course: {
    code:        "COURSE 101",
    title:       "Course Title Goes Here",
    term:        "Semester 1, 2026/2027",
    institution: "Your Institution",
    description:
      "One short paragraph describing what this course is about, who it is " +
      "for, and what students will be able to do by the end of it.",
    meetingTimes: "Mon & Wed, 10:00 – 12:00",
    location:     "Lecture Hall / Room number",
  },

  /* ---------- 2. INSTRUCTOR ---------------------------------------------- */
  instructor: {
    name:         "Your Name",
    title:        "Lecturer",
    email:        "abdulzeid@aims.edu.gh",
    office:       "Office location",
    officeHours:  "Thursdays, 14:00 – 16:00 (or by appointment)",
  },

  /* ---------- 3. ANNOUNCEMENTS (newest first; delete old ones freely) ---- */
  announcements: [
    {
      date:  "2026-09-19",
      title: "Welcome to the course",
      body:  "All lecture slides, notes and assignments will be posted here. " +
             "Check this page before every class.",
    },
  ],

  /* ---------- 4. LECTURES & NOTES ---------------------------------------
     Each lecture can carry several files (slides, notes, code, readings).
     Put the PDFs in  files/lectures/
     ---------------------------------------------------------------------- */
  lectures: [
    {
      week:   1,
      date:   "2026-09-21",
      title:  "Introduction and course overview",
      topics: ["What this course covers", "How you will be assessed"],
      files: [
        // { label: "Slides",  path: "files/lectures/week01-slides.pdf" },
        // { label: "Notes",   path: "files/lectures/week01-notes.pdf"  },
      ],
    },
  ],

  /* ---------- 5. ASSIGNMENTS ---------------------------------------------
     Put the PDFs in  files/assignments/
     "due"     : "YYYY-MM-DD"   (leave as "" if there is no deadline yet)
     "dueTime" : "23:59"        (optional)
     ---------------------------------------------------------------------- */
  assignments: [
    {
      id:          "A1",
      title:       "Assignment 1",
      due:         "2026-10-03",
      dueTime:     "23:59",
      points:      20,
      description: "Short description of what students must do.",
      files: [
        // { label: "Question paper", path: "files/assignments/A1.pdf" },
        // { label: "Data",           path: "files/assignments/A1-data.csv" },
      ],
    },
  ],

  /* ---------- 6. EXTRA RESOURCES (books, links, past papers, software) ---
     Use "path" for a file you uploaded, or "url" for a link to the internet.
     ---------------------------------------------------------------------- */
  resources: [
    // { title: "Recommended textbook", note: "Chapters 1–4", url: "https://example.com" },
    // { title: "Formula sheet",        note: "Allowed in the exam", path: "files/resources/formulas.pdf" },
  ],

  /* ---------- 7. HOW STUDENTS SUBMIT ------------------------------------- */
  submission: {
    method:  "Email",                       // e.g. "Email", "Google Form", "In class"
    email:   "abdulzeid@aims.edu.gh",       // used for the "Submit by email" button
    url:     "",                            // a Google Form / LMS link, if you use one
    steps: [
      "Write your full name, student ID and the assignment number at the top of the first page.",
      "Save your work as a single PDF named  SURNAME_FirstName_A1.pdf",
      "Send it to the address below with the assignment number as the email subject.",
      "You will get a reply confirming receipt. If you do not, your work was not received.",
    ],
    latePolicy:
      "Late submissions lose 10% per day and are not accepted more than three days " +
      "after the deadline, except with prior written permission.",
  },

};
