export class Constants {
  static readonly BASE_URL = process.env.BASE_URL ?? 'https://api.demoblaze.com';
  static readonly API_BASE_URL = process.env.API_BASE_URL ?? '';
  static readonly API_KEY = process.env.API_KEY ?? '';
  static readonly USERNAME = process.env.USERNAME ?? 'hoang-demo';
  static readonly PASSWORD = process.env.PASSWORD ?? '123456';
}
