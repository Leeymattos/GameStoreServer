import { IsNotEmpty } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_produtos' })
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @IsNotEmpty()
    @Column({ length: 150, nullable: false })
    name: string;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    value: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Category, (category) => category.product)
    category: Category
}