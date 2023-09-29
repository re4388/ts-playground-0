import { API } from 'jscodeshift'
export default (fileInfo: any, api:API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);


  // find declaration for "geometry" import
  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: 'geometry',
    },
  });

  // get the local name for the imported module
  const localName =
    // find the Identifiers
    importDeclaration.find(j.Identifier)
      // get the first NodePath from the Collection
      .get(0)
      // get the Node in the NodePath and grab its "name"
      .node.name;

  return root.find(j.MemberExpression, {
    object: {
      name: localName,
    },
    property: {
      name: 'circleArea',
    },
  })

    .replaceWith(nodePath => {
      // get the underlying Node
      const { node } = nodePath;
      // change to our new prop
      // @ts-ignore // 自己塞的好像 TS 就gg了。
      node.property.name = 'getCircleArea';
      // replaceWith should return a Node, not a NodePath
      return node;
    })

    .toSource();
};
