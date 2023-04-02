import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository }                                                    from '@nestjs/typeorm';
import { Repository }                                                          from 'typeorm';
import { PageDto }                                                             from '@common/dto/page.dto';
import { PageOptionsDto }                                                      from '@common/dto/page-options.dto';
import { PageMetaDto }                                                         from '@common/dto/page-meta.dto';
import { Project }                                                             from '@modules/project/entities/project.entity';
import { createDtoToEntityMapper }                                             from '@modules/project/mapper/createDtoToEntity.mapper';
import { CreateProjectDto }                                                    from './dto/create-project.dto';
import { UpdateProjectDto }                                                    from './dto/update-project.dto';

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

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>> {
    const queryBuilder = this.projectRepository.createQueryBuilder('project');

    queryBuilder
      .orderBy('project.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const {entities} = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<Project> {
    // search only one project with comments as realtions
    const project = await this.projectRepository.findOneBy({id});

    if (!project)
      throw new NotFoundException('Project not found');

    return project;
  }

  async findOneWithRelations(id: string) {
    const project = await this.projectRepository.findOne({where: {id}, relations: ['comments']});

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
}
