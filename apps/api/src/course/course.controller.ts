import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) { }

    @Get()
    findAll() {
        return this.courseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(+id);
    }
}
