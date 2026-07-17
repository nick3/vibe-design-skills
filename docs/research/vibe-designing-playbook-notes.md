# 《Vibe Designing Playbook》完整阅读笔记

> 阅读日期：2026-07-17
> 第一方原站：[Vibe Design Playbook](https://alibaba-cloud-design.github.io/vibe-designing-playbook/)
> 说明：原站是一个客户端渲染的单页长文，不是传统的多页文档。本文按页面真实锚点逐章阅读，并补读了正文链接的 12 份示例附件。

## 一句话理解

这篇 Playbook 真正讨论的不是“怎样写一个更好的生成 UI prompt”，而是怎样把设计师的 **taste 编译成一套可执行、可验证、可回流、可维护的生产系统**。

它的中心命题可以压缩为：

> 人负责定义什么是好；Agent 负责读取和规模化执行这些判断；评估运行时负责用证据检查判断是否兑现。

原文把这套系统分为三层：[设计工程](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-ch1)解决生成的可控性，[动态交互](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-ch2)解决界面如何在运行时适配真实意图，[自我进化](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-ch3)解决产物如何接受稳定评估并回到下一轮。

## 阅读覆盖范围

### 正文与附录

| 阅读单元 | 原文定位 | 核心问题 |
| --- | --- | --- |
| 引言 | [Introduction](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-intro) | AI 为什么容易产生安全、平均、模板化的设计 |
| 1.1 | [Design I/O](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.1) | 设计能力从生成链路的哪里进入，问题从哪里回流 |
| 1.2 | [设计声明与执行契约](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2) | 什么是好，以及如何让标准真正进入流程 |
| 1.3 | [从一句话到一个页面](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.3) | 从模糊需求到可交付原型的完整演练 |
| 2.1 | [从 UX 到 AX](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.1) | Agent 压缩执行鸿沟后，如何处理被放大的评估鸿沟 |
| 2.2 | [GenUI：新的 Interface](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.2) | 哪些界面应该动态生成，以及自由度的边界 |
| 2.3 | [A2UI](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.3) | Agent 与客户端怎样通过结构化契约协作 |
| 2.4 | [OmniBox、FlexCard、GenReport](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.4) | 意图输入、过程协作、结果交付如何形成闭环 |
| 3.1 | [人工指正的尽头](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.1) | 如何把重复的人工意见沉淀为评审运行时 |
| 3.2 | [页面类型与六维度模型](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.2) | 不同页面如何共享一套语言又采用不同权重 |
| 3.3 | [浏览器、截图与检查项](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.3) | 评估如何建立多模态、可追溯的证据链 |
| 3.4 | [交付闸门](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.4) | 为什么高平均分也可能不能放行 |
| 3.5 | [工程化与标准维护](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.5) | 隔离、报告、离线校准如何让判断长期稳定 |
| 结语 | [Closing](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-outro) | 设计专业怎样从个人经验进入系统 |
| 附录 | [Lexicon](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-appendix) | 12 类、188 个中英设计术语及简短操作提示 |

另阅读了三个章扉导语与目录。原站导航确认只包含引言、三章共 12 个编号章节、结语和词典，没有遗漏其他正文路由。

### 示例附件

正文中的 12 份公开附件均已访问：

- [ux-spec skill](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/00-ux-spec-skill.md)
- [Agent Dashboard spec](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/01-agent-dashboard-spec.md)
- [cloudai-picker skill](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/02-cloudai-picker-skill.md)
- [dashboard template](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/03-dashboard-template.md)
- [design.md](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/04-design-md.md)
- [components](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/05-components.md)
- [domain.md](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/06-domain.md)
- [craft-animation](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/07-craft-animation.md)
- [evaluator rubric](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/08-evaluator-rubric.md)
- [variant skill](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/09-variant-skill.md)
- [IA variants](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/10-ia-variants.md)
- [visual spec](https://alibaba-cloud-design.github.io/vibe-designing-playbook/attachments/11-visual-spec-output.md)

站内正文还暴露了两个相对 Markdown 链接：`1.1-调度机制.md` 与 `1.2-声明与契约.md`，部署端实际均返回 404；可用正文是上述单页锚点版本。这是站点信息架构上的小瑕疵，不影响主体阅读。

## 核心方法论

### 1. Design I/O：把“一次生成”改造成“可介入的生产链”

[1.1](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.1)把页面生成拆成：

```text
理解/规划 → 搭骨架 → 填充 → 细化 → 评估
                 ↑
        token 约束持续贯穿
                 ↓
       critique 回到对应环节
```

最重要的不是五步本身，而是“环节即接口”：不同错误必须回到不同知识来源。缺少重试入口是功能规格问题，状态色混乱是领域语义与视觉系统问题，卡片墙是模板问题，“蓝紫渐变 + 等大白卡”是工艺问题。它反对在页面表面继续叠 prompt 补丁，而要求先定位错误属于哪一层。

### 2. 六份设计声明：把“什么是好”分解清楚

[1.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.2)提出六类声明：

| 声明 | 它负责回答 |
| --- | --- |
| `spec.md` | 功能怎样才算成立，包括状态流、边界条件与验收标准 |
| `domain.md` | 在这个业务中，数据、风险、权限与操作意味着什么 |
| `craft.md` | 跨业务的排版、层级、动效、反馈、可访问性和反模板工艺 |
| `design.md` | 视觉意图、角色、token、派生规则、组件视觉状态与系统缺口 |
| `components` | 组件表达什么语义，什么时候该用、什么时候不能用 |
| `template` | 某类场景应从什么页面骨架、密度与 app shell 起步 |

其中 `spec.md` 的六层结构尤其扎实：定位与意图、信息架构、核心链路、组件功能、边界条件、验收标准。文章不断强调 L5/L6，因为模型最容易只做出“适合截图的成功态”，却遗漏加载、空、失败、权限和恢复。

`design.md` 也不被缩减成 token 表。正文给出 V1 到 V7：视觉意图、视觉角色、视觉值系统、派生机制、组件状态与响应式、图形/数据视觉/典型表面、执行与缺口。找不到 token 时不允许悄悄 hardcode，而要记录 `gaps.log`；文章称之为“合法失败”。这是很成熟的系统观：缺口被看见，才可能成为下一轮设计系统建设的输入。

### 3. 两份执行契约：让标准在正确时机出现

声明只定义方向，不保证被读取。文章因此只把两类东西称作执行契约：

- `skill` 是调度契约，封装触发条件、执行步骤、按需引用和历史坑位；
- `evaluator` 是验收契约，把声明转换成检查项、证据、扣分原因和回流位置。

这个区分非常关键。只有声明，团队会堆出很多无人调用的规范；只有 skill，团队会有很多自动化动作，却没有统一判断来源。声明是法律，契约是执法程序。

### 4. 实操链路：从一句话到页面

[1.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-1.3)将真实工作流串为：

1. 一句话需求先变成六层 spec，并在必要时形成 visual spec；
2. 用 template 或 variant 探索信息架构；
3. 用 components、domain、design.md 填入正确组件和业务语义；
4. 用 spec、craft 与动效规则补齐非理想状态；
5. 用 evaluator 验收，并把问题准确退回某份声明或契约。

它还给出两种交付路线：规则和组件已经成熟时直接生成 prototype；视觉复杂度高时接入 Figma 做专业推敲，再回写 IDE。Figma 是增强环节，不是方法成立的前提。

## 从 UX 到 AX：动态界面的真正边界

[2.1](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.1)最有价值的判断是：Agent 压缩了“我该点哪里”的执行鸿沟，却放大了“它到底做对没有”的评估鸿沟。因此 AX 设计的核心不是多放一个聊天框，而是让用户能够委托、理解、验证、修正和撤销。

[2.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.2)对 GenUI 的定义也很克制：只在任务路径、判断依据或决策点随上下文变化时动态组织界面。稳定仪表盘、设置页、长期 IA 不应为了“生成”而被反复生成。它追求的是“受控生成”，而不是最大自由度。

[2.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.3)进一步通过 A2UI 分开两件事：

- Agent 声明意图、数据、状态、动作以及是否需要等待用户；
- 客户端用自己的组件目录、token、无障碍、校验和降级规则渲染。

也就是把“表达什么”与“怎样渲染”分开。Agent 获得运行时组织能力，但不直接接管 HTML/CSS、品牌、安全和交互底线。

[2.4](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-2.4)用三种界面完成闭环：OmniBox 承接意图和上下文，FlexCard 承接过程中的澄清、授权与风险确认，GenReport 把复杂结果变成可读、可分享、可继续行动的交付物。

## “自我进化”实际是一套受治理的评审运行时

文章没有把自我进化理解为模型自称“我变好了”。[3.1](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.1)明确分离生成器与评估器：生成器提出版本，评估器只面对当前交付物和标准。人的位置从逐稿纠错，移动到维护 framework、prompt、schema 与 policy。

### 页面类型与六维账本

[3.2](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.2)先识别 Brand Landing、Product Console、Conversational Interface、Data Dashboard、Content/Documentation 五类 page shape，再用共同的六维度语言、不同权重评估：

1. Product Intent；
2. Trust & Domain Fit；
3. Information Architecture；
4. Interaction Readiness；
5. System Craft；
6. Visual & Brand Expression。

每个维度继续拆成 0–2 分的 subcheck，再聚合成维度分。这避免先凭印象给总分、再倒推解释。

### 多模态证据链

[3.3](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.3)要求先用浏览器把页面变成证据：

- DOM/CSS QA 查溢出、裁切、低对比、小点击目标、坏图等确定性事实；
- Page Profile 查结构、路径、文案、CTA 和占位链接；
- Click Smoke 查关键动作是否有反馈、报错或断裂；
- Screenshot 查可读性、视觉层级、构图、品牌语气和动效目的。

浏览器 QA 不是设计分数，模型判断也不能脱离证据。若 DOM 说结构完整、截图却显示文字被吃掉，截图优先。模型负责解释“为什么”，运行时按 subcheck 与权重重算最终分数。

### 交付闸门而非排行榜

[3.4](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.4)区分过程稿、原型和上线门禁三种成熟度，并引入不能被平均分掩盖的 blocking finding，例如主任务不清、关键路径断裂、领域逻辑错误、AI 回答不可信、系统不一致或截图评审缺失。

未通过时，输出不应是“继续优化”，而要说明证据位置、影响维度和下一轮动作。循环还必须会停：通过、达到最大轮数、进入平台期或连续退化时，都应终止或回滚到较优版本。

### 隔离与标准维护

[3.5](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-3.5)规定评估器能看任务、原型、截图、QA 和上轮结果，但不看生成器的隐藏规划或作者事后解释。评审看稿件，而不是作者脑中的稿件。

运行时之外再用好、坏、混合、边界和不同品类案例持续校准，检查每次改标是否减少误放行、是否引入误退回。由此可见，这里的“自我进化”其实是 **人类维护标准、机器稳定执行、案例持续校准** 的治理循环，而不是无监督的自主学习。

## 角色分工

| 角色 | 在这套系统里的责任 |
| --- | --- |
| 设计师 / 领域专家 | 定义 taste、业务语义、边界与完成标准；维护声明、检查项和校准样本 |
| 用户 | 表达目标和上下文；在风险、权限、不确定性与结果节点做确认或修正 |
| 生成器 Agent | 读取声明与 skill，提出当前版本 |
| skill | 判断何时调用什么能力，以什么顺序、读哪些材料 |
| 客户端 Renderer | 将 A2UI 的结构化意图映射到受控组件、token、无障碍与安全规则 |
| 评审模型 | 基于任务、截图、QA 和 rubric 解释质量问题 |
| 评估运行时 | 重算分数、处理阻断、形成报告和 return plan |
| 团队治理者 | 离线复盘误判，维护页面类型、权重、schema 与门禁策略 |

## 工具观与质量观

### 工具观

- 文档不是终点。只有能被 skill 调度、被 evaluator 检查，才算进入生产系统。
- 设计系统应是活的事实源，不是静态物料库；组件目录必须包含语义，而不只是截图和名称。
- Figma 仍然适合复杂视觉推敲，但不再是唯一真值源，也不是 AI 设计链路的前提。
- 浏览器、截图与点击检查不是“测试结束后的 QA”，而是设计评审获取事实的感官。
- 模型擅长解释与综合，不应独占最终裁决；公式、权重、schema 和 blocking rule 应由运行时执行。

### 质量观

文章把“好设计”从“好不好看”扩展为产品意图、业务可信、信息架构、交互恢复、系统工艺与品牌表达的共同结果。它尤其重视：

- 非理想状态是否完整；
- 组件和颜色是否承担可信的业务语义；
- 动效是否解释状态而不是装饰；
- 选择是否来自 token、规则或明确意图，而不是模型默认值；
- 问题能否被证据定位、被回流、被追账；
- 致命问题是否会被平均分掩盖。

## 我的理解与感悟

### 1. 它最深的创新是“把 taste 变成基础设施”

文章表面在谈 AI UI，深处在谈组织知识。每次生成失败都不应只修当前页面，而应追问：这是声明缺口、执行缺口、评估缺口，还是设计系统缺口？如果同类问题出现第二次，就该沉淀为系统能力。

这使设计从“生产画面”转向“建立判断制度”。设计师的杠杆不再只是一张更好的稿，而是让未来一百张稿都能继承同一套判断。

### 2. “受控生成”比“无限生成”更像真实产品方向

A2UI 的分工非常有说服力：Agent 决定此刻需要表达什么，客户端决定如何以产品可接受的方式表达。它既保留上下文适配，又不放弃品牌、安全、性能、无障碍和一致性。真正可落地的 GenUI，大概率不是模型随时自由写 UI，而是结构化意图驱动受控组件。

### 3. `gaps.log` 是全篇最值得带走的小机制

多数系统把规范缺口藏成临时代码。`gaps.log` 要求 Agent 在没有 token 或组件时可读地失败，把“做不到”转成设计系统 backlog。它让局部生成与长期系统建设发生连接，也比硬性禁止更符合真实生产。

### 4. 评估系统最重要的不是分数，而是证据与回流

六维度、权重和阈值都可以调整；真正不可替代的是：页面被真实打开、行为被真实触发、截图与 DOM 相互校正、问题能回到具体 subcheck 和声明。分数只是压缩表示，return plan 才是让下一轮变好的接口。

### 5. 设计师权力被放大，也更需要制衡

“由人定义好”很有力量，但也意味着少数人的 taste 可能被固化、规模化。标准必须可争论、可版本化，并接受真实用户行为、可用性研究、无障碍测试和业务结果的反证。否则系统可能非常稳定地生产“团队喜欢的设计”，却未必生产用户真正有效的设计。

## 局限与隐含假设

1. **“模型懂设计，只是向平均收敛”更像有启发性的判断，不是被严格证明的机制。** 模型能力不足、上下文缺失、实现约束和评估偏差同样可能导致平庸产物。
2. **方法强依赖成熟资产。** 没有可靠 token、组件语义、领域专家、模板、样本和维护者时，六份声明很容易变成另一套待更新文档。
3. **显式化会提升一致性，也可能压低探索性。** 反 AI Slop 规则适合 CloudAI 控制台，不应被误用成跨品类的普遍审美定律。
4. **当前评估器有明确的桌面端边界。** 原文说明默认 `1440×1000` 且 desktop-only，不因缺少移动端截图扣分；移动端、触摸、响应式和跨设备体验仍需另一套证据。
5. **权重、阈值与 blocker 尚缺公开验证结果。** 文中给出了校准方法，却没有报告设计师间一致性、误放行率、误退回率或上线后的用户指标变化。
6. **主闭环偏向 artifact quality，而不是 outcome quality。** DOM、截图和点击能判断界面是否成立，却不能独立证明任务完成率、信任、长期留存或业务价值。后续应把可用性测试、行为数据和业务结果接入标准维护。
7. **A2UI 的安全讨论仍偏原则层。** 权限、风险确认和客户端受控渲染被提到，但 schema 版本、授权绑定、输入校验、审计、恶意内容与跨 Agent 信任仍需更具体的协议。
8. **“自我进化”容易被误读。** 文中的系统并不会自己发明更好的价值判断；它依靠人维护标准和样本。更准确的说法是“自动化评审与受治理的持续校准”。
9. **第三章具有版本时效性。** 章扉明确按 Evaluator v1.5 组织，工程细节、权重和门禁策略应被视作当前实现，而非永恒框架。
10. **188 词附录的承诺大于形式化程度。** [Lexicon](https://alibaba-cloud-design.github.io/vibe-designing-playbook/#sec-appendix)覆盖排版、色彩、图标、布局、交互、动效、无障碍、IA、文案、工具、分析和组件，很多定义带有有用的数字或动作提示；但整体仍是微型术语解释，并非完整的机器可执行规则或 schema。

## 最终判断

这是一篇很有实践价值的“AI 时代设计基础设施”提案。它最值得学习的不是某个 token 数字、评分权重或 CloudAI 模板，而是四个可迁移原则：

1. 把模糊的不满意定位成某一类可维护的判断缺口；
2. 把标准与调用标准的流程分开；
3. 把动态性放在真正变化的意图和决策点上；
4. 用可追溯证据、阻断规则和回流计划代替“再优化一下”。

如果要用一句自己的话总结：**设计不会因为 AI 而消失，设计会从一次性交付物升级为约束生成、组织交互、裁决质量的一整套运行制度。**
