import { Injectable }              from '@nestjs/common';
import { CreateProjectDto }        from './dto/create-project.dto';
import { UpdateProjectDto }        from './dto/update-project.dto';
import { Repository }              from 'typeorm';
import { Project }                 from '@modules/project/entities/project.entity';
import { createDtoToEntityMapper } from '@modules/project/mapper/createDtoToEntity.mapper';
import { InjectRepository }        from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    console.log(createProjectDto);
    const project = this.projectRepository.create(createDtoToEntityMapper(createProjectDto));
    this.projectRepository.save(project).then((project) => console.log(project));
    return 'This action adds a new project';
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: string) {
    return `This action returns a #${ id } project`;
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${ id } project`;
  }

  remove(id: string) {
    return `This action removes a #${ id } project`;
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

  getComments(id: string) {
    console.log(id);
  }
}
