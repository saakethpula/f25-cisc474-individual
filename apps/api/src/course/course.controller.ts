import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
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

    @Post()
    create(@Body() body: any) {
        return this.courseService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.courseService.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.courseService.remove(+id);
    }
}
