import {IsString, IsInt, IsNotEmpty, IsArray} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsArray()
    readonly ids: string[];

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsInt()
    readonly totalPrice: number;
}
