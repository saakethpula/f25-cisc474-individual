import { Injectable } from '@nestjs/common';

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) {}

  findAll(){
    return this.prisma.submission.findMany();
  }
}