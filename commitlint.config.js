module.exports = {
  extends: ['cz'],
  rules: {
    'scope-enum': [
      // rule
      2, // [1] level
      'always', // [2] applicability
      ['config', 'README.md'], // [3] value
    ],
    'type-enum': [
      // rule
      2, // [1] level
      'always', // [2] applicability
      ['Feat', 'Fix', 'Docs', 'Style', 'Refactor', 'Perf', 'Test', 'Build', 'CI', 'Chore', 'Revert', 'WIP'], // [3] value
    ],
  },
};
