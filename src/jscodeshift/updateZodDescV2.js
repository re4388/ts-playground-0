export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Find all occurrences of z.object() with a description property
  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'z' },
      // property: { name: 'object' },
    },
    arguments: [
      { type: 'ObjectExpression' },
      { type: 'ObjectExpression' },
    ],
  }).forEach(path => {
    const descriptionNode = path.value.arguments[1].properties.find(
      prop => prop.key.name === 'description'
    );

    if (descriptionNode) {
      // Remove the description property from the second argument
      path.value.arguments[1].properties = path.value.arguments[1].properties.filter(
        prop => prop !== descriptionNode
      );

      // Replace the second argument with the describe method
      const objectNode = path.value.arguments[0];
      const method = path.value.callee.property.name

      const res = j.callExpression(
        j.memberExpression(j.callExpression(j.memberExpression(j.identifier('z'), j.identifier(`${method}`)), [path.value.arguments[0]]), j.identifier('describe')),
        [descriptionNode.value]
      )


      j(path).replaceWith(res);
    }
  });

  return root.toSource();
}
