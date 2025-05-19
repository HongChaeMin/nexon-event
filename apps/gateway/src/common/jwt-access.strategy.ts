import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtConfig } from '@repo-types/auth';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (request) => {
        return request.headers.auth;
      },
      secretOrKey: JwtConfig.secret,
    });
  }

  validate(payload) {
    return { id: payload.id };
  }
}
