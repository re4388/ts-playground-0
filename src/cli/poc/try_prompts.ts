const prompts = require('prompts');

const questions = [
  {
    type: 'text',
    name: 'dish',  // response name
    message: 'Do you like pizza?'
  },
  {
    type: (prev: string) => prev == 'yes' ? 'text' : null,
    name: 'topping',
    message: 'Name a topping'
  },
  {
    type: (prev: string) => prev == 'no' ? 'text' : null,
    name: 'topping',
    message: 'Name a banana'
  }
];

(async () => {
  const response = await prompts(questions);
  console.log("------->response: ", response);
})();
