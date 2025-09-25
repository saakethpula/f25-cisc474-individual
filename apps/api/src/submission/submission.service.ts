import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.submission.findMany();
  }
}

