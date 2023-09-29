// import * as csType from "jscodeshift"
import { API } from 'jscodeshift'
import { Option } from 'node-sql-parser'
import { log } from 'console'

////////////////////////////
// how to run
// npx jscodeshift -t jscodeshift_run.ts ./target.ts;
// jscodeshift -t jscodeshift_run.ts --extensions=ts,js --parser=ts ./target.ts
// jscodeshift -t jscodeshift_run.ts --extensions=ts,js --parser=ts ./jscodeshift_target


// -d is dryrun
// -p is print the result
// jscodeshift -t ./jscodeshift_run.ts target.ts -d -p

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser


// 下面把一個函數改成 default 就是會跑的那個函數
//////////////////////////////
export function changeClassName(fileInfo: any, api: API) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Find and replace class name
  root.find(j.ClassDeclaration, { id: { name: 'apple' } })
    .forEach((path) => {
      j(path).replaceWith(
        j.classDeclaration(
          j.identifier('Banana'),
          path.value.body,
      // @ts-ignore
          null
        )
      );
    });

  return root.toSource();
}

// more example: https://github.com/jhgg/js-transforms/blob/master/function-expression-to-arrow-function-expression.js

/**
 * Updates calls to findOne.
 * Replace findOne(conditions: FindConditions) with findOneBy(where: FindOptionsWhere)
 * @note Use a regex to update findOne(string).
 */
export function findOneToFindOneBy(fileInfo: any, api: API) {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

// Find all calls to findOne
  return root
    .find(j.CallExpression)
    // @ts-ignore
    .filter((p) => p?.node?.callee?.property?.name === 'findOne')
    .replaceWith((nodePath) => {
      const { node } = nodePath

      // Ignore non-TypeORM methods
      // NOTE: findOne(id) was fixed by find-and-replace.
      let optionsArgument = node.arguments[0]
      console.log("=====> optionsArgument: ", optionsArgument);
      if (optionsArgument.type !== j.ObjectExpression.toString()) { // ObjectExpression
        return node
      }

      // If the argument object has a `where` key, the object is a
      // `FindOneOptions` and is compatible with the new signature.
      // No changes are needed.
      // @ts-ignore
      let hasWhereProperty = optionsArgument.properties.find(
        (p:any) => p.key.name === 'where'
      )
      console.log("=====> hasWhereProperty: ", hasWhereProperty);

      // If the argument does NOT have a `where` key the object is a
      // `FindConditions`, and we need to change the method from
      // `findOne` to `findOneBy`.
      if (!hasWhereProperty) {
        // @ts-ignore
        node.callee.property.name = 'findOneBy'
      }

      return node
    })
    .toSource()
};


// https://zhuanlan.zhihu.com/p/353940140
export function replaceNpmConstant(file: any, api: API) {
  const j = api.jscodeshift
  const root = j(file.source)

  const trackConstantsImportDeclarations = root.find(j.ImportDeclaration, {
    source: {
      value: 'an-npm-package-containing-constants'
    }
  })

  if (!trackConstantsImportDeclarations.length) {
    // 返回 undefined 表示此文件无需修改
    return
  }

  let usedKeys: any[] = []
  const trackConstantsMemberExpressions = root.find(j.MemberExpression, {
    object: { name: 'ConstantsForTrack' }
  })

  // replaceWith 在遍历集合的回调函数中传入的参数类型是 NodePath
  // NodePath 除了节点自身的信息外还包含节点的上下文信息，因此需要先把节点从中取出来
  trackConstantsMemberExpressions.replaceWith((nodePath) => {
    const { node } = nodePath
    const keyId = node.property as any
    if (keyId.name) {
      usedKeys.push(keyId.name)
      return keyId
    }
  })
  if (!usedKeys.length) {
    return
  }

  usedKeys = [...new Set(usedKeys)]

  const keyIds = usedKeys.map((key) => j.importSpecifier(j.identifier(key)))

  const trackConstantsEsImportDeclaration = j.importDeclaration(
    keyIds,
    j.literal('an-npm-package-containing-constants/es/constants')
  )

  // 替换原来的 import 语句
  return trackConstantsImportDeclarations
    .at(0)
    .replaceWith(() => trackConstantsEsImportDeclaration).toSource()
}


export function reverseAllIdentifier(file: any, api: API) {
  const j = api.jscodeshift

  return j(file.source)
    .find(j.Identifier)
    .forEach(path => {
      j(path).replaceWith(
        j.identifier(path.node.name.split('').reverse().join(''))
      )
    })
    .toSource()
}

export function removeFirstLine(file: any, api: API) {
  const j = api.jscodeshift
  const root = j(file.source)

  let Program = root.find(j.Program)
  console.log('=====> Program: ', JSON.stringify(Program))

  const getFirstNode = () => root.find(j.Program).get('body', 0).node
  console.log('=====> getFirstNode: ', getFirstNode)

  // Save the comments attached to the first node
  const firstNode = getFirstNode()
  const { comments } = firstNode
  console.log('=====> comments: ', comments)

  let vd = root.find(j.VariableDeclaration)
  console.log('=====> vd: ', vd)

  root.find(j.VariableDeclaration).replaceWith(
    j.expressionStatement(j.callExpression(
      j.identifier('foo'),
      []
    ))
  )

  // If the first node has been modified or deleted, reattach the comments
  const firstNode2 = getFirstNode()
  if (firstNode2 !== firstNode) {
    firstNode2.comments = comments
  }

  return root.toSource()
}


// 找 array element
export function getArrWith2Element(fileInfo: any, api: API) {
  let cs = api.jscodeshift

  let res = cs(fileInfo.source)
    .find(cs.ArrayExpression)
    .filter((path) => {
      return path.node.elements.length === 2
    })

  console.log('=====> res: ', res)
}

// 要在代码里插入 import foo from 'foo';
// https://github.com/facebook/jscodeshift/blob/main/recipes/retain-first-comment.md
export function retainFirstComment(file: any, api: API) {
  const j = api.jscodeshift

  return j(file.source)
    .find(j.FunctionExpression)
    // We check for this expression, as if it's in a function expression, we don't want to re-bind "this" by
    // using the arrowFunctionExpression. As that could potentially have some unintended consequences.
    .filter(fe => j(fe).find(j.ThisExpression).size() == 0)
    .replaceWith(fe => {

      let body = fe.value.body

      // If we have a function that consists of a single return statement in it's body,
      // we can transform it to the more compact arrowFunctionExpression (a, b) => a + b, vs (a + b) => { return a + b }
      let useExpression = body.type == 'BlockStatement' && body.body.length == 1 && body.body[0].type == 'ReturnStatement'
      // @ts-ignore
      body = useExpression ? body.body[0].argument : body
      return j.arrowFunctionExpression(fe.value.params, body, useExpression)
    })
    .toSource()
}


// npx jscodeshift -t a1.js ./target.ts





