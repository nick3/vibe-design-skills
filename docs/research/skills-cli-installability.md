# `npx skills add` 可安装性调查

- 调查日期：2026-07-17
- 本地仓库基线：`nick3/vibe-design-skills@91659d8`
- 官方 CLI 基线：`skills@1.5.19`，`vercel-labs/skills@777599e1159e401b11ce4c8a57c20f09a8f1596e`

> 后续状态：调查发现的 YAML 问题已修复，公开 `main` 可发现并完整安装
> 12/12 个 Skill；仓库所有者已于 2026-07-17 选择 MIT 许可证。本文保留
> `91659d8` 公开基线的原始调查结论。

## 结论

`nick3/vibe-design-skills` **已经具备通过**：

```bash
npx skills add nick3/vibe-design-skills
```

安装的仓库结构。`npx` 下载和执行的是 npm 上的 `skills` CLI，`nick3/vibe-design-skills` 只是传给 CLI 的 GitHub 来源参数；因此我们的内容仓库**不需要**发布 npm 包，也不需要增加 `package.json`、`skills.json`、registry 清单或向 Vercel 手工登记。

不过，当前远端版本还不能完整发布为“12 个 Skill”：真实 `--list` 验证只识别出 **11 个**。`vibe-design-execute` 的 `description` 是无引号 YAML 普通标量，内部出现了 `foundation: clarify`，其中的冒号加空格使 frontmatter 成为无效 YAML。修复这一处后，现有平铺结构应能完整发现 12 个 Skill。

技术上必须修改的只有这一处 YAML；README、许可证、CI 和兼容性声明属于发布质量与团队采用层面的增强，其中许可证虽然不影响 CLI 运行，却关系到他人能否合法复制、修改和再分发。

## 官方 CLI 如何处理该命令

### 1. GitHub shorthand

CLI 将 `owner/repo` 解析为 `https://github.com/owner/repo.git`。它还支持 `owner/repo@skill-name`、完整 GitHub URL、仓库子路径和 ref。[官方 README 的 Source Formats](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/README.md#L28-L48)给出了公开用法；[解析源码](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/src/source-parser.ts#L367-L390)明确实现了 `owner/repo` 与 `owner/repo@skill-name`。

`nick3` 不在 CLI 1.5.19 的 blob fast-path owner 白名单中，所以 CLI 会把仓库浅克隆到临时目录，再从磁盘发现 Skill；这不影响安装资格，也不要求加入白名单。[安装来源处理](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/src/add.ts#L1128-L1192)

### 2. Skill 发现

默认发现顺序包含：

- 仓库根目录的 `SKILL.md`；
- `skills/<name>/SKILL.md`；
- `skills/<category>/<name>/SKILL.md`；
- 多种 Agent 专属 Skill 容器。

这是官方明确支持的 monorepo 形态。[README 的发现说明](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/README.md#L369-L458)与[磁盘发现实现](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/src/skills.ts#L196-L295)一致。

有两个后续维护约束：

1. 不要在本仓库根目录新增 `SKILL.md`。默认模式发现根 Skill 后会提前返回，嵌套的 12 个 Skill 将被遮蔽，除非用户额外传 `--full-depth`。
2. 如果以后按分类重组，默认最多使用 `skills/<category>/<name>/SKILL.md`。更深或标准容器外的层级需要 `--full-depth`，不适合作为默认安装契约。

当前仓库没有根 `SKILL.md`，12 个目录均采用标准的 [`skills/<name>/SKILL.md`](../../skills/) 平铺布局，结构本身正确。

### 3. Frontmatter

CLI 使用 `---` 包围的 YAML frontmatter，并只把同时具有字符串类型 `name` 与 `description` 的文件当作 Skill；不可解析、缺字段或字段类型错误时会跳过该文件。[YAML 解析器](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/src/frontmatter.ts#L1-L16)；[Skill 校验源码](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/src/skills.ts#L69-L105)

[Agent Skills 官方规范](https://agentskills.io/specification)进一步要求：

- `name` 为 1–64 个小写字母、数字或连字符，不能首尾为连字符或包含连续连字符，并与父目录名一致；
- `description` 为 1–1024 字符，同时说明“做什么”和“何时使用”；
- 可选字段包括 `license`、`compatibility`、`metadata` 和实验性的 `allowed-tools`；
- `scripts/`、`references/`、`assets/` 都是标准的可选附属目录。

当前 11 个可解析 Skill 的名称、父目录对应关系和描述长度均符合这些约束；12 个名称也没有重复。唯一解析失败的是 [`vibe-design-execute/SKILL.md`](../../skills/vibe-design-execute/SKILL.md)：

```yaml
description: Execute ... foundation: clarify the feature, ...
```

官方客户端实现指南也把“无引号值中包含冒号”列为最常见的无效 YAML 情形。[Handling malformed YAML](https://agentskills.io/client-implementation/adding-skills-support#handling-malformed-yaml)

推荐改为折叠块标量：

```yaml
description: >-
  Execute a concrete product or UI design request end to end using the project's
  approved Vibe Design foundation: clarify the feature, ...
```

### 4. 交互选择与安装

当发现多个 Skill 时：

- 普通交互式终端会显示带 `name` 和 `description` 的多选列表；
- `--list` 只列出可用项；
- `--skill <name>` 精确选择；
- `owner/repo@skill-name` 是单项安装的短写；
- `--skill '*'` 选择仓库中的全部 Skill；
- `--yes` 且未指定 Skill 时会选中全部 Skill；
- `--all` 等价于全部 Skill、全部 Agent 且无交互，不应与“只装到 Codex”的意图混用。

相关行为见[官方选项文档](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/README.md#L50-L88)和[选择器实现](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/src/add.ts#L1257-L1334)。

一个容易忽略的差异是：CLI 若检测到自己运行在 Codex 等 AI Agent 内，会自动启用无交互模式，并自动选择检测到的 Agent；因此在普通 Terminal 中运行精确命令通常会让用户选择 Skill，而在 Codex 内运行同一命令可能直接选择并安装全部可发现 Skill。[Agent 检测后的行为](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/src/add.ts#L1049-L1079)

### 5. 安装内容

CLI 以每个 Skill 目录为安装单元，递归复制其中的文件；默认只排除 `metadata.json`、`.git`、`__pycache__` 和 `__pypackages__`。所以现有 `assets/`、`references/`、`scripts/` 与 `evals/` 都会随各 Skill 安装。[目录复制实现](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/src/installer.ts#L423-L514)

这也意味着：

- 各 Skill 的运行时资源必须位于自己的目录中；
- 仓库级 [`skills/ARCHITECTURE.md`](../../skills/ARCHITECTURE.md)、[`skills/README.md`](../../skills/README.md) 等不会随某个 Skill 自动安装；
- CLI 没有 Skill dependency manifest。只安装 `vibe-design-bootstrap` 不会自动安装它所编排的其他 Skill，完整工作流应明确推荐全套安装；
- 当前 Skill 没有依赖仓库级共享文件。模板中的 `../DESIGN.md` 是目标项目产物之间的相对关系，不是安装源依赖。

临时目录实装 `design-system-foundation` 后，`SKILL.md`、`assets/DESIGN.template.md`、4 个 `references/` 文件和 `evals/evals.json` 均被完整复制，并产生了记录来源与 Skill 路径的 `skills-lock.json`。

### 6. Agent 兼容目标

官方 README 当前列出 Codex、Claude Code、Cursor、OpenCode 等大量 Agent；基本 Skill 格式在这些 Agent 中通用。[Supported Agents](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/README.md#L238-L323)中 Codex 的项目目录是 `.agents/skills/`，并可通过 `--agent codex` 明确指定。

本套 Skill 未使用兼容性差异较大的 `allowed-tools`、`context: fork` 或 hooks，因此文档型基础能力可跨 Agent。实际执行能力仍取决于 Agent 环境：

- [`design-artifact-evaluator`](../../skills/design-artifact-evaluator/SKILL.md)需要可用的浏览器、设备或设计检查能力；其确定性重算脚本需要 Node.js；
- [`design-system-foundation`](../../skills/design-system-foundation/SKILL.md)和 [`design-system-review`](../../skills/design-system-review/SKILL.md)在运行 Google `DESIGN.md` CLI 时需要 `npx` 和网络；
- Figma 提取等任务需要目标 Agent 能访问相应文件或工具。

这些条件不影响安装发现，但适合用可选的 `compatibility` frontmatter 或 README 运行要求说明清楚。最新 `skills` CLI 自身的 [`package.json`](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/package.json#L1-L15)显示 npm 包名为 `skills`；其当前引擎要求见[同文件](https://github.com/vercel-labs/skills/blob/777599e1159e401b11ce4c8a57c20f09a8f1596e/package.json#L138-L144)。

## 当前仓库实测

### 远端元数据

- 仓库：`nick3/vibe-design-skills`
- 可见性：Public
- 默认分支：`main`
- 本地/远端发布基线：`91659d8`
- GitHub 未识别到许可证
- 不存在 `package.json`、`skills.json` 或 Claude plugin manifest；这些都不是本命令的前置条件

### 官方 CLI smoke test

使用 `skills@1.5.19` 执行：

```bash
npx skills add nick3/vibe-design-skills --list
```

实际结果：

- 成功解析为 `https://github.com/nick3/vibe-design-skills.git`；
- 成功克隆公开仓库；
- 识别 11 个 Skill；
- 未识别 `vibe-design-execute`；
- 其余 11 个名称和完整描述均正常列出。

因此“这个 GitHub 仓库能否被命令安装”的答案是**能**；“是否已完整安装全部 12 个”的答案是**还不能，需先修复一处 YAML**。

## 必需改动

### P0：修复 `vibe-design-execute` frontmatter

把 [`skills/vibe-design-execute/SKILL.md`](../../skills/vibe-design-execute/SKILL.md) 的 `description` 改为引号字符串或 `>-` 折叠块。建议使用折叠块，便于维护长描述并避免未来再引入冒号解析错误。

修复后必须重新运行：

```bash
npx skills add nick3/vibe-design-skills --list
```

验收条件是显示 12 个 Skill，并包含 `vibe-design-execute`。

## 建议改动

### 1. 在根 README 增加正式安装入口

当前[根 README](../../README.md)仍要求用户按平台“import or copy”。建议改为以 CLI 为主入口：

```bash
# 先查看仓库中的 Skill
npx skills add nick3/vibe-design-skills --list

# 普通终端中交互选择
npx skills add nick3/vibe-design-skills

# 全套安装到当前项目的 Codex，无交互
npx skills add nick3/vibe-design-skills --skill '*' --agent codex --yes

# 全套全局安装到 Codex
npx skills add nick3/vibe-design-skills --skill '*' --agent codex --global --yes

# 只安装一个 Skill
npx skills add nick3/vibe-design-skills@feature-design-spec --agent codex
```

不要把 `--all` 解释为“全部 Skill 到指定 Agent”；CLI 源码中它会强制设置 `--agent '*'`、`--skill '*'` 和 `--yes`。

### 2. 选择开源许可证

许可证不是发现或安装的技术条件，但当前 README 已明确说明没有授权。CLI 会把 Skill 内容复制到用户项目或用户目录，因此如果目标是公开采用、修改和团队再分发，应由仓库所有者选择 MIT、Apache-2.0 等许可证并添加根 `LICENSE`。选定后可选择在各 `SKILL.md` frontmatter 中加入相同的 `license` 字段。

### 3. 增加 CI 校验

建议在每次提交和发布时：

1. 对 `skills/*` 逐个运行官方推荐的 [`skills-ref validate`](https://agentskills.io/specification#validation)；
2. 运行本地 discovery smoke test；
3. 检查“磁盘上 `SKILL.md` 数量”与“CLI 可发现数量”一致；
4. 禁止新增根 `SKILL.md`；
5. 发布后对远端 `nick3/vibe-design-skills --list` 再做一次 smoke test。

这次漏检说明仅检查 frontmatter 是否有起止分隔符和字段文本不够，必须使用真实 YAML 解析器。

### 4. 明确套件与单项安装语义

CLI 不解析 Skill 之间的依赖。建议 README 明确：

- `vibe-design-bootstrap` 与 `vibe-design-execute` 是编排入口，但不是把其他 Skill 内嵌进去；
- 希望完整运行四层体系时应安装全部 12 个；
- 只做单一任务时可安装对应的专用 Skill；
- `evals/` 会一并安装。如果后续特别在意体积，可把纯开发验证夹具移到 Skill 目录外；这不是当前前置工作。

### 5. skills.sh 展示

无需手工注册 registry。官方 FAQ 说明，公开 Skill 会在用户通过 CLI 安装后，依据匿名安装遥测自动进入 skills.sh 排名与页面。[How do I get my skill listed?](https://www.skills.sh/docs/faq#how-do-i-get-my-skill-listed-on-the-leaderboard)

可在 README 增加官方建议的仓库徽章：

```markdown
[![skills.sh](https://skills.sh/b/nick3/vibe-design-skills)](https://skills.sh/nick3/vibe-design-skills)
```

来源：[skills.sh Documentation — Badge](https://www.skills.sh/docs#badge)

## 最终判断

不需要把这个仓库改造成 npm 项目。保留当前 `skills/<name>/SKILL.md` 多 Skill 结构，修复 `vibe-design-execute` 的 YAML，增加安装文档并通过 12/12 远端 smoke test，即可正式宣传：

```bash
npx skills add nick3/vibe-design-skills
```

许可证和 CI 不阻断这条命令，但在面向团队或公众发布前应作为发布治理事项处理。
