import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository }                                                          from 'typeorm';
import { InjectRepository }                                                    from '@nestjs/typeorm';
import { Project }                                                             from '@modules/project/entities/project.entity';
import { createDtoToEntityMapper }                                             from '@modules/project/mapper/createDtoToEntity.mapper';
import { CreateProjectDto }                                                    from './dto/create-project.dto';
import { UpdateProjectDto }                                                    from './dto/update-project.dto';
import { PaginationDto }                                                       from '@common/dto/pagination.dto';

@Injectable()
export class ProjectService {

  private readonly logger: Logger = new Logger(ProjectService.name);

  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.findOneBy([{prefix: createProjectDto.prefix}, {clientId: createProjectDto.clientId}]);

    if (project)
      throw new InternalServerErrorException('Project already exists with this prefix and client');

    const newProject = this.projectRepository.create(createDtoToEntityMapper(createProjectDto));

    return await this.projectRepository.save(newProject);
  }

  findAll(paginationDto: PaginationDto): Promise<Array<Project>> {
    const {limit = 10, offset = 0} = paginationDto;
    return this.projectRepository.find({
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC'
      }
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOneBy({id});

    if (!project)
      throw new NotFoundException('Project not found');

    return project;
  }

  async findOneByPrefix(prefix: string) {
    const project = await this.projectRepository.findOneBy({prefix});

    if (!project)
      throw new NotFoundException('Project not found');

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.preload({
      id,
      ...updateProjectDto
    });
    if (!project)
      throw new NotFoundException('Project not found');

    return await this.projectRepository.save(project);
  }

  async remove(id: string): Promise<Project> {
    const project = await this.findOne(id);
    if (!project)
      throw new NotFoundException('Project not found');

    return this.projectRepository.softRemove(project);
  }

  async disabled(id: string, active = false): Promise<Project> {
    const project = await this.findOne(id);
    if (!project)
      throw new NotFoundException('Project not found');

    if (project.active === active)
      throw new InternalServerErrorException('Project already ' + (active ? 'enabled' : 'disabled'));

    project.active = active;

    return this.projectRepository.save(project);
  }

  getComments(id: string) {
    console.log(id);
  }

  addComment(id: string, comment: string) {
    console.log(id, comment);
  }

  addCommentReply(id: string, commentId: string, reply: string) {
    console.log(id, commentId, reply);
  }

  removeComment(id: string, commentId: string) {
    console.log(id, commentId);
  }
}
