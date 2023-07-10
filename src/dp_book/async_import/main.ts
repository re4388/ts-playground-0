const SUPPORTED_LANGUAGES = ['el', 'en', 'es']

const selectedLanguage = process.argv[2]

if (!SUPPORTED_LANGUAGES.includes(selectedLanguage)) {
  console.error('The specified language is not supported')
  process.exit(1)
}

const translationModule = `./strings-${selectedLanguage}.ts`


// We use the import() operator to trigger the dynamic import of the module.
import(translationModule).then((strings) => {
  console.log("=====> strings: ", strings);
  console.log(strings.default.HELLO)
})


// cd into this folder
// ts-node --esm main.ts el