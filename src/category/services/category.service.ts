import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/category/entities/category.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    async create(category: Category): Promise<Category> {
        return await this.categoryRepository.save(category);
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findById(id: string): Promise<Category> {
        const categoryExists = await this.categoryRepository.findOne({
            where: {
                id
            }
        });

        if (!categoryExists) {
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)
        }

        return categoryExists

    }

    async findByName(name: string): Promise<Category[]> {
        return await this.categoryRepository.find({
            where: {
                name: ILike(`%${name}%`)
            }
        })
    }

    async update(category: Category): Promise<Category> {

        const categoryExists = await this.findById(category.id);

        if (!categoryExists || !category.id) {
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
        }

        return this.categoryRepository.save(category)
    }

    async delete(id: string): Promise<DeleteResult> {
        const categoryExists = await this.categoryRepository.findOne({
            where: {
                id
            }
        });

        if (!categoryExists) {
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)
        }

        return await this.categoryRepository.delete(id);


    }

}



