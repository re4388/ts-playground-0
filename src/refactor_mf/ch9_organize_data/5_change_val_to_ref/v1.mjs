class Order {
  constructor(data) {
    this._number = data.number
    this._customer = new Customer(data.customer) // load other data
  }

  get customer() {
    return this._customer
  }
}

class Customer {
  constructor(id) {
    this._id = id
  }

  get id() {
    return this._id
  }
}


/**
 * The repository allows me to register customer objects with an ID and ensures I only create one customer object with the same ID.
 * With this in place, I can change the order’s constructor to use it.
 */
let _repositoryData

function initialize() {
  _repositoryData = {}
  _repositoryData.customers = new Map()
}

function registerCustomer(id) {
  if (!_repositoryData.customers.has(id))
    _repositoryData.customers.set(id, new Customer(id))
  return findCustomer(id)
}

function findCustomer(id) {
  return _repositoryData.customers.get(id)
}
