-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('STUDENT', 'INSTRUCTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."MessageStatus" AS ENUM ('UNREAD', 'READ', 'ARCHIVED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" SERIAL NOT NULL,
    "courseName" TEXT NOT NULL,
    "syllabusContent" TEXT,
    "instructorId" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Enrollment" (
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("studentId","courseId")
);

-- CreateTable
CREATE TABLE "public"."Assignment" (
    "id" SERIAL NOT NULL,
    "assignmentTitle" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "maxPoints" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Submission" (
    "id" SERIAL NOT NULL,
    "filePath" TEXT NOT NULL,
    "submissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignmentId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Grade" (
    "id" SERIAL NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "feedback" TEXT,
    "gradingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submissionId" INTEGER NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."MessageStatus" NOT NULL DEFAULT 'UNREAD',
    "senderId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "parentMessageId" INTEGER,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_submissionId_key" ON "public"."Grade"("submissionId");

-- AddForeignKey
ALTER TABLE "public"."Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "public"."Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grade" ADD CONSTRAINT "Grade_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "public"."Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_parentMessageId_fkey" FOREIGN KEY ("parentMessageId") REFERENCES "public"."Message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
