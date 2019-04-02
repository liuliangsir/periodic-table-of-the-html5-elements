module.exports = {
  types: [
    {
      value: 'Feat',
      name: '✨  Feat：     新功能',
    },
    {
      value: 'Fix',
      name: '🐛  Fix：      bug 修复',
    },
    {
      value: 'Docs',
      name: '📝  Docs：     修改文档内容',
    },
    {
      value: 'Style',
      name: '💄  Style：    统一代码风格、去除空格、格式化代码以及添加分号',
    },
    {
      value: 'Refactor',
      name: '♻️  Refactor： 除修复 bug 以及新增功能以外的代码修改',
    },
    {
      value: 'Perf',
      name: '⚡️  Perf：     提升性能',
    },
    {
      value: 'Test',
      name: '✅  Test：     增加测试代码或者纠正已有的测试代码',
    },
    {
      value: 'Build',
      name: '👷  Build：    影响构建系统以及外部依赖的修改',
    },
    {
      value: 'CI',
      name: '🔧  CI：       CI 配置以及脚本的修改',
    },
    {
      value: 'Chore',
      name: '📦  Chore:     不修改源代码以及测试代码的代码修改',
    },
    {
      value: 'Revert',
      name: '⏪  Revert:    代码回滚',
    },
    {
      value: 'WIP',
      name: '🚧  WIP:       进行中',
    },
  ],
  scopes: ['config'],
  scopeOverrides: {
    Fix: [
      {
        name: 'Android',
      },
      {
        name: 'iOS',
      },
      {
        name: 'Windows',
      },
      {
        name: 'Linux',
      },
      {
        name: 'macOS',
      },
      {
        name: 'security',
      },
      {
        name: 'bug',
      },
      {
        name: 'CI',
      },
      {
        name: 'typos',
      },
    ],
    Build: [
      {
        name: 'gulp',
      },
      {
        name: 'broccoli',
      },
      {
        name: 'npm',
      },
    ],
    CI: [
      {
        name: 'Travis',
      },
      {
        name: 'Circle',
      },
      {
        name: 'BrowserStack',
      },
      {
        name: 'SauceLabs',
      },
    ],
  },
  messages: {},
  allowCustomScopes: true,
  allowBreakingChanges: ['Feat', 'Fix'],
  subjectLimit: 120,
};
