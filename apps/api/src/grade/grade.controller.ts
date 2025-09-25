import { Controller, Get } from '@nestjs/common';
import { GradeService } from './grade.service';
@Controller('grade')
export class GradeController {
    constructor(private gradeService: GradeService) { }

    @Get()
    findAll() {
        return this.gradeService.findAll();
    }
}
