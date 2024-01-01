

// The first step is Encapsulate Variable (132).
function getRawDataOfOrganization() {
  return organization;
}

const organization = {
  name: 'Acme Gooseberries',
  country: 'GB'
}



// client1
let result = 0
result += `<h1>${getRawDataOfOrganization().name}</h1>`;


// client2
getRawDataOfOrganization().name = newName;

