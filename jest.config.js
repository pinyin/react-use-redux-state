const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  roots: ['src', 'test'],
  transform: {
    ...tsjPreset.transform,
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
}
