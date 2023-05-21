import * as R from "ramda";

export function ramdaPlay() {
  const classyGreeting = (firstName: any, lastName: any) =>
    "The name's " + lastName + ", " + firstName + " " + lastName;

  const yellGreeting = R.compose(R.toUpper, classyGreeting);

  let a1 = yellGreeting("James", "Bond"); //=> "THE NAME'S BOND, JAMES BOND"
  console.log("a1", a1);

  let a2 = R.compose(Math.abs, R.add(1), R.multiply(2))(-4); //=> 7
  console.log("a2", a2);
}
