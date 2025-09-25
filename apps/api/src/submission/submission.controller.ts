
import { Controller, Get } from '@nestjs/common';
import { SubmissionService } from './submission.service';
@Controller('submission')
export class SubmissionController {
    constructor(private submissionService: SubmissionService) { }

    @Get()
    findAll() {
        return this.submissionService.findAll();
    }
}
