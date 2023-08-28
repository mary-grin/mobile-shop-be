import {
    IsString,
    IsInt,
    IsNotEmpty,
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint, ValidatorConstraintInterface
} from 'class-validator';
import {Color, Memory} from "../types";
import {Type} from "class-transformer";

@ValidatorConstraint({ name: 'isValidMemory', async: false })
class IsValidMemoryConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const memoryOptions: Memory[] = ['1Tb', '512Gb', '256Gb', '128Gb'];
        return memoryOptions.includes(value);
    }

    defaultMessage(args: ValidationArguments) {
        return `Invalid memory option. Valid options are: ${['1Tb', '512Gb', '256Gb', '128Gb'].join(', ')}`;
    }
}

export function IsValidMemory(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidMemoryConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'isValidColor', async: false })
class IsValidColorConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const colorOptions: string[] = ['black', 'gold', 'purple'];
        return colorOptions.includes(value);
    }

    defaultMessage(args: ValidationArguments) {
        return `Invalid color option. Valid options are: ${['black', 'gold', 'purple'].join(', ')}`;
    }
}

export function IsValidColor(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidColorConstraint,
        });
    };
}

export class CreateMobileDeviceDto {
    @IsNotEmpty()
    @IsString()
    readonly model: string;

    @IsNotEmpty()
    @IsInt()
    readonly actualPrice: number;

    @IsNotEmpty()
    @IsInt()
    readonly oldPrice: number | null;

    @IsNotEmpty()
    @IsString()
    @IsValidMemory()
    @Type(() => String)
    readonly memory: Memory;

    @IsNotEmpty()
    @IsString()
    readonly image: string;

    @IsNotEmpty()
    @IsString()
    @IsValidColor()
    readonly color: Color;
}
