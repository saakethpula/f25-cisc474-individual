import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.message.findMany();
    }

    findOne(id: number) {
        return this.prisma.message.findUnique({
            where: { id }
        });
    }

    async updateStatus(id: number, status: 'READ' | 'UNREAD') {
        return this.prisma.message.update({
            where: { id },
            data: { status },
        });
    }
}

