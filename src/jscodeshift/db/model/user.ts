import R, { isNil } from 'ramda'
import { Connection, EntityManager, Repository } from 'typeorm'
import { User } from '../../../infra/entities'
import { UserEventType } from '../../../infra/entities/UserEvent'
import { userStatusType } from '../../../infra/enums/user'
import { InvoiceSettingVO, UserByIdcardVO } from '../definition'


export class ModelUser {
  client: Connection
  tag = 'db/user/'

  constructor(client: Connection) {
    this.client = client
  }

  async getUserInfo(userId: string): Promise<{ id: string; contactEmail: string; email: string; address: string }> {
    const tag = this.tag + 'getUserInfo'
    try {
      const selects = ['user.contactEmail', 'user.email', 'user.id', 'user.address']
      const ret = await this.client.getRepository(User).createQueryBuilder('user').select(selects).where('user.id = :id', { id: userId }).getOne()
      if (ret === undefined) throw new Error('user is not found')
      const { id, contactEmail, email, address } = ret
      return { id, contactEmail: contactEmail !== null ? contactEmail : '', email, address }
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async selectUsersFcmById(ids: string[]): Promise<{ id: string; fcmToken: string }[]> {
    const tag = this.tag + 'selectUsersFcmById'
    try {
      const users = await this.client
        .getRepository(User)
        .createQueryBuilder('users')
        .select(['users.id', 'users.fcmToken'])
        .where('users.id IN (:...ids)', { ids })
        .getMany()
      return users
    } catch (error) {
      logger.error({ tag, error, ids })
      throw error
    }
  }

  async getUserInfoByIdcard(idcard: string[]): Promise<UserByIdcardVO[]> {
    const tag = this.tag + 'getUserByIdcard'
    try {
      const ret = await this.client
        .getRepository(User)
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.phone',
          'user.contactEmail',
          'user.idcard',
          'user.firstName',
          'user.lastName',
          'user.address',
          'user.nationality',
          'user.isPhoneVerified',
          'user.statusId'
        ])
        .where('user.idcard IN (:...idcard)', { idcard })
        .getMany()
      return ret
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async getUserInvoiceSetting(userId: string): Promise<InvoiceSettingVO> {
    const tag = this.tag + 'getUserInvoiceSetting'
    try {
      const selects = [
        'invoice.invoiceType',
        'invoice.BuyerIdentifier',
        'invoice.donateMark',
        'invoice.NPOBAN',
        'invoice.carrierId1',
        'invoice.carrierId2',
        'invoice.carrierTypeIndex'
      ]
      const ret = await this.client
        .getRepository(Invoice)
        .createQueryBuilder('invoice')
        .select(selects)
        .where('invoice.userId = :userId', { userId })
        .andWhere('invoice.isChosen = :isChosen', { isChosen: 1 })
        .getOne()
      if (ret === undefined) throw new Error('invoice setting is not found')

      return {
        invoiceType: ret.invoiceType,
        buyer: ret.BuyerIdentifier,
        carrierTypeIndex: ret.carrierTypeIndex,
        donateMark: ret.donateMark,
        npoban: ret.NPOBAN,
        carrierId1: ret.carrierId1,
        carrierId2: ret.carrierId2
      }
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async create(entity: Partial<User>, opt: { transManager?: EntityManager } = {}) {
    const tag = 'db/model/user/create'
    try {
      const { transManager } = opt
      const userRepo = isNil(transManager) ? this.client.getRepository(User) : transManager.getRepository(User)
      const user = await userRepo.save(entity)
      return user
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async addUserEvent(events: { rentId?: string; type?: UserEventType; dt?: Date; lat?: number; lng?: number; eventAt?: Date }[]) {
    const tag = this.tag + 'addUserEvent'
    try {
      const repo = this.client.getRepository(UserEvent)
      await repo.insert(repo.create(events))
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async updateById(userId: string, reqVO: Partial<User>, trans?: EntityManager) {
    let repo: Repository<User>
    if (trans) {
      repo = trans.getRepository(User)
    } else {
      repo = this.client.getRepository(User)
    }
    const userVO = repo.create(reqVO)
    await repo.createQueryBuilder().update().set(userVO).where('user_id = :id', { id: userId }).andWhere('isDeleted IS FALSE').execute()
    await this.removeUserCacheById(userId)
  }

  async getUserCount(query: any) {
    if (!query) throw new Error('invalid params')
    const count = await this.client.getRepository(User).count(query)
    return count
  }

  async selectById(userId: string, selects: string[]) {
    const querySelect = selects.map((s) => `u.${s}`)
    const userPO = await this.client
      .getRepository(User)
      .createQueryBuilder('u')
      .select(querySelect)
      .where('u.id = :id', { id: userId })
      .andWhere('u.isDeleted IS FALSE')
      .getOne()
    return userPO
  }

  async getRegisterReasonByUserIdAndStatus(userId: string, userStatus: userStatusType) {
    const history = await this.client
      .getRepository(UserHistory)
      .createQueryBuilder('uh')
      .select(['uh.createdAt', 'uh.note'])
      .where('uh.userId = :userId', { userId })
      .andWhere('uh.userStatusId = :userStatus', { userStatus })
      .orderBy('uh.id', 'DESC')
      .getOne()
    return history
  }
  async getLatestRegisterFailReasonByUserId(userId: string) {
    const history = await this.client
      .getRepository(UserHistory)
      .createQueryBuilder('uh')
      .select(['uh.createdAt', 'uh.note'])
      .where('uh.userId = :userId', { userId })
      .andWhere('(uh.userStatusId = :incomplete or uh.userStatusId = :fincomplete or uh.userStatusId = :unpassed or uh.userStatusId = :reject)', {
        incomplete: userStatusType.INCOMPLETE,
        fincomplete: userStatusType.F_INCOMPLETE,
        unpassed: userStatusType.UNPASSED,
        reject: userStatusType.REJECT
      })
      .orderBy('uh.id', 'DESC')
      .getOne()
    return history
  }

  async getUserStatus(userId: string): Promise<number> {
    const user = await this.client.getRepository(User).createQueryBuilder('u').select(['u.id', 'u.statusId']).where('u.id = :userId', { userId }).getOne()
    if (!user) throw new Error('target user is not found')

    return user.statusId
  }

  /**
   *  註冊流程優化 2023 - 註冊當下, 用 user 的 idcard 反撈看是否有曾經 有 Reject 紀錄
   */
  async getLatestRejectHistoryByIdCard(idCard: string) {
    const selects = ['userHistory.userStatusId', 'userHistory.userCategoryId', 'userHistory.note', 'userHistory.createdAt', 'user.statusId', 'user.id']
    const history = await this.client
      .getRepository(UserHistory)
      .createQueryBuilder('userHistory')
      .select(selects)
      .leftJoin('userHistory.user', 'user')
      .andWhere('user.idcard = :idCard', { idCard })
      .andWhere('user.statusId = :reject', { reject: userStatusType.REJECT })
      .andWhere('userHistory.userStatusId = :reject', { reject: userStatusType.REJECT })
      .orderBy('userHistory.id', 'DESC')
      .limit(1)
      .getOne()
    return history
  }

  /**
   * 藉由 idCard 撈取非 REJECTED user
   * @param idcard
   */
  async getActiveUserByIdcard(idcard: string) {
    const userPO = await this.client
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.idcard = :idcard', { idcard })
      .andWhere('user.statusId != :statusId', { statusId: userStatusType.REJECT })
      .andWhere('user.isDeleted IS FALSE')
      .getMany()
    return userPO
  }

  async getUserPermission(statusId: number) {
    const permission = await this.client.getRepository(UserPermission).findOneOrFail({
      where: { statusId },
      select: ['statusId', 'isAllowLogin', 'isAllowPurchase', 'isAllowResubmitDoc', 'isAllowRide']
    })
    return permission
  }

  /**
   * 檢查 Email 是否重複
   * @param email
   */
  async selectActiveUserByEmail(email: string): Promise<{ id: string; statusId: number } | undefined> {
    const tag = this.tag + 'selectActiveUserByEmail'
    try {
      const user = await this.client
        .getRepository(User)
        .createQueryBuilder('user')
        .select(['user.id', 'user.statusId'])
        .where('user.email = :email', { email })
        .andWhere('user.statusId != :statusId', { statusId: userStatusType.REJECT })
        .andWhere('user.isDeleted = :isDeleted', { isDeleted: false })
        .getOne()
      return user
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async selectByIdCard(idcard: string): Promise<Pick<User, 'id' | 'idcard' | 'deviceId' | 'statusId' | 'phone' | 'contactEmail'> | undefined> {
    const tag = this.tag + 'selectByIdcard'
    try {
      const user = await this.client
        .getRepository(User)
        .createQueryBuilder('user')
        .select(['user.id', 'user.idcard', 'user.deviceId', 'user.statusId', 'user.phone', 'user.contactEmail'])
        .where('user.idcard = :idcard', { idcard })
        .andWhere('user.statusId != :statusId', { statusId: userStatusType.REJECT })
        .andWhere('user.isDeleted = :isDeleted', { isDeleted: false })
        .getOne()
      return user
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async selectByEmail(email: string): Promise<{ id: string; statusId: number } | undefined> {
    const tag = this.tag + 'selectByEmail'
    try {
      const user = await this.client
        .getRepository(User)
        .createQueryBuilder('user')
        .select(['user.id', 'user.statusId'])
        .where('user.email = :email', { email })
        .andWhere('user.isDeleted = :isDeleted', { isDeleted: false })
        .getOne()
      return user
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async updateFcmToken(userId: string, fcmToken: string): Promise<void> {
    // skip updating for guest user
    if (userId === guestId) return
    const tag = this.tag + 'updateFcmToken'
    try {
      await this.client.getRepository(User).createQueryBuilder().update().set({ fcmToken }).where('id = :id', { id: userId }).execute()
      await this.removeUserCacheById(userId)
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string | undefined) {
    await this.client.transaction(async (transaction) => {
      await transaction.getRepository(User).createQueryBuilder().update().set({ refreshToken }).where('id = :id', { id: userId }).execute()
    })
    await this.removeUserCacheById(userId)
  }

  async updateLocale(userId: string, locale: string): Promise<void> {
    // skip updating for guest user
    if (userId === guestId) {
      return
    }

    const tag = this.tag + 'updateLocale'
    try {
      await this.client.getRepository(User).createQueryBuilder().update().set({ locale }).where('id = :id', { id: userId }).execute()
      await this.removeUserCacheById(userId)
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async selectRefreshTokenById(userId: string): Promise<string | undefined> {
    const user = await this.client.getRepository(User).createQueryBuilder('user').select('user.refreshToken').where('user.id = :id', { id: userId }).getOne()
    return user ? user.refreshToken : undefined
  }

  async getUserById(id: string) {
    const tag = this.tag + 'getUserById'
    const CACHE_TIME = 60000
    try {
      const userPO = await this.client.getRepository(User).findOne({
        where: {
          id,
          isDeleted: false
        },
        cache: {
          id: getUserInfoCacheId(id),
          milliseconds: CACHE_TIME
        }
      })
      return userPO
    } catch (error) {
      logger.error({ tag, error, userId: id })
      throw error
    }
  }

  async getUserName(id: string): Promise<string> {
    const user = await this.client
      .getRepository(User)
      .createQueryBuilder('user')
      .select(['user.lastName', 'user.firstName'])
      .where('user.id = :id', { id })
      .getOne()
    return user ? `${user.lastName} ${user.firstName}` : ''
  }

  async getUserByIdOrFail(id: string) {
    const tag = this.tag + 'getUserByIdOrFail'

    try {
      const user = await this.getUserById(id)
      if (R.isNil(user)) {
        throw new Error(`User ${id} not found`)
      }
      return user
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async firstRide(userId: string, firstRideAt: Date) {
    await this.client.getRepository(User).createQueryBuilder().update().set({ hasRidded: true, firstRideAt }).where('id = :userId', { userId }).execute()
    await this.removeUserCacheById(userId)
  }

  async removeUserCacheById(userId: string) {
    if (this.client.queryResultCache) {
      await this.client.queryResultCache.remove([getUserInfoCacheId(userId)])
    }
  }

  /**
   * 根據 UserID和電話, 撈出和他電話重複的全部User
   * @param phone
   */
  async findUserByPhone(phone: string) {
    const userPO = await this.client
      .getRepository(User)
      .createQueryBuilder('u')
      .select(['u.id'])
      .where('u.phone = :phone', { phone })
      .andWhere('u.isDeleted IS FALSE')
      .getMany()
    return userPO
  }

  async findUserByContactEmail(contactEmail: string) {
    const userPO = await this.client
      .getRepository(User)
      .createQueryBuilder('u')
      .select(['u.id'])
      .where('u.contactEmail = :contactEmail', { contactEmail })
      .andWhere('u.isDeleted IS FALSE')
      .getMany()
    return userPO
  }

  async disableUsers(users: string[]) {
    const tag = this.tag + '/disableUsers'
    try {
      await this.client
        .getRepository(User)
        .createQueryBuilder()
        .update(User)
        .set({ statusId: Number(userStatusType.DISABLE) })
        .where('id IN (:...users)', { users })
        .execute()
      await Promise.all(users.map((u) => this.removeUserCacheById(u)))
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async addHistory(action: number, history: Partial<UserHistory>, trans?: EntityManager) {
    const tag = this.tag + '/addHistory'
    try {
      let repo: Repository<UserHistory>
      if (trans) {
        repo = trans.getRepository(UserHistory)
      } else {
        repo = this.client.getRepository(UserHistory)
      }
      await repo.insert({ action, ...history })
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }

  async getUserWithSubscription(userId: string) {
    return this.client
      .getRepository(User)
      .createQueryBuilder('u')
      .select()
      .leftJoinAndSelect('u.subscription', 'subscription')
      .leftJoinAndSelect('subscription.timePlan', 'timePlan')
      .where('u.id = :id', { id: userId })
      .getOne()
  }

  async updateStatusById(params: { userId: string; status: userStatusType }, trans?: EntityManager) {
    const tag = this.tag + '/addHistory'
    const { userId, status } = params
    try {
      const repo = trans ? trans : this.client
      await repo
        .getRepository(User)
        .createQueryBuilder()
        .update(User)
        .set({ statusId: Number(status) })
        .where('user_id = :userId', { userId })
        .execute()
    } catch (error) {
      logger.error({ tag, error, params })
      throw error
    }
  }

  async changeToUnpassedByIds(params: { userIds: string[] }) {
    const tag = this.tag + '/changeToUnpassedByIds'
    const { userIds } = params
    try {
      await this.client
        .createQueryBuilder()
        .update(User)
        .set({ statusId: Number(userStatusType.UNPASSED) })
        .where('user_id IN (:...userIds)', { userIds })
        .andWhere('isDeleted IS FALSE')
        .execute()
    } catch (error) {
      logger.error({ tag, error, params })
      throw error
    }
  }

  find: Repository<User>['find'] = async (options: any) => {
    return this.client.getRepository(User).find(options)
  }

  findOneOrFail: Repository<User>['findOneOrFail'] = async (options: any) => {
    return this.client.getRepository(User).findOneOrFail(options)
  }

  // For ARP Migration
  async findOneByIdForUpdate(transManager: EntityManager, userId: string) {
    return transManager.getRepository(User).createQueryBuilder().setLock('pessimistic_write').where('"user_id" = :userId', { userId }).getOne()
  }

  async getHistoryByUserIdAndAction(userId: string, action: number) {
    const tag = this.tag + '/getHistoryByUserIdAndAction'
    try {
      const selects = [
        'userHistory.userStatusId',
        'userHistory.userCategoryId',
        'userHistory.note',
        'userHistory.createdAt',
        'manager.email',
        'userHistory.userAgent',
        'userHistory.authType'
      ]

      const data = await this.client
        .getRepository(UserHistory)
        .createQueryBuilder('userHistory')
        .select(selects)
        .leftJoin('userHistory.manager', 'manager')
        .where('userHistory.userId = :userId', { userId })
        .andWhere('userHistory.action = :action', { action })
        .orderBy('userHistory.id', 'DESC')
        .getMany()
      return data
    } catch (error) {
      logger.error({ tag, error, userId })
      throw error
    }
  }

  async getIncompleteUsersWithHistory(
    statusId: userStatusType.INCOMPLETE | userStatusType.F_INCOMPLETE,
    startAt: string,
    endAt: string
  ): Promise<User[] & { history?: UserHistory }> {
    const tag = this.tag + 'getIncompleteUsersWithHistory'
    try {
      return await this.client
        .getRepository(User)
        .createQueryBuilder('u')
        .orderBy('history.createdAt', 'DESC')
        .select(['u.id', 'u.statusId', 'u.isDeleted'])
        .innerJoinAndMapOne('u.history', UserHistory, 'history', 'u.id = history.userId')
        .where('(history.createdAt >= :startAt and history.createdAt < :endAt)', { startAt, endAt })
        .andWhere('u.statusId = :statusId', { statusId })
        .andWhere('history.userStatusId = :statusId', { statusId })
        .andWhere('u.isDeleted = false')
        .getMany()
    } catch (error) {
      logger.error({ tag, error })
      throw error
    }
  }
}

function getUserInfoCacheId(userId: string) {
  return `userInfo:${userId}`
}
