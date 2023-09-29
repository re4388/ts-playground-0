import { parse, Statement } from 'pgsql-ast-parser';
import { lastIndexOf } from 'ramda'


export function runParser() {

// parse multiple statements
  const ast: Statement[] = parse(``);

  // console.log("=====> ast: ", ast[0].name.name);
  // console.log("=====> ast: ", ast[0]);
  let a1 = ast[0] as any
  const tableName = a1.name.name
  console.log("tableName", tableName);


  const columns = a1.columns
  // console.log("=====> columns: ", columns);

  for (const column of columns) {
    console.log(column.name.name)
    console.log(column.dataType.name)
    console.log(column.dataType.constraints)
    console.log('=====')
  }





}


