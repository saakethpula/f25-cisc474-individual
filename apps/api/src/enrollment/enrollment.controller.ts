import { Controller, Get, Param } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
@Controller('enrollment')
export class EnrollmentController {
    constructor(private enrollmentService: EnrollmentService) { }

    @Get()
    findAll() {
        return this.enrollmentService.findAll();
    }

    @Get(':studentId')
    findOne(@Param('studentId') studentId: string) {
        return this.enrollmentService.findOne(+studentId);
    }
}
