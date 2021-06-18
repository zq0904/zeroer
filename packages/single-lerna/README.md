### 初衷

1. 使用 lerna publish 选择 prerelease 版本，默认发布的是 latest 版（绝大多数情况使用者都在发
   布测试包，发包的 90%工作耗时都在此步骤上）

```ts
  lerna publish prerelease --preid <tag> --pre-dist-tag <tag> // 可以使用此命令指定 tag
```

2. 测试包业务线覆盖测试通过后 发布正式包，你可能没有修改代码此时无法执行 lerna publish 发布正式版

```ts
  lerna publish <tag>
  --allow-branch master // 正式版需使用 master 分支
  --conventional-commits // 生成CHANGELOG.md文件
  --conventional-graduate // 所有预发行版程序包 -> 正式版
```

### 约定

1. 只有 master 才能发布正式版（什么 Mobx？我不希望维护多个分支版本）
2. 绝大多数情况使用者都在发布测试包用以测试，包版本变动可能是链式的 A -> B -> C，或者会有无关联的 2 个包 A -> C B -> C，无论哪种期望遵循单一简单的原则（例如 发测试包所有变动的包都是 prerelease 版）
3. 对于其他命令可以考虑回归使用 lerna（例如 确实需要在某个非 master 分支上发布一个无关联包的正式版）

### 命令

```ts
  npx speedy-lerna --help
  npx speedy-lerna publish // 可选交互式
  npx speedy-lerna publish --tag beta // 直接指定 preid dist-tag 但仍需确认
```

### TODO

1. 发包前构建功能
