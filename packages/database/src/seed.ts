import { prisma } from "./client";
import type { User } from "../generated/client";

// --- Seed Data ---

const DEFAULT_USERS = [
  {
    id: 1,
    username: "andersonpaula1",
    email: "larry63@example.org",
    passwordHash: "990943e229445d69e9d6e5c3308fd5ae7f0b7593dee331c2c9437f28cbdfc0ce",
    role: "INSTRUCTOR",
  },
  {
    id: 2,
    username: "ljones2",
    email: "brownkatherine@example.net",
    passwordHash: "94195feb9cc8a33ec174adbfb1bb29260c1ba644f504457d6048d13b56fa17e8",
    role: "STUDENT",
  },
  {
    id: 3,
    username: "andreamorales3",
    email: "andrewhansen@example.net",
    passwordHash: "e6b169591989025d0e6a8a8ffdf99aa21cfc9e03ffc673c0a84961d5a3d92123",
    role: "INSTRUCTOR",
  },
  {
    id: 4,
    username: "cooksara4",
    email: "carl58@example.net",
    passwordHash: "58dfc7017c15e036a9fb9720737cf75d61030e1494fce13ecb8ad2a415fff462",
    role: "STUDENT",
  },
  {
    id: 5,
    username: "stephenchapman5",
    email: "schmittmichael@example.net",
    passwordHash: "c79b4e4be887d94b3ff83a88068a8848b4aa834f52c7cff99ec18f3be08dafb6",
    role: "INSTRUCTOR",
  },
  {
    id: 6,
    username: "meganduffy6",
    email: "nathanshah@example.net",
    passwordHash: "f15beaed6fc9d817c9bf75d8f8d7e328e4f5053d69306151b5f3bbfa97ad19e7",
    role: "INSTRUCTOR",
  },
  {
    id: 7,
    username: "davidguzman7",
    email: "joshua75@example.net",
    passwordHash: "6b720b60b7c77a26e2b529550fa68c67dca6f4f8467ee4004bd1442b6dae58a2",
    role: "STUDENT",
  },
  {
    id: 8,
    username: "jaydean8",
    email: "andresbrown@example.net",
    passwordHash: "fee519913e3ad606fb7464a8e0ab6e0b29697f53ff551d0917a0f4f6d948a899",
    role: "ADMIN",
  },
  {
    id: 9,
    username: "kgriffith9",
    email: "samantha87@example.com",
    passwordHash: "70435c75409a261613466d71d523000da896b5cf33506c0822645a58355995a6",
    role: "STUDENT",
  },
  {
    id: 10,
    username: "michaelmiller10",
    email: "ozimmerman@example.com",
    passwordHash: "d70cdfb0130cbdabe6e96e7b9ae28f82a5856ea205fe26a5cc040405f057028f",
    role: "INSTRUCTOR",
  },
  {
    id: 11,
    username: "gdickerson11",
    email: "james03@example.com",
    passwordHash: "367cb8354a81389d1023115144bc78808abcd06149175c82c216368495fcc4ef",
    role: "INSTRUCTOR",
  },
  {
    id: 12,
    username: "pstephens12",
    email: "rclayton@example.com",
    passwordHash: "df6e5d8afefbad18ae48fbba18af6fc740d307c9c57988584090c0cda15d9304",
    role: "STUDENT",
  },
  {
    id: 13,
    username: "krobinson13",
    email: "qdodson@example.com",
    passwordHash: "8af1774fb75bd24e2b3c56aa442832a91eeafb7f9d72a926b5193ffc5567cce9",
    role: "STUDENT",
  },
  {
    id: 14,
    username: "vickiforbes14",
    email: "hammondchristine@example.net",
    passwordHash: "4ae3739e85fb79d33aab3dd83ceef6d9dd86c832d12c16ddeb67c707080a64c9",
    role: "ADMIN",
  },
  {
    id: 15,
    username: "harveysteven15",
    email: "jamiebates@example.com",
    passwordHash: "e216a12647ab7d3121e4f17257b4438898b6dc8e57cbaf05895990e77a289b01",
    role: "INSTRUCTOR",
  },
  {
    id: 16,
    username: "westbailey16",
    email: "eugenegarcia@example.com",
    passwordHash: "894fd45d8123118e0641038c350ada3ce3e80d7c98702657cadd8c21d6ff7eab",
    role: "INSTRUCTOR",
  },
  {
    id: 17,
    username: "derrick2417",
    email: "othomas@example.com",
    passwordHash: "991cb89ce3d469a3a5cfbd0c7fa64fcb435f9b11fb011c182a39c79be8ca8b36",
    role: "INSTRUCTOR",
  },
  {
    id: 18,
    username: "kbernard18",
    email: "patelstephanie@example.net",
    passwordHash: "1b215600e16d0e328c5ccd7b3894b4ca9e100916399480954acfd13752fdec26",
    role: "INSTRUCTOR",
  },
  {
    id: 19,
    username: "jonesashley19",
    email: "carlosgray@example.com",
    passwordHash: "f5b09459a890bde0669ce863cfd398acda010ba399c846386ba8cfe6196967b3",
    role: "STUDENT",
  },
  {
    id: 20,
    username: "sfitzpatrick20",
    email: "nicole04@example.com",
    passwordHash: "64b8535707be25204f744172559412fb87a796ce003029cab1c9b60faf1c392c",
    role: "STUDENT",
  },
  {
    id: 21,
    username: "emilyturner21",
    email: "emily.turner21@example.com",
    passwordHash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
    role: "STUDENT",
  },
  {
    id: 22,
    username: "robertwilliams22",
    email: "robert.williams22@example.com",
    passwordHash: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a1",
    role: "STUDENT",
  },
  {
    id: 23,
    username: "sarahlee23",
    email: "sarah.lee23@example.com",
    passwordHash: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a1b2",
    role: "STUDENT",
  },
  {
    id: 24,
    username: "danielmartin24",
    email: "daniel.martin24@example.com",
    passwordHash: "d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a1b2c3",
    role: "STUDENT",
  },
  {
    id: 25,
    username: "ashleyclark25",
    email: "ashley.clark25@example.com",
    passwordHash: "e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a1b2c3d4",
    role: "STUDENT",
  },
  {
    id: 26,
    username: "matthewdavis26",
    email: "matthew.davis26@example.com",
    passwordHash: "f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a1b2c3d4e5",
    role: "STUDENT",
  },
  {
    id: 27,
    username: "oliviamoore27",
    email: "olivia.moore27@example.com",
    passwordHash: "g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a1b2c3d4e5f6",
    role: "STUDENT",
  },
  {
    id: 28,
    username: "jamesking28",
    email: "james.king28@example.com",
    passwordHash: "h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a1b2c3d4e5f6g7",
    role: "STUDENT",
  },
  {
    id: 29,
    username: "chloewilson29",
    email: "chloe.wilson29@example.com",
    passwordHash: "i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a1b2c3d4e5f6g7h8",
    role: "STUDENT",
  },
  {
    id: 30,
    username: "benjaminwhite30",
    email: "benjamin.white30@example.com",
    passwordHash: "j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a1b2c3d4e5f6g7h8i9",
    role: "STUDENT",
  },
] as Array<Partial<User>>;

const courses = [
  {
    id: 1,
    courseName: "Introduction to Computer Science",
    syllabusContent: "Covers programming basics, algorithms, and problem-solving using Python. Includes weekly labs and a final project.",
    instructorId: 11,
  },
  {
    id: 2,
    courseName: "Data Structures and Algorithms",
    syllabusContent: "Focuses on fundamental data structures, algorithm analysis, and practical coding assignments in Java.",
    instructorId: 5,
  },
  {
    id: 3,
    courseName: "Database Systems",
    syllabusContent: "Introduction to relational databases, SQL, normalization, and database design. Includes hands-on projects.",
    instructorId: 5,
  },
  {
    id: 4,
    courseName: "Web Development",
    syllabusContent: "Covers HTML, CSS, JavaScript, and modern frameworks. Students build and deploy a web application.",
    instructorId: 1,
  },
  {
    id: 5,
    courseName: "Software Engineering",
    syllabusContent: "Principles of software design, testing, and project management. Includes a team-based software project.",
    instructorId: 17,
  },
];

const assignments = [
  {
    id: 1,
    assignmentTitle: "Linked List Implementation",
    description: "Implement a singly linked list in Java and provide unit tests for all operations.",
    dueDate: "2025-10-10T18:24:20.893261Z",
    maxPoints: 81,
    courseId: 2,
  },
  {
    id: 2,
    assignmentTitle: "Responsive Portfolio Website",
    description: "Create a personal portfolio website using HTML, CSS, and JavaScript. The site must be responsive and include at least three sections.",
    dueDate: "2025-09-19T18:24:20.893315Z",
    maxPoints: 81,
    courseId: 4,
  },
  {
    id: 3,
    assignmentTitle: "Python Basics Quiz",
    description: "Complete the online quiz covering Python syntax, variables, and control flow.",
    dueDate: "2025-09-20T18:24:20.893363Z",
    maxPoints: 95,
    courseId: 1,
  },
  {
    id: 4,
    assignmentTitle: "Sorting Algorithms Analysis",
    description: "Compare the performance of bubble sort, merge sort, and quicksort on large datasets. Submit a report with your findings.",
    dueDate: "2025-10-14T18:24:20.893407Z",
    maxPoints: 25,
    courseId: 1,
  },
  {
    id: 5,
    assignmentTitle: "Software Requirements Document",
    description: "Write a requirements document for a proposed software project, including user stories and acceptance criteria.",
    dueDate: "2025-09-23T18:24:20.893539Z",
    maxPoints: 48,
    courseId: 5,
  },
  {
    id: 6,
    assignmentTitle: "Binary Search Tree Project",
    description: "Implement a binary search tree in Java and demonstrate insert, delete, and search operations.",
    dueDate: "2025-09-29T18:24:20.893578Z",
    maxPoints: 93,
    courseId: 2,
  },
  {
    id: 7,
    assignmentTitle: "Loops and Functions Lab",
    description: "Write Python programs that use loops and functions to solve basic problems. Submit your code and screenshots of output.",
    dueDate: "2025-10-10T18:24:20.893682Z",
    maxPoints: 66,
    courseId: 1,
  },
  {
    id: 8,
    assignmentTitle: "Database Design Project",
    description: "Design an ER diagram and implement the schema in SQL for a small business scenario.",
    dueDate: "2025-10-13T18:24:20.893722Z",
    maxPoints: 57,
    courseId: 5,
  },
  {
    id: 9,
    assignmentTitle: "Algorithm Complexity Homework",
    description: "Solve problems related to time and space complexity. Show all work and explanations.",
    dueDate: "2025-10-07T18:24:20.893758Z",
    maxPoints: 96,
    courseId: 2,
  },
  {
    id: 10,
    assignmentTitle: "Agile Sprint Retrospective",
    description: "Write a reflection on your team's first agile sprint, including what went well and what could be improved.",
    dueDate: "2025-09-18T18:24:20.893793Z",
    maxPoints: 44,
    courseId: 5,
  },
  {
    id: 11,
    assignmentTitle: "SQL Query Practice",
    description: "Write SQL queries to retrieve and manipulate data from a sample database. Submit your queries and results.",
    dueDate: "2025-09-24T18:24:20.893829Z",
    maxPoints: 14,
    courseId: 3,
  },
  {
    id: 12,
    assignmentTitle: "JavaScript DOM Manipulation",
    description: "Create a web page that uses JavaScript to dynamically update the DOM based on user input.",
    dueDate: "2025-10-04T18:24:20.893864Z",
    maxPoints: 46,
    courseId: 4,
  },
  {
    id: 13,
    assignmentTitle: "Recursion Worksheet",
    description: "Complete problems involving recursion in Java. Submit your code and explanations.",
    dueDate: "2025-10-14T18:24:20.893910Z",
    maxPoints: 26,
    courseId: 2,
  },
  {
    id: 14,
    assignmentTitle: "CSS Flexbox Layout",
    description: "Build a web page layout using CSS Flexbox. The layout should be responsive and visually appealing.",
    dueDate: "2025-10-11T18:24:20.893948Z",
    maxPoints: 37,
    courseId: 2,
  },
  {
    id: 15,
    assignmentTitle: "Final Project Proposal",
    description: "Submit a proposal for your final project, including objectives, technologies, and a timeline.",
    dueDate: "2025-09-30T18:24:20.893983Z",
    maxPoints: 61,
    courseId: 1,
  },
];

const enrollments = [
  { studentId: 20, courseId: 5 },
  { studentId: 4, courseId: 3 },
  { studentId: 9, courseId: 5 },
  { studentId: 19, courseId: 3 },
  { studentId: 2, courseId: 2 },
  { studentId: 13, courseId: 2 },
  { studentId: 2, courseId: 5 },
  { studentId: 13, courseId: 5 },
  { studentId: 7, courseId: 4 },
  { studentId: 7, courseId: 1 },
  { studentId: 20, courseId: 4 },
  { studentId: 12, courseId: 3 },
  { studentId: 4, courseId: 2 },
  { studentId: 4, courseId: 5 },
  { studentId: 9, courseId: 1 },
  { studentId: 19, courseId: 5 },
  { studentId: 9, courseId: 4 },
  { studentId: 2, courseId: 4 },
  { studentId: 13, courseId: 4 },
  { studentId: 12, courseId: 2 },
  { studentId: 20, courseId: 3 },
  { studentId: 12, courseId: 5 },
  { studentId: 4, courseId: 1 },
  { studentId: 4, courseId: 4 },
  { studentId: 9, courseId: 3 },
  { studentId: 19, courseId: 1 },
  { studentId: 2, courseId: 3 },
  { studentId: 13, courseId: 3 },
  { studentId: 7, courseId: 5 },
  { studentId: 20, courseId: 2 },
];

const submissions = [
  {
    id: 1,
    filePath: "/successful/police/sound.pdf",
    submissionDate: "2025-09-13T18:24:20.898066Z",
    assignmentId: 3,
    studentId: 4,
  },
  {
    id: 2,
    filePath: "/magazine/gas/senior.pdf",
    submissionDate: "2025-09-15T18:24:20.898122Z",
    assignmentId: 1,
    studentId: 7,
  },
  {
    id: 3,
    filePath: "/will/check/type.pdf",
    submissionDate: "2025-09-10T18:24:20.898152Z",
    assignmentId: 4,
    studentId: 20,
  },
  {
    id: 4,
    filePath: "/consumer/maybe/fund.pdf",
    submissionDate: "2025-09-12T18:24:20.898180Z",
    assignmentId: 14,
    studentId: 7,
  },
  {
    id: 5,
    filePath: "/yourself/they/cup.pdf",
    submissionDate: "2025-09-16T18:24:20.898207Z",
    assignmentId: 11,
    studentId: 13,
  },
  {
    id: 6,
    filePath: "/response/knowledge/stock.pdf",
    submissionDate: "2025-09-09T18:24:20.898233Z",
    assignmentId: 2,
    studentId: 19,
  },
  {
    id: 7,
    filePath: "/store/us/model.pdf",
    submissionDate: "2025-09-15T18:24:20.898260Z",
    assignmentId: 8,
    studentId: 2,
  },
  {
    id: 8,
    filePath: "/of/mean/move.pdf",
    submissionDate: "2025-09-07T18:24:20.898286Z",
    assignmentId: 8,
    studentId: 12,
  },
  {
    id: 9,
    filePath: "/father/safe/vote.pdf",
    submissionDate: "2025-09-13T18:24:20.898312Z",
    assignmentId: 3,
    studentId: 19,
  },
  {
    id: 10,
    filePath: "/serve/tell/road.pdf",
    submissionDate: "2025-09-09T18:24:20.898337Z",
    assignmentId: 1,
    studentId: 4,
  },
  {
    id: 11,
    filePath: "/stuff/customer/each.pdf",
    submissionDate: "2025-09-16T18:24:20.898363Z",
    assignmentId: 2,
    studentId: 9,
  },
  {
    id: 12,
    filePath: "/suddenly/mission/various.pdf",
    submissionDate: "2025-09-17T18:24:20.898390Z",
    assignmentId: 7,
    studentId: 12,
  },
  {
    id: 13,
    filePath: "/hair/medical/item.pdf",
    submissionDate: "2025-09-07T18:24:20.898416Z",
    assignmentId: 8,
    studentId: 4,
  },
  {
    id: 14,
    filePath: "/animal/true/between.pdf",
    submissionDate: "2025-09-17T18:24:20.898442Z",
    assignmentId: 2,
    studentId: 20,
  },
  {
    id: 15,
    filePath: "/south/enough/serve.pdf",
    submissionDate: "2025-09-10T18:24:20.898468Z",
    assignmentId: 6,
    studentId: 20,
  },
  {
    id: 16,
    filePath: "/yes/sure/security.pdf",
    submissionDate: "2025-09-14T18:24:20.898494Z",
    assignmentId: 14,
    studentId: 20,
  },
  {
    id: 17,
    filePath: "/environmental/other/military.pdf",
    submissionDate: "2025-09-13T18:24:20.898520Z",
    assignmentId: 13,
    studentId: 7,
  },
  {
    id: 18,
    filePath: "/nor/stage/build.pdf",
    submissionDate: "2025-09-12T18:24:20.898546Z",
    assignmentId: 11,
    studentId: 9,
  },
  {
    id: 19,
    filePath: "/employee/field/bag.pdf",
    submissionDate: "2025-09-12T18:24:20.898572Z",
    assignmentId: 14,
    studentId: 19,
  },
  {
    id: 20,
    filePath: "/continue/past/material.pdf",
    submissionDate: "2025-09-14T18:24:20.898607Z",
    assignmentId: 9,
    studentId: 19,
  },
  {
    id: 21,
    filePath: "/natural/serious/theory.pdf",
    submissionDate: "2025-09-15T18:24:20.898634Z",
    assignmentId: 11,
    studentId: 12,
  },
  {
    id: 22,
    filePath: "/through/education/through.pdf",
    submissionDate: "2025-09-16T18:24:20.898660Z",
    assignmentId: 1,
    studentId: 13,
  },
  {
    id: 23,
    filePath: "/best/consumer/condition.pdf",
    submissionDate: "2025-09-07T18:24:20.898686Z",
    assignmentId: 4,
    studentId: 20,
  },
  {
    id: 24,
    filePath: "/despite/choice/thank.pdf",
    submissionDate: "2025-09-11T18:24:20.898711Z",
    assignmentId: 12,
    studentId: 19,
  },
  {
    id: 25,
    filePath: "/those/hand/somebody.pdf",
    submissionDate: "2025-09-08T18:24:20.898737Z",
    assignmentId: 12,
    studentId: 12,
  },
];

const grades = [
  {
    id: 1,
    score: 69.47,
    feedback: "Us professional compare rise.",
    gradingDate: "2025-09-12T18:24:20.899301Z",
    submissionId: 15,
  },
  {
    id: 2,
    score: 90.62,
    feedback: "Type bit on.",
    gradingDate: "2025-09-13T18:24:20.899422Z",
    submissionId: 24,
  },
  {
    id: 3,
    score: 7.65,
    feedback: "You need to review the basics. Please revisit the lecture notes and seek help during office hours.",
    gradingDate: "2025-09-15T18:24:20.899441Z",
    submissionId: 1,
  },
  {
    id: 4,
    score: 1.67,
    feedback: "Your analysis is incomplete. Please provide more detailed explanations and check your calculations.",
    gradingDate: "2025-09-17T18:24:20.899457Z",
    submissionId: 16,
  },
  {
    id: 5,
    score: 3.06,
    feedback: "Your submission was missing key requirements. Please follow the assignment instructions more closely.",
    gradingDate: "2025-09-15T18:24:20.899473Z",
    submissionId: 12,
  },
  {
    id: 6,
    score: 21.59,
    feedback: "Some parts of your code work, but there are logical errors. Please debug and resubmit.",
    gradingDate: "2025-09-15T18:24:20.899489Z",
    submissionId: 10,
  },
  {
    id: 7,
    score: 59.03,
    feedback: "Good effort! Most of your answers are correct, but double-check your work for minor mistakes.",
    gradingDate: "2025-09-15T18:24:20.899504Z",
    submissionId: 25,
  },
  {
    id: 8,
    score: 6.31,
    feedback: "You attempted all questions, but your code does not run as expected. Please test your solutions.",
    gradingDate: "2025-09-13T18:24:20.899519Z",
    submissionId: 7,
  },
  {
    id: 9,
    score: 62.52,
    feedback: "Great job! Your explanations are clear and your code is well-documented.",
    gradingDate: "2025-09-17T18:24:20.899533Z",
    submissionId: 14,
  },
  {
    id: 10,
    score: 51.36,
    feedback: "You met the requirements, but your code could be more efficient. Consider optimizing your solution.",
    gradingDate: "2025-09-12T18:24:20.899548Z",
    submissionId: 5,
  },
  {
    id: 11,
    score: 58.45,
    feedback: "Excellent work! You demonstrated a strong understanding of the material.",
    gradingDate: "2025-09-13T18:24:20.899563Z",
    submissionId: 11,
  },
  {
    id: 12,
    score: 48.97,
    feedback: "Your SQL queries are mostly correct, but a few results are missing. Please review JOIN operations.",
    gradingDate: "2025-09-17T18:24:20.899578Z",
    submissionId: 18,
  },
  {
    id: 13,
    score: 9.14,
    feedback: "You struggled with recursion. Please review the examples discussed in class.",
    gradingDate: "2025-09-14T18:24:20.899613Z",
    submissionId: 6,
  },
  {
    id: 14,
    score: 7.6,
    feedback: "Your CSS layout works, but could be improved for better responsiveness.",
    gradingDate: "2025-09-16T18:24:20.899637Z",
    submissionId: 23,
  },
  {
    id: 15,
    score: 45.68,
    feedback: "Your project proposal is creative, but lacks a clear timeline. Please revise and resubmit.",
    gradingDate: "2025-09-14T18:24:20.899657Z",
    submissionId: 4,
  },
  {
    id: 16,
    score: 5.45,
    feedback: "You did not submit all required files. Please ensure all parts are included next time.",
    gradingDate: "2025-09-12T18:24:20.899673Z",
    submissionId: 19,
  },
  {
    id: 17,
    score: 60.66,
    feedback: "Good job reflecting on your team's sprint. Your feedback is constructive and actionable.",
    gradingDate: "2025-09-12T18:24:20.899689Z",
    submissionId: 20,
  },
  {
    id: 18,
    score: 78.18,
    feedback: "Your code is well-structured and your report is thorough. Keep up the good work!",
    gradingDate: "2025-09-14T18:24:20.899704Z",
    submissionId: 3,
  },
  {
    id: 19,
    score: 30.97,
    feedback: "You answered most questions correctly, but missed a few key concepts. Review the assignment rubric.",
    gradingDate: "2025-09-13T18:24:20.899719Z",
    submissionId: 2,
  },
  {
    id: 20,
    score: 53.4,
    feedback: "Excellent! You exceeded expectations on this assignment.",
    gradingDate: "2025-09-15T18:24:20.899734Z",
    submissionId: 17,
  },
];


(async () => {
  try {
    console.log("Seeding users...");
    await prisma.$transaction(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: { email: user.email! },
          update: {
            username: user.username ?? "",
            passwordHash: user.passwordHash ?? "",
            role: user.role,
          },
          create: {
            id: user.id,
            username: user.username ?? "",
            email: user.email!,
            passwordHash: user.passwordHash ?? "",
            role: user.role,
          },
        }),
      ),
    );

    console.log("Seeding courses...");
    await prisma.$transaction(
      courses.map((course) =>
        prisma.course.upsert({
          where: { id: course.id },
          update: course,
          create: course,
        }),
      ),
    );

    console.log("Seeding assignments...");
    await prisma.$transaction(
      assignments.map((assignment) =>
        prisma.assignment.upsert({
          where: { id: assignment.id },
          update: assignment,
          create: assignment,
        }),
      ),
    );

    console.log("Seeding enrollments...");
    await prisma.$transaction(
      enrollments.map((enrollment) =>
        prisma.enrollment.upsert({
          where: {
            studentId_courseId: {
              studentId: enrollment.studentId,
              courseId: enrollment.courseId,
            },
          },
          update: {},
          create: enrollment,
        }),
      ),
    );

    console.log("Seeding submissions...");
    await prisma.$transaction(
      submissions.map((submission) =>
        prisma.submission.upsert({
          where: { id: submission.id },
          update: submission,
          create: submission,
        }),
      ),
    );

    console.log("Seeding grades...");
    await prisma.$transaction(
      grades.map((grade) =>
        prisma.grade.upsert({
          where: { id: grade.id },
          update: grade,
          create: grade,
        }),
      ),
    );

    console.log("✅ Seed complete!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();