import { prisma } from "./client";
import type { User, Course, Assignment, Enrollment, Submission, Grade, Message } from "../generated/client";

// --- Load Seed Data from JSON Files ---
const users: Array<Partial<User>> = require('./users.json');
const courses: Course[] = require('./courses.json');
const assignments: Assignment[] = require('./assignments.json');
const enrollments: Enrollment[] = require('./enrollments.json');
const submissions: Submission[] = require('./submissions.json');
const grades: Grade[] = require('./grades.json');
const messages: Message[] = require('./messages.json');


(async () => {
  try {
    console.log("Seeding users...");
    await prisma.$transaction(
      users.map((user) =>
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

    console.log("Seeding messages...");
    await prisma.$transaction(
      messages.map((message) =>
        prisma.message.upsert({
          where: { id: message.id },
          update: message,
          create: message,
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