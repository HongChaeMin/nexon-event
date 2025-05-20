import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { BusinessHttpException, ValidateExceptionType } from '../exception';

export class GlobalValidationPipe extends ValidationPipe {
  public createExceptionFactory() {
    return (errors: ValidationError[]) => {
      const extractionErrors = this.extractionValidationErrors(errors);
      return new BusinessHttpException(extractionErrors);
    };
  }

  private extractionValidationErrors(
    errors: ValidationError[],
  ): ValidateExceptionType[] {
    return errors.map(({ property, target, constraints }) => {
      const constraintEntries = constraints ? Object.entries(constraints) : [];
      const [firstConstraintKey, firstConstraintValue] = constraintEntries[0] || [];

      const code = this.getCode(
        property,
        target?.constructor?.name || 'UnknownClass',
        firstConstraintKey || 'unknown'
      );

      return {
        code,
        target: property,
        message: firstConstraintValue || 'Validation failed',
      };
    });
  }

  private getCode(target: string, className: string, constraint: string) {
    return `${this.camelToSnake(target)}.${this.camelToSnake(constraint)}.${this.camelToSnake(className)}`;
  }

  private camelToSnake(str: string) {
    return str
      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
      .replace(/^-/, '');
  }
}
