import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { PaginationDto }                                                           from '@common/dto/pagination.dto';
import { CreateProjectDto }                                                        from './dto/create-project.dto';
import { UpdateProjectDto }                                                        from './dto/update-project.dto';
import { ProjectService }                                                          from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.projectService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.findOne(id);
  }

  @Get('prefix/:prefix')
  findOneByPrefix(@Param('prefix') prefix: string) {
    return this.projectService.findOneByPrefix(prefix);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Patch(':id/disable')
  disabled(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.disabled(id, false);
  }

  @Patch(':id/enable')
  enable(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.disabled(id, true);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.remove(id);
  }

  @Get(':id/comment')
  getComments(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.getComments(id);
  }

  @Post(':id/comment')
  addComment(@Param('id', ParseUUIDPipe) id: string, @Body('comment') comment: string) {
    return this.projectService.addComment(id, comment);
  }
}
