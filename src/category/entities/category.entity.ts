import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from 'class-validator'
import { Product } from "src/product/entities/product.entity";

@Entity({ name: 'tb_categories' })
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @IsNotEmpty()
    @Column({ length: 150, nullable: false })
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Product, (product) => product.category)
    product: Product[]
}