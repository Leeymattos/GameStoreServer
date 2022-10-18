import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/product/entities/product.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class productService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async create(product: Product): Promise<Product> {
        return await this.productRepository.save(product)
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find()
    }

    async findById(id: string): Promise<Product> {
        const productExists = await this.productRepository.findOne({
            where: {
                id
            }
        })

        if (!productExists) {
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        }

        return productExists
    }

    async findByName(name: string): Promise<Product[]> {
        return await this.productRepository.find({
            where: {
                name: ILike(`%${name}%`)
            }
        })

    }

    async update(product: Product): Promise<Product> {
        const productExists = await this.findById(product.id);

        if (!productExists || !product.id) {
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND)
        }

        return await this.productRepository.save(product)
    }

    async delete(id: string): Promise<DeleteResult> {
        const productExists = await this.findById(id)

        if (!productExists) {
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND)
        }

        return await this.productRepository.delete(id)
    }

}