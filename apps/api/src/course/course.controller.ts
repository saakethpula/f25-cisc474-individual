import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('course')
@UseGuards(AuthGuard('jwt'))
export class CourseController {
    constructor(private courseService: CourseService) { }

    @Get()
    findAll(@CurrentUser() user: any) {
        console.log('Current user:', user);
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
