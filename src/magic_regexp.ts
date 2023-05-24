import {
  createRegExp,
  global,
  multiline,
  exactly,
  maybe,
  oneOrMore,
} from "magic-regexp";

export function magic_regexp() {
  const regExp = createRegExp(exactly("foo/test.js").after("bar/"));
  console.log(regExp);

  const regExp2 = createRegExp(exactly("foo").or("bar"));
  console.log(regExp2);
  createRegExp("string-to-match", [global, multiline]);

  // you can also pass flags directly as strings or Sets
  createRegExp("string-to-match", ["g", "m"]);

  // or pass in multiple `string` and `input patterns`,
  // all inputs will be concatenated to one RegExp pattern
  const a3 = createRegExp("foo", maybe("bar").groupedAs("g1"), "baz", [
    global,
    multiline,
  ]);
  console.log("a3", a3);

  //   const a4 = createRegExp(
  //     "WeMoScooter",
  //     maybe("digit").groupedAs("appVersion"),
  //     maybe("char").groupedAs("isDev"),
  //     oneOrMore("char"),
  //     exactly("iOS").or("Android").groupedAs("osName"),
  //     maybe("char").groupedAs("osVersion"),
  //     [global, multiline]
  //   );

  //   console.log("a4", a4);

  //   const userAgentChecker =
  // /^WeMoScooter\/(?<appVersion>\d+(\.\d+)*)(?<isDev>[\w\W]+){0,1}\s+\((?<osName>(iOS|Android))\s+(?<osVersion>\d+(\.\d+)*);\s+[\w\W]+\)$/gim
}
