import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { SubmissionModule } from './submission/submission.module';
import { MessageModule } from './message/message.module';
import { GradeModule } from './grade/grade.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { CourseModule } from './course/course.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [LinksModule, UserModule, SubmissionModule, MessageModule, GradeModule, EnrollmentModule, CourseModule, AssignmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
