import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs';

@Injectable()
export class TransformInterceptor<T extends Type<any>>
  implements NestInterceptor
{
  constructor(private readonly type: T) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        return plainToClass(this.type, data);
      }),
    );
  }
}
