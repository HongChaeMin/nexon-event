export class LoginMemberResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;

  static of(member: any, token: string) {
    const response = new LoginMemberResponse();
    response.id = member.id;
    response.email = member.email;
    response.name = member.name;
    response.role = member.role;
    response.token = token;
    return response;
  }
}
