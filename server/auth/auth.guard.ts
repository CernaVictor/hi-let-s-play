import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from 'common/types';
import { getToken } from 'next-auth/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return validateRequest(request);
  }
}

const validateRequest = async (req: AuthenticatedRequest) => {
  const token = await getToken({
    req,
  });
  if (token) {
    req.token = token;
  }
  return !!token;
};
