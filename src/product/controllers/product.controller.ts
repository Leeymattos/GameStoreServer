import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { Product } from "../entities/product.entity";
import { productService } from "../services/product.service";

@Controller('/product')
export class ProductController {
    constructor(
        private readonly productService: productService
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    callCreate(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    callFindAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    callFindById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
        return this.productService.findById(id);
    }

    @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    callFindByName(@Param('name') name: string): Promise<Product[]> {
        return this.productService.findByName(name);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    callUpdate(@Body() product: Product): Promise<Product> {
        return this.productService.update(product);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    callDelete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
        return this.productService.delete(id);
    }


}