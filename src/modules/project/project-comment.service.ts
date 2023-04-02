import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }              from '@nestjs/typeorm';
import { Repository }                    from 'typeorm';
import { ProjectComment }                from '@modules/project/entities';
import { ProjectService }                from '@modules/project/project.service';
import { CreateCommentDto }              from '@modules/comment/dto/create-comment.dto';
import { Comment }                       from '@modules/comment/entities/comment.entity';

@Injectable()
export class ProjectCommentService {
  constructor(
    @InjectRepository(ProjectComment) private readonly projectCommentRepository: Repository<ProjectComment>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    private readonly projectService: ProjectService
  ) {}

  async create(projectId: string, createCommentDto: CreateCommentDto) {
    const project = await this.projectService.findOne(projectId);

    if (!project)
      throw new NotFoundException('Project not found');

    const projectComment = this.projectCommentRepository.create({
      project,
      ...(this.commentRepository.create(createCommentDto))
    });

    return this.projectCommentRepository.save(projectComment);
  }

  async findAllByProjectId(projectId: string) {
    const comment = await this.projectCommentRepository.findBy({project: {id: projectId}});

    if (!comment || !comment.length)
      throw new NotFoundException('Comment not found');

    return comment;
  }

  findAll() {
    return `This action returns all projectComment`;
  }

  findOne(id: number) {
    return `This action returns a #${ id } projectComment`;
  }

  update(id: number) {
    return `This action updates a #${ id } projectComment`;
  }

  remove(id: number) {
    return `This action removes a #${ id } projectComment`;
  }

  addCommentReply(id: string, commentId: string, reply: string) {
    console.log(id, commentId, reply);
  }

  removeComment(id: string, commentId: string) {
    console.log(id, commentId);
  }
}
