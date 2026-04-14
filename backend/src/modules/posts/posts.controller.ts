import { Request, Response, NextFunction } from 'express';
import { PostsService } from './posts.service';

export class PostsController {
  private service: PostsService;

  constructor() {
    this.service = new PostsService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getAllPosts(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const post = await this.service.getPostBySlug(slug);
      res.json(post);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const post = await this.service.getPostById(id);
      res.json(post);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorId = (req as any).user?.id || 'admin'; 
      const post = await this.service.createPost(req.body, authorId);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.deletePost(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
