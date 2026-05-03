export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  options: RegisterAdditionalOptions
}

interface RegisterAdditionalOptions {
  data: {
    username: string
  }
}
