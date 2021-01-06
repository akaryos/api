declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string
    AWS_S3_BUCKET: string
  }
}
