import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';



export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

}



export class findProductByIdDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    id: number;
}


export class findProductByCodeDto {
    @IsString()
    @IsNotEmpty()
    code: string;
}