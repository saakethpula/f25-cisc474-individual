import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EnrollmentService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.enrollment.findMany();
    }
    findOne(studentId: number) {
        return this.prisma.enrollment.findMany({
            where: { studentId }
        });
    }
}

