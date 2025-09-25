import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GradeService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.grade.findMany();
    }
}

