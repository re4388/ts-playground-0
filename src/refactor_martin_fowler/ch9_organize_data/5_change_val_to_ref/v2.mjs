class Order {
  constructor(data) {
    this._number = data.number

    /**
     * Now, any changes I make to the customer of one order will be synchronized
     * across all the orders sharing the same customer.
     */
    this._customer = registerCustomer(data.customer);
    // load other data
  }

  // footnote:
  // One problem with this code is that the constructor body is coupled to the global repository.
  // Globals should be treated with care—like a powerful drug, they can be beneficial in small doses but a poison if used too much.
  // If I’m concerned about it, I can pass the repository as a parameter to the constructor.

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
 * The repository allows me to register customer objects with an ID
 * and ensures I only create one customer object with the same ID.
 *
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
