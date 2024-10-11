module.exports = {
  printWidth: 140,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrder: ['^react(.*)', 'antd/(.*)', '<THIRD_PARTY_MODULES>', '@/(.*)', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
