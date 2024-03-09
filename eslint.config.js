import hyoban from 'eslint-config-hyoban'

export default hyoban(
  {
    ignores: [
      '**/vite.config.ts',
      '**/uno.config.ts',
    ],
  },
  {
    files: ['**/package.json'],
    rules: {
      'package-json/valid-package-def': 'off',
    },
  },
)
