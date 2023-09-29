var describe = require('jscodeshift-helper').describe
// import { API } from 'jscodeshift'

export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  // Find all occurrences of z.string() with a description property
  const callExpressions = root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'z' }
      // property: { name: 'string' },
    },
    arguments: [{
      type: 'ObjectExpression',
      properties: [{
        key: { name: 'description' }
      }]
    }]
  })

  callExpressions.forEach(path => {
    const method = path.value.callee.property.name
    // describe(path.value.callee.property.name)
    const descriptionProperty = path.value.arguments[0].properties[0]


    // callExpression都會接一個memberExpression
// 另外因為這邊兩有層，因此外面需要包一層(callExpression -> memberExpression)
    const newCallExpression = j.callExpression(j.memberExpression(
      // // memberExpression裡面就包 identifier 和 argument(`[]`) -> .number()
      j.callExpression(j.memberExpression( j.identifier('z'), j.identifier('number')), []),
      j.identifier('describe')), ['騎乘次數門檻值'] // 這邊第二層的 `.describe(' 騎乘次數門檻值')`
    )
    j(path).replaceWith(newCallExpression)
  })

  return root.toSource()
}

// jscodeshift -t updateZodDesc.ts updateZodDesc.input.ts -d -p
