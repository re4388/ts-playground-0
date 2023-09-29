export interface DbConfig {
  name: string
  type: 'postgres'
  host: string
  port: number
  database: string
  username: string
  password: string
  schema: string
  entities?: [string]
  redis?: {
    host: string
    password?: string
  }
}
