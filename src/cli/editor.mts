import inquirer from 'inquirer'

inquirer
  .prompt([
    {
      type: 'editor',
      name: 'story',
      message: 'Tell me a story, a really long one!'
    }
  ])
  .then((answers: { story: any }) => {
    console.info('Answer:', answers.story)
  })
