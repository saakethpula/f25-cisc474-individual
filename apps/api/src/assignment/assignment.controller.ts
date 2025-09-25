import { Controller, Get } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
@Controller('assignment')
export class AssignmentController {
    constructor(private assignmentService: AssignmentService) { }

    @Get()
    findAll() {
        return this.assignmentService.findAll();
    }
}
