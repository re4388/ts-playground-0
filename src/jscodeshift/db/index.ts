import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import { DbConfig } from './definition'
import { ModelUser } from './model/user'


class Rdb {s
  config: DbConfig
  client: Connection
  tag = 'db/'
  user: ModelUser
  async connect(config: DbConfig, needSync: boolean) {
    const tag = this.tag + 'connect'
    this.config = {
      ...config,
      entities: ['infra/entities/*.js'],
      type: 'postgres',
      name: 'hermes'
    }
    try {
      const connectionConfig: ConnectionOptions = {
        ...this.config,
        cache: this.config.redis
          ? {
            type: 'redis',
            options: {
              host: this.config.redis.host,
              password: this.config.redis.password || undefined,
              port: 6379
            }
          }
          : undefined
      }
      this.client = await createConnection(connectionConfig)
      if (needSync === true) {
        logger.info('sync')
        await this.client.createQueryRunner().createSchema(<string>config.schema, true)
        await this.client.synchronize(true)
      }
      this.user = new ModelUser(this.client)


      logger.info({ tag, msg: 'done' })

      return this.client
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async disconnect() {
    const tag = this.tag + 'disconnect'
    try {
      logger.info({ tag, msg: 'disconnect' })
      if (this.client !== undefined) await this.client.close()
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  /**
   * Readiness使用, reUse DbConnection 狀態
   * 下一個 simpleQuery, 若能正常 -> 視為 Ready
   * 其他狀況視為Error
   */
  async checkConnection() {
    const tag = this.tag + 'checkConnection'
    try {
      if (this.client !== undefined) {
        await this.client.query('SELECT 1') // HermesDB simple Query
        return true
      }
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  transaction: Connection['transaction'] = async (options: any) => {
    return this.client.transaction(options)
  }
}

export = new Rdb()
