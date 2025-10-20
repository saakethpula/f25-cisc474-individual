import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.course.findMany();
    }
    findOne(id: number) {
        return this.prisma.course.findUnique({
            where: { id }
        });
    }

    async create(body: any) {
        const created = await this.prisma.course.create({ data: body as any });
        return created;
    }

    async update(id: number, body: any) {
        const existing = await this.prisma.course.findUnique({ where: { id } });
        if (!existing) throw new NotFoundException(`Course ${id} not found`);
        return this.prisma.course.update({ where: { id }, data: body as any });
    }

    async remove(id: number) {
        const existing = await this.prisma.course.findUnique({ where: { id } });
        if (!existing) throw new NotFoundException(`Course ${id} not found`);
        return this.prisma.course.delete({ where: { id } });
    }

}

