class Employee {
  constructor(name, typeCode) {
    this._name = name
    this._typeCode = typeCode
  }

  get name() {
    return this._name
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode]
  }

  static get legalTypeCodes() {
    return {
      'E': 'Engineer',
      'M': 'Manager',
      'S': 'Salesman'
    }
  }
}

function createEmployee(name, typeCode) {
  return new Employee(name, typeCode)
}


// caller1
candidate = createEmployee(document.name, document.empType);

// caller2
const leadEngineer = createEmployee(document.leadEngineer, 'E');
