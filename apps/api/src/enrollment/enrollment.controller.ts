import { Controller, Get } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
@Controller('enrollment')
export class EnrollmentController {
    constructor(private enrollmentService: EnrollmentService) { }

    @Get()
    findAll() {
        return this.enrollmentService.findAll();
    }
}
