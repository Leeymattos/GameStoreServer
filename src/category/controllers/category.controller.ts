import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Category } from "src/category/entities/category.entity";
import { CategoryService } from "src/category/services/category.service";
import { DeleteResult } from "typeorm";

@Controller('/category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    callCreate(@Body() category: Category): Promise<Category> {
        return this.categoryService.create(category)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    callFindAll(): Promise<Category[]> {
        return this.categoryService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    callFindById(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
        return this.categoryService.findById(id)
    }

    @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    callFindByName(@Param('name') name: string): Promise<Category[]> {
        return this.categoryService.findByName(name);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    callUpdate(@Body() category: Category): Promise<Category> {
        return this.categoryService.update(category)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    callDelete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
        return this.categoryService.delete(id)
    }




}
