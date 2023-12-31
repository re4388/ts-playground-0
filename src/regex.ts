

export function runRegex() {
  const regex = /'([a-z]+)'.+'(.+)'/;
  const input = 'table.addAuthEndpoint(3, { method: \'patch\', endpoint: \'/codes/:code\', controller: promotions.patchStatusByCode })';
  const match = regex.exec(input.trim());

  if (match) {
    const total = match[0]; // full match (e.g., '12-31-2022')
    const httpMethod = match[1]; // first group match (e.g., '12')
    const path = match[2]; // second group match (e.g., '31')
    const year = match[3]; // third group match (e.g., '2022')

    console.log(`${httpMethod.toUpperCase()} ${path}`);
  }
}

export {}
