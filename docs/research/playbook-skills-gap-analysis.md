# 《Vibe Designing Playbook》与现有 Skill 套件的差距审计

> 审计日期：2026-07-17
> 一手来源：[Alibaba Cloud Design — Vibe Designing Playbook](https://alibaba-cloud-design.github.io/vibe-designing-playbook/)
> 审计对象：`skills/` 下六个 Skill 及其直接引用的模板、参考文件
> 结论性质：只读研究；本文没有修改任何 Skill
>
> **后续状态：** 本文记录的是第一版六 Skill 套件的历史差距。团队随后已依据本审计补充 `feature-design-spec`、`design-craft-foundation`、`design-template-and-variants`、`agentic-interface-foundation`、`vibe-design-execute` 和 `design-artifact-evaluator`，并将原有 Skill 更新为十二 Skill 四层架构。当前状态以 `skills/README.md` 与 `skills/ARCHITECTURE.md` 为准；本文保留作为设计决策依据。

## 结论先行

**有吸收，而且并非只借用了“Vibe Design”这个名字；但吸收是不完整且偏向“设计基础文档治理”的。**

现有套件最扎实地吸收了两部分：

1. [1.2 设计声明与执行契约](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)中的核心思想——把隐性的设计判断写成 Agent 可读取的声明，再用 Skill 和 evaluator 让标准进入流程；
2. [第三章 自我进化](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-ch3)中的治理思想——证据先于评分、生成与评审隔离、按页面类型设置维度、阻断项不能被平均分掩盖、失败后返回明确行动、用对照案例校准标准。

但当前六个 Skill 的边界是“创建、重建、更新和审查设计基础文档”，不是 Playbook 所描述的完整设计生产系统。这个边界在 `skills/vibe-design-bootstrap/SKILL.md:8` 写得很清楚：它创建的是供未来设计与实现 Agent 使用的 documentation foundation；`skills/design-evaluation-foundation/SKILL.md:8` 也明确说它只创建评估标准、不评一个具体设计。因此：

- [1.1 Design I/O](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.1)的实际页面生产链只被抽象地映射，没有成为可运行工作流；
- [1.3 从一句话到一个页面](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.3)所示的 `需求 → spec → IA/template/variant → prototype → evaluator → 回流` 基本尚未实现；
- [第二章 动态交互](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-ch2)的 AX、GenUI、A2UI 以及 OmniBox/FlexCard/GenReport 基本没有进入套件；
- 第三章已经有相当完整的“评估契约”，但缺少浏览器取证、确定性计分、生成—评估迭代和回滚等“评估运行时”。

所以更准确的定位是：

> 当前套件是一个受 Playbook 明显影响的 **Vibe Design Foundation Authoring Kit**，还不是完整的 **Vibe Designing Operating System**。

## 审计方法

### 来源覆盖

本次以一手来源为准，覆盖了原站的：

- [引言](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-intro)；
- [1.1 Design I/O](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.1)、[1.2 设计声明与执行契约](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)、[1.3 从一句话到一个页面](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.3)；
- [2.1 从 UX 到 AX](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.1)、[2.2 GenUI](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.2)、[2.3 A2UI](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.3)、[2.4 OmniBox / FlexCard / GenReport](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.4)；
- [3.1 人工指正的尽头](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.1)、[3.2 页面类型与六维度模型](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.2)、[3.3 浏览器、截图与检查项](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.3)、[3.4 交付闸门](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.4)、[3.5 工程化与标准维护](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.5)；
- [结语](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-outro)与[设计提示词词典](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-appendix)；
- 正文提供的示例附件，尤其是 [ux-spec skill](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/00-ux-spec-skill.md)、[design.md](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/04-design-md.md)、[components](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/05-components.md)、[domain.md](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/06-domain.md)、[evaluator rubric](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/08-evaluator-rubric.md)、[variant skill](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/09-variant-skill.md)、[IA variants](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/10-ia-variants.md)和[visual spec](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/11-visual-spec-output.md)。

完整阅读摘要另见同目录的 `vibe-designing-playbook-notes.md`；本文件只处理“原文与当前 Skill 的对应关系”。

### 判定标准

- **明确吸收**：Skill 中有明确触发条件、规范性步骤、强制输出或模板字段，而非仅出现同类词汇。
- **部分吸收**：原则被提到或被某份文档承接，但缺少 Playbook 中的关键环节、运行行为或独立产物。
- **缺失**：六个 Skill 没有相应触发、产物、步骤或验证方式。
- **偏离/扩展**：与 Playbook 不同，但可能是合理的团队治理选择；不能自动等同于缺陷。

## 按 Playbook 章节的总体覆盖

| 原文部分 | 当前覆盖 | 判断 |
| --- | --- | --- |
| 引言：把 taste 变成可执行系统 | 有证据分级、人类审批、可追溯决策和系统化文档 | 明确吸收其治理精神 |
| 1.1 Design I/O | 有文档创建的阶段编排和失败回流目标，但没有实际 UI 生成五阶段 | 部分吸收 |
| 1.2 六份声明 + 两份契约 | `domain`、`design.md`、`components`较强；`template`由 patterns 部分承接；缺 `spec`、`craft`；Skill 有，evaluator 仅有契约文档 | 强部分吸收 |
| 1.3 从一句话到页面 | 没有单需求的 spec、IA 变体、原型生成和迭代闭环 | 基本缺失 |
| 2.1–2.4 AX / GenUI / A2UI | 只有风险、确认、恢复、agentic workflow 等零散原则 | 大部分缺失 |
| 3.1–3.5 自我进化 | 维度、证据、blocker、成熟度、return plan、stop rule、calibration、评审隔离都在；没有完整运行时 | 声明层明确吸收，执行层部分吸收 |
| 附录 Lexicon | 没有把术语库作为 Agent 参考或受控设计语言 | 缺失 |

## 已明确吸收的理念和经验

### 1. 现有设计是证据，不是天然规范

Playbook 的核心不是让 Agent 机械复刻现有页面，而是把重复出现的问题追溯到应维护的声明或契约。[1.1](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.1)用状态色、空态、重试、模板味等例子说明，不同问题要回到不同接口；[1.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)进一步区分判断标准与执行路径。

当前套件对此表达得非常明确：

- `vibe-design-bootstrap/SKILL.md:45-55` 要求记录来源权威性，并把观察分成 `confirmed / observed / inferred / conflicting / missing`；`observed` 或 `inferred` 不能未经批准变成正式标准。
- `product-design-context/SKILL.md:29-40` 定义证据优先级，并禁止仅按出现频率消解冲突。
- `design-system-foundation/SKILL.md:56-68` 把观察值、来源、范围、解释、提案、批准决定与置信度分开，并明确“重复是证据，不是自动批准”。
- `design-system-review/references/review-rubric.md:3-9` 把来源、推断、缺口和“既有设计没有被自动正典化”列为审查条件。

这不仅吸收了原文，而且直接回应了团队过去“沿着旧稿凭感觉延续”的风险。

### 2. 领域语义不是视觉修饰，而是可信度与操作边界

[1.2 的 `domain.md`](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)要求把数据、风险、状态、权限和业务操作边界说清楚，而不是让通用 SaaS 组件替产品发明含义。

当前 `product-design-context` 对这一点覆盖很强：

- `product-design-context/SKILL.md:58-72` 要求实体关系、术语、状态转换、角色权限、敏感数据、高风险动作、置信度和审计规则；
- `product-design-context/SKILL.md:72` 明确禁止把 `DOMAIN.md` 降成词汇表；
- `product-design-context/assets/DOMAIN.template.md:34-64` 为状态、权限、风险、敏感数据、不可逆动作和来源展示提供结构化字段；
- `component-pattern-foundation/SKILL.md:81-85` 又把领域映射、证据与责任人带入组件契约。

### 3. `DESIGN.md` 是视觉意图、语义角色、token 和使用理由的共同真值源

[1.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)及示例 [design.md](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/04-design-md.md)都反对把设计系统缩减为散落数值；规范需要说明视觉意图、角色、派生、状态、典型表面和缺口。

当前套件明确承接了主要原则：

- `design-system-foundation/SKILL.md:83-96` 从产品意图推导情绪、密度、色彩温度、字体、形状、动效与品类姿态，并禁止空洞形容词；
- `design-system-foundation/SKILL.md:98-110` 要求精确 token 与语义角色、YAML 与文字理由一致，并把 Google schema 不适合表达的内容放入 prose 或 companion docs；
- `design-system-foundation/SKILL.md:155-163` 要求引用可解析、对比度可访问、示例遵循 token、默认值和缺口可见；
- `design-system-foundation/assets/DESIGN.template.md:20-53` 把 Overview、颜色、字体、布局、层级、形状、组件和 Do/Don't 作为基础章节。

### 4. 组件目录要说明“什么时候用”，不是只列出“有什么”

[1.2 的 `components`](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)和示例 [components](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/05-components.md)强调组件的语义边界；例如 Badge、Tag、Toast、Alert 看似相近，但责任不同。

当前 `component-pattern-foundation` 几乎是直接对应：

- `component-pattern-foundation/SKILL.md:41-55` 按责任而不是外观或文件名盘点组件；
- `component-pattern-foundation/SKILL.md:57-68` 专门处理 Badge/Tag、Dialog/Drawer/Popover、Tabs/segmented switch、Skeleton/Spinner、Toast/Alert 等语义碰撞；
- `component-pattern-foundation/SKILL.md:70-87` 要求 use/do-not-use、内容、变体、状态、行为、恢复、无障碍、领域映射、来源与批准状态；
- `component-pattern-foundation/assets/COMPONENTS.template.md:21-38` 把这些要求固化为 Agent 可填写的条目。

### 5. 非理想状态、恢复与风险节点必须成为规范的一部分

[1.2 的 `spec.md`](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)反复强调加载、空、失败、权限、边界和恢复；[1.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.3)要求在交付前补齐这些状态。

虽然当前缺少独立 `spec`，但这个经验已明确进入组件和模式基础：

- `component-pattern-foundation/SKILL.md:89-101` 要求 normal/non-ideal states、风险确认、完成与恢复、响应式；
- `component-pattern-foundation/assets/PATTERNS.template.md:17-33` 明列 empty/loading/error/permission、confirmation、completion/recovery 和 responsive behavior；
- `design-system-foundation/SKILL.md:112-123` 要求代表性验证覆盖主流程、高密度状态、empty/error/loading 和窄视口；
- `design-system-review/SKILL.md:91-102` 会检查非理想状态和响应式是否可信。

### 6. 评估必须先有证据，再有分数

[3.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.3)要求用浏览器、DOM/CSS、页面结构、点击和截图形成多模态证据链；模型解释原因，但不能脱离证据主观裁决。

当前评估契约明确接受这一原则：

- `design-evaluation-foundation/SKILL.md:48-60` 区分 brief、截图、DOM/layout/accessibility、交互恢复、内容与来源、设计系统一致性和用户结果证据；
- `design-evaluation-foundation/SKILL.md:60` 明确指出 artifact QA 不能证明用户价值；
- `design-evaluation-foundation/assets/EVAL.template.md:11-16` 把 “Evidence before score” 和“评可见产物，不评作者私下意图”写成首要原则；
- `design-system-review/SKILL.md:8`、`:128-133` 要求独立评可见文档和产物，不依赖生成者隐藏推理。

### 7. 共用质量语言，但按页面/任务形态改变权重

[3.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.2)先识别页面类型，再使用 Product Intent、Trust & Domain Fit、Information Architecture、Interaction Readiness、System Craft、Visual & Brand Expression 六个共同维度，按页面类型调整权重。

当前 `design-evaluation-foundation` 明确承接且做了泛化：

- `design-evaluation-foundation/SKILL.md:34-46` 要求列出真实产品的页面/任务形态，同时不强行套固定 taxonomy；
- `design-evaluation-foundation/SKILL.md:62-74` 基本复现六维语言，并增加可选 outcome evidence；
- `design-evaluation-foundation/assets/EVAL.template.md:33-43` 要求每个维度记录 page/task shape 权重、可观察 subcheck、证据和 return destination。

### 8. Blocker 不能被漂亮的平均分抵消

[3.4](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.4)把关键任务不清、主路径断裂、领域错误、AI 不可信、系统不一致或缺失关键截图等定义为不能被平均分掩盖的阻断项。

当前实现非常明确：

- `design-evaluation-foundation/SKILL.md:76-90` 列出主任务、领域/权限、关键路径、可访问性、数据/AI 可信、恢复、设计系统一致性和证据缺失等 blockers；
- `design-evaluation-foundation/assets/EVAL.template.md:11-16` 直接写明 blockers cannot be averaged away；
- `design-evaluation-foundation/assets/EVAL.template.md:45-56` 要求 blocker override 和 missing-evidence policy；
- `design-system-review/SKILL.md:104-120` 用明确 verdict 与 severity 而不是只给总分。

### 9. 评审成熟度、回流计划与停止条件

[3.4](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.4)区分探索稿、原型和上线门禁；失败必须给证据、影响与下一轮动作，并在通过、最大轮数、平台期或退化时停止。

当前几乎逐项吸收：

- `design-evaluation-foundation/SKILL.md:92-100` 定义 exploration / prototype / release；
- `design-evaluation-foundation/SKILL.md:102-112` 要求 finding、证据、维度、blocker、返回文档、行动和责任人，并定义 pass/max rounds/plateau/regression/human research；
- `design-evaluation-foundation/assets/EVAL.template.md:58-72` 固化 return plan 与 stop rules；
- `design-system-review/SKILL.md:104-113` 要求小而有优先级的 return plan，禁止无排序愿望清单。

### 10. 生成器和评估器隔离，并用对照案例校准标准

[3.1](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.1)和[3.5](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.5)要求评估器只看任务、产物、截图、QA 与上轮结果，不看生成器隐藏规划；标准还需要用好、坏、混合、边界案例离线校准。

当前覆盖明确：

- `vibe-design-bootstrap/SKILL.md:95-97` 要求 independent review；
- `design-system-review/SKILL.md:8` 和 `:133` 明确不依赖 private generator reasoning；
- `design-evaluation-foundation/SKILL.md:114-125` 要求 pass/fail、视觉强但任务坏、可用但 off-brand、阈值边缘与品类案例，并追踪 false pass / false reject；
- `design-evaluation-foundation/SKILL.md:144` 禁止在未经过对照样本前声称 rubric 已校准。

## 只被部分吸收的理念和经验

### 1. Design I/O 被改造成了“文档 I/O”

[1.1](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.1)中的主链是理解/规划、搭骨架、填充、细化、评估；token 贯穿，critique 回到相关环节。当前 `vibe-design-bootstrap/SKILL.md:69-97` 也有阶段和 gate，但它编排的是：产品/领域文档 → 视觉系统 → 组件/模式 → 评估契约 → 文档审查。

两者同样重视顺序、接口和回流，但对象不同：

- 原文编排一次真实界面从需求到交付的生产；
- 当前 Skill 编排一次基础规范从证据到批准的建设。

当前 `design-evaluation-foundation/SKILL.md:102-112` 能把失败退回某份来源文档，却没有把问题退回“规划、骨架、填充、细化”的实际生成阶段，也没有一条让 token 在页面生成全过程持续生效的执行 Skill。因此只能判定为部分吸收。

### 2. 六份设计声明只完整承接了其中三份，另有一份近似承接

[1.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)的六份声明是 `spec.md`、`domain.md`、`craft.md`、`design.md`、`components`、`template`。

当前对应关系如下：

| Playbook 声明 | 当前承接 | 状态 |
| --- | --- | --- |
| `spec.md` | 无独立 Skill/产物；`PRODUCT.md`只定义产品级背景，不是单功能六层 spec | 缺失 |
| `domain.md` | `product-design-context` + `DOMAIN.template.md` | 明确吸收 |
| `craft.md` | 工艺、动效、可访问性零散进入 DESIGN、COMPONENTS、EVAL | 部分吸收，独立判断源缺失 |
| `design.md` | `design-system-foundation` + Google-compatible `DESIGN.md` | 明确吸收核心；完整 V1–V7 仍有缺口 |
| `components` | `component-pattern-foundation` + `COMPONENTS.md` | 明确吸收 |
| `template` | `PATTERNS.md`描述页面/任务结构和适配槽位 | 部分吸收；没有可直接调用的 app shell/template 资产 |

当前新增的 `PRODUCT.md` 很有价值，但不能替代 `spec.md`：`product-design-context/assets/PRODUCT.template.md:11-59`处理产品定义、用户、结果、原则、任务模型和约束，没有为每个新需求写信息架构、核心路径、组件功能、边界条件和验收标准。

### 3. `DESIGN.md` 吸收了主干，但没有完整覆盖 Playbook 的 V1–V7

当前 `design-system-foundation` 对视觉意图、token 语义、代表性验证、缺口与审批覆盖很好。然而 [1.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)及 [design.md 示例](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/04-design-md.md)还强调：视觉角色、值系统、派生机制、组件视觉状态和响应式、图形/数据视觉/典型表面、执行与系统缺口。

当前模板 `design-system-foundation/assets/DESIGN.template.md:20-53` 没有显式章节承接：

- 状态值如何从基础 token 派生；
- 数据可视化、图形/图标/插画的系统规则；
- 典型产品表面的组合示例；
- 运行时遇到不存在 token 时如何记录并阻止 hardcode。

Skill 正文 `design-system-foundation/SKILL.md:110` 允许把 motion、responsive、iconography、data visualization 和 component semantics 放入 prose 或 companion docs，这是合理兼容 Google schema 的方式，但它没有强制这些内容一定被创建。因此是“核心明确吸收、完整度部分吸收”。

### 4. `gaps.log` 的“合法失败”思想进入了文档，却没有进入实际生成运行时

Playbook 在 [1.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)要求找不到 token 时不能静默 hardcode，而要把缺口记入 `gaps.log`，让局部失败回流为系统建设输入。

当前有多个对应点：

- `vibe-design-bootstrap/SKILL.md:47-55` 有 `missing` 状态；
- `product-design-context/SKILL.md:82` 要求写入 `design/GAPS.md`；
- `design-system-foundation/SKILL.md:47-51` 把 GAPS 列为默认输出；
- `design-system-foundation/SKILL.md:175` 禁止把缺失 token 隐藏进实现字面量；
- `design-system-review/references/review-rubric.md:67` 把 hidden agent defaults 视为 blocker。

但这六个 Skill 都不负责实际实现页面，所以没有“实现 Agent 查不到 token → 停止默认化 → 写 gap → 使用临时策略/请求批准”的强制执行步骤。合法失败目前是基础文档治理原则，不是运行行为。

### 5. Template 与 variant 探索只保留了抽象规则

[1.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.3)、[variant skill](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/09-variant-skill.md)和 [IA variants](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/10-ia-variants.md)展示的是：先用模板建立场景骨架，或生成结构差异明显的 IA 方案，再选择/合成，而不是直接给同一页面换三套颜色。

当前有两处对应：

- `design-system-foundation/references/create-mode.md:7-29` 要求至少三个在视觉 thesis 上不同的方向，并应用到代表性产物后由人选择；
- `component-pattern-foundation/SKILL.md:89-103` 与 `PATTERNS.template.md:17-33` 定义页面/任务形态、层级、区域、适配槽位和禁用适配。

但当前没有独立的 template 资产格式、app shell、IA variant 生成/对比流程，也没有将选择结果交给 prototype 的 Skill。它吸收了“不要只换皮”和“模式要可适配”，没有吸收完整探索执行。

### 6. 浏览器证据链被写进标准，但尚未变成可复现的采集流程

[3.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.3)不是只列“需要截图和 DOM”，而是要求真正打开页面并形成 DOM/CSS QA、Page Profile、Click Smoke、Screenshot 四类证据，处理事实冲突时以可见结果为优先，然后让运行时按 subcheck 重算。

当前 `design-evaluation-foundation/SKILL.md:48-60` 已列出相近证据层，`design-system-review/SKILL.md:91-102` 也会看代表性产物。但缺少：

- 如何启动、访问和稳定等待页面；
- 哪些 DOM/CSS 检查是确定性检查；
- 主路径点击脚本及期望反馈；
- 截图视口、状态和命名协议；
- DOM 与截图冲突时的证据优先级；
- 证据文件和报告 schema。

因此是评估要求层面的明确吸收、工具运行层面的缺失。

### 7. 六维模型与 subcheck 已有，但确定性评分运行时尚未实现

[3.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.2)使用 0–2 subcheck，再按页面形态权重聚合；[3.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.3)强调模型解释问题，运行时重算结果。

当前 `design-evaluation-foundation/assets/EVAL.template.md:33-56` 有维度、权重、Pass/Partial/Fail、阈值、blocker override 和 missing-evidence policy，但没有规定：

- `Pass/Partial/Fail` 到数值的确定映射；
- 谁执行重算，怎样防止评审模型自行改权重；
- 输入/输出 schema 和 policy 版本；
- 两轮结果如何比较与保留最佳版本。

这避免了未经团队批准就硬编码 Playbook v1.5 的具体分数，是稳妥的；但也意味着它还只是 rubric authoring，不是 evaluator runtime。

### 8. 反“AI 模板味”被提及，但缺少独立 craft 判断源

[引言](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-intro)、[1.1](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.1)和 [1.2 的 `craft.md`](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)反复讨论平均化、安全化、蓝紫渐变、等大白卡、大写标签、装饰性动效等套路，并要求把排版、层级、动效、反馈、可访问性和反模板工艺沉淀为通用声明。

当前只有分散承接：

- `design-system-foundation/references/create-mode.md:29` 禁止用 generic AI defaults 填补品牌决策；
- `design-system-review/SKILL.md:99-100` 要求不是复刻一张参考图，且保持 distinctive but appropriate identity；
- `design-system-foundation/SKILL.md:93` 提到 motion posture；
- `component-pattern-foundation/SKILL.md:80`、`:98` 纳入无障碍与响应式。

没有 `craft.md` 或对应 Skill 来系统规定层级、构图、密度、文案、动效目的、材质克制和反套路检查，也没有读取 [craft-animation](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/07-craft-animation.md)一类规则的执行入口。因此只是部分吸收。

## 缺失或明显偏离的部分

### 1. 缺少单需求 `spec.md` 与六层功能定义

这是最关键的缺口。[1.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)、[1.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.3)和 [ux-spec skill](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/00-ux-spec-skill.md)把 spec 定义为一次功能/页面成立的条件，至少覆盖定位与意图、信息架构、核心链路、组件功能、边界条件和验收标准。

当前 `PRODUCT.md` 是长期产品上下文，`PATTERNS.md` 是复用模式，`EVAL.md` 是通用评估契约；没有一份产物把“这次需求”绑定到具体用户、流程、状态、例外和验收。因此未来 Agent 仍可能从一句话直接跳到页面，这正是 Playbook 要解决的问题。

### 2. 缺少从一句话到可交付原型的执行 Skill

[1.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.3)把完整链路串为：需求澄清与 spec → template/variant/visual spec → components/domain/design 填充 → craft 与非理想状态 → prototype → evaluator → 回流。

六个 Skill 没有一个负责：

- 接收具体功能需求；
- 创建 IA/visual variants；
- 生成或更新真实界面；
- 根据评审报告迭代界面；
- 在通过或停止条件满足时交付。

而且 `component-pattern-foundation/SKILL.md:135` 明确不实现组件代码，`design-evaluation-foundation/SKILL.md:8` 明确不评具体设计。这是当前范围选择，不是隐藏 bug，但它说明完整 Vibe Design 工作流尚未存在。

### 3. 第二章 AX / GenUI / A2UI 基本没有被吸收

[2.1](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.1)认为 Agent 缩短了执行鸿沟，却放大了用户理解、验证、纠错和撤销结果的评估鸿沟；[2.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.2)只允许在任务路径、判断依据或决策点随上下文变化时使用 GenUI；[2.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.3)要求 Agent 声明意图/数据/状态/动作，客户端用受控组件、token、无障碍、校验和降级规则渲染；[2.4](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.4)则用 OmniBox、FlexCard、GenReport 串起输入、过程和结果。

当前零散相关内容只有：

- `product-design-context/SKILL.md:65-69` 的权限、敏感数据、高风险动作、置信度与来源；
- `component-pattern-foundation/SKILL.md:97-101` 的非理想状态、风险确认、完成与恢复；
- `design-evaluation-foundation/SKILL.md:40` 把 conversational/agentic workflows 作为可能的页面形态。

但没有 GenUI 适用性判断、A2UI schema、受控 renderer 契约、授权/等待/撤销状态、fallback、OmniBox/FlexCard/GenReport 模式或对应评估项。对普通非 Agent 产品，这可以是后续可选模块；如果团队要设计 AI/Agent 产品，则是实质缺口。

### 4. 缺少真正的 evaluator runtime 和生成—评估闭环

[3.1](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.1)到[3.5](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.5)描述的是一套运行机制，不只是 rubric 文件：浏览器取证、隔离评审、结构化 finding、运行时重算、阻断、报告、return plan、下一轮生成、平台期/退化停止或回滚、离线校准。

当前：

- `design-evaluation-foundation` 创建 `EVAL.md`；
- `design-system-review` 审的是基础文档集合是否可供团队使用，而不是一项真实 UI 交付；
- 没有浏览器执行、截图、点击 smoke、确定性 scoring、自动回流和最佳版本保留。

因此“自我进化”的判断标准已明显吸收，运行飞轮尚未建立。

### 5. 缺少 Figma 分流和 IDE/Figma 回写协议

[1.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.3)给出两种路线：规则和组件成熟时可直接产出 prototype；视觉复杂度高时进入 Figma 专业推敲，再把决定回写到 IDE/规范。

当前 `vibe-design-bootstrap/SKILL.md:38-40` 和 `design-system-foundation/SKILL.md:34-36` 会读取 Figma 与代码证据，`design-system-foundation/SKILL.md:52` 也允许视觉 preview，但没有：

- 何时选直接原型、何时进入 Figma；
- Figma 产物的审批与真值优先级；
- 变量/组件/决策如何回写 `DESIGN.md` 和代码；
- 双向漂移如何检查。

### 6. 缺少附录 Lexicon 作为 Agent 可按需读取的设计语言

[附录](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-appendix)提供覆盖排版、色彩、图标、布局、交互、动效、无障碍、IA、文案、工具、分析和组件的术语与操作提示。当前六个 Skill 没有任何一项把该词典转成按需参考、prompt vocabulary 或审查语言。

词典不应被机械当成普适规范，但作为“设计师与 Agent 使用同一套精确词汇”的参考层，目前是缺失的。

## 每个 Skill 的单独判断

### `vibe-design-bootstrap`

**吸收最好之处**：证据盘点、来源分级、人类 gate、专门 Skill 的依赖顺序、独立审查和不以文件齐全冒充验证，见 `SKILL.md:20-30`、`:32-67`、`:69-97`、`:99-111`。这很符合 Playbook 的“声明必须被契约调度”与治理思想。

**主要差距**：它编排基础文档，不编排一次需求的页面生产；没有 `spec / craft / template variant / prototype / browser evaluator`。

### `product-design-context`

**吸收最好之处**：`DOMAIN.md` 的业务语义、风险、权限、敏感数据、来源和不确定性，见 `SKILL.md:58-96`。

**主要差距**：`PRODUCT.md` 是有益扩展，但不是原文单任务 `spec.md`；没有为每项需求生成六层 UX spec。

### `design-system-foundation`

**吸收最好之处**：视觉意图不是空洞形容词、token 必须有语义角色、现状不自动等于标准、代表性产物验证、缺口不能被 hardcode 隐藏，见 `SKILL.md:56-68`、`:83-123`、`:155-175`。

**主要差距**：Google-compatible 模板没有强制覆盖 Playbook `design.md` 的所有 V1–V7 内容；`gaps` 还不是实现运行时行为；没有 token 跨生成阶段注入。

### `component-pattern-foundation`

**吸收最好之处**：组件语义边界、冲突选择、完整状态、恢复、无障碍、领域映射，以及 template 不应是死截图，见 `SKILL.md:41-103`。

**主要差距**：`PATTERNS.md` 是规则目录，不是可直接调度的 template/app shell；没有 variant/IA 探索执行，也没有真实组件目录与 A2UI renderer 契约。

### `design-evaluation-foundation`

**吸收最好之处**：它是六个 Skill 中与 Playbook 最一致的一项。证据层、六维度、页面形态权重、blocker、成熟度、return plan、stop rule 和校准都在，见 `SKILL.md:34-125`。

**主要差距**：它明确只创建标准，不评具体产物；没有浏览器证据采集、确定性重算、schema/policy 版本、迭代控制与回滚。

### `design-system-review`

**吸收最好之处**：独立评审、只看可见证据、跨文档追踪、阻断/严重度、优先 return plan，见 `SKILL.md:8`、`:40-50`、`:68-113`、`:126-133`。

**主要差距**：它审查的是“基础文档能否被团队采用”，不是 Playbook 第三章的“具体 UI 交付能否放行”；没有 DOM/CSS QA、Page Profile、Click Smoke 和截图证据运行。

## 合理偏离与有益扩展

以下差异不应简单判成“没有照抄原文”：

1. **增加 `PRODUCT.md`**：Playbook 的主要六声明没有把长期产品上下文单列出来；当前套件将产品边界、用户、结果、原则和非目标独立管理，能减少 `DOMAIN.md` 和 `spec.md` 将来相互污染，是有益扩展。
2. **不固定 Playbook 的五类页面 taxonomy**：`design-evaluation-foundation/SKILL.md:34-46` 要求从真实产品任务出发，再以原文类别作示例。这比把 CloudAI 的分类硬编码成跨行业标准更可复用。
3. **不直接硬编码 v1.5 的数值权重与桌面视口**：原文第三章展示的是一个具体 evaluator 版本。当前把权重、阈值、blocker 交给治理者批准，见 `design-evaluation-foundation/SKILL.md:127-135`，适合作为通用 Skill。
4. **显式加入用户/结果证据**：`design-evaluation-foundation/SKILL.md:58-60`、`:72` 强调 artifact quality 不等于用户价值，弥补了原文更偏页面产物质量的局限。
5. **兼容 Google `DESIGN.md`**：这不是 Playbook 的强制格式，但让视觉真值源可 lint、diff、export；`design-system-foundation/SKILL.md:139-163` 还明确区分语法通过与设计有效，方向合理。

## 建议的下一步补全顺序

如果目标是“先建立通用基础文档 Skill”，当前六个 Skill 的方向成立，不需要推倒重来。若目标升级为“按 Playbook 运行完整 Vibe Design”，建议后续按依赖顺序补充：

1. **`feature-design-spec`**：把一句话需求写成定位/意图、IA、核心链路、组件功能、边界条件、验收标准；输出单需求 `spec.md`。
2. **`design-craft-foundation`**：沉淀跨项目可复用但可配置的排版、层级、密度、动效目的、反馈、可访问性与反模板规则；输出 `craft.md`。
3. **`design-template-and-variants`**：建立 app shell/page template，并生成真正结构不同的 IA/visual variants，支持人类选择或合成。
4. **`vibe-design-execute`**：编排 `spec → template/variant → domain/components/design/craft → prototype`，让 token 和组件契约在实际生成中持续生效。
5. **`design-artifact-evaluator`**：真实运行浏览器取证、点击 smoke、截图、结构化 finding、确定性计分/blocker、return plan 和停止/回滚。
6. **可选 `agentic-interface-foundation`**：当团队设计 AI/Agent 产品时，再加入 AX、GenUI 适用性、A2UI schema、受控 renderer、授权/等待/撤销/fallback，以及 OmniBox/FlexCard/GenReport 模式。
7. **Lexicon 作为 reference，而非强制风格**：让 Agent 在需要精确描述设计时按需读取，不把 CloudAI 的具体审美规则误当成普适标准。

这会形成四层清晰结构：

```text
基础真值层（现有）
PRODUCT / DOMAIN / DESIGN / COMPONENTS / PATTERNS / EVAL
                  ↓
需求与探索层（待补）
spec / craft / template / IA + visual variants
                  ↓
生产执行层（待补）
planning → skeleton → fill → refine → prototype
                  ↓
证据与评估运行时（部分已有，待补执行）
browser evidence → subchecks → blockers → return plan → iterate/stop
```

## 最终判断

对“这些 Skill 有没有吸取 Playbook”的准确回答不是简单的“有”或“没有”，而是：

> **有，且对第 1.2 节和第三章的吸收很明显；但当前主要把 Playbook 编译成了“如何建设并治理设计基础文档”，尚未把它编译成“如何完成一次具体设计需求”的完整运行链。**

保留现有六个 Skill 作为 foundation layer 是合理的。下一轮验证不应只检查它们能不能生成整齐的 Markdown，还应检查：它们是否能把一套混乱旧设计转成有证据、有审批、有缺口、有语义边界、可供后续 Agent 正确消费的基础真值。与此同时，不能用这轮验证结果声称完整 Vibe Designing 工作流已经建立；缺失的需求 spec、craft、template/variant、真实生产执行、浏览器 evaluator 和 AX/A2UI 必须单独补齐并验证。
