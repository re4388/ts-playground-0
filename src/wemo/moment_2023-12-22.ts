import moment, { MomentInput } from 'moment'

function printDate(date: MomentInput) {
  const until = moment.utc().add(20, 'minutes').toISOString()
  console.log('------->until: ', until)
  const formattedDate = moment(date).format('YYYY-MM-DD')
  console.log(formattedDate)
}

printDate(new Date()) // prints the current date
printDate(1640995200) // prints the date corresponding to the Unix timestamp 1640995200
printDate('2022-01-01') // prints '2022-01-01'
