
import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { UpdateMessageDto } from '@repo/api/message/dto/update-message.dto';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) { }

    @Get()
    findAll() {
        return this.messageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.messageService.findOne(+id);
    }

    @Patch(':id')
    updateStatus(@Param('id') id: string, @Body() dto: UpdateMessageDto) {
        return this.messageService.updateStatus(+id, dto.status);
    }
}
