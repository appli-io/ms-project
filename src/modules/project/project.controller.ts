import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors
}                                from '@nestjs/common';
import { ApiTags }               from '@nestjs/swagger';
import { PageDto }               from '@common/dto/page.dto';
import { PageOptionsDto }        from '@common/dto/page-options.dto';
import { Project }               from '@modules/project/entities';
import { ProjectCommentService } from '@modules/project/project-comment.service';
import { CreateCommentDto }      from '@modules/comment/dto/create-comment.dto';
import { CreateProjectDto }      from './dto/create-project.dto';
import { UpdateProjectDto }      from './dto/update-project.dto';
import { ProjectService }        from './project.service';

@Controller('project')
@ApiTags('Projects')
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
  constructor(private readonly projectService: ProjectService,
              private readonly projectCommentService: ProjectCommentService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>> {
    return this.projectService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.findOne(id);
  }

  @Get('prefix/:prefix')
  findOneByPrefix(@Param('prefix') prefix: string) {
    return this.projectService.findOneByPrefix(prefix);
  }

  @Get(':id/full')
  findOneFull(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.findOneWithRelations(id);
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
    return this.projectCommentService.findAllByProjectId(id);
  }

  @Post(':id/comment')
  addComment(@Param('id', ParseUUIDPipe) id: string, @Body() comment: CreateCommentDto) {
    return this.projectCommentService.create(id, comment);
  }
}
