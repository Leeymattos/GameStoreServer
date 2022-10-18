import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "src/category/controllers/category.controller";
import { CategoryService } from "src/category/services/category.service";
import { Category } from "./entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [TypeOrmModule]
})
export class CategoryModule {

}