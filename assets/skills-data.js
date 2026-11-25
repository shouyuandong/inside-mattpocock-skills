/* 技能数据：来自本地仓库快照 2026-11-25，共 39 个 SKILL.md */
window.SKILLS = [
  /* ---------------- engineering ---------------- */
  {
    name: "ask-matt", cn: "技能路由", bucket: "eng", mode: "user",
    say: "不确定该用哪个技能、走哪条流程时，先问它。",
    points: [
      "主流程：/grill-with-docs → /to-spec → /to-tickets → /implement 或 /implement-spec → /pr → /retro。",
      "三个入口：/triage 处理堆积的 issue，/diagnosing-bugs 处理疑难 bug，/wayfinder 处理一次对话做不完的大工程。",
      "阶段边界给五种选择：继续、/clear、/handoff、subagent、/compact，默认落在 /compact。",
      "它自己的摘要只用于定位，判断某个技能做什么之前要先读那个技能的 SKILL.md。"
    ],
    path: "skills/engineering/ask-matt/SKILL.md"
  },
  {
    name: "grill-with-docs", cn: "追问并写文档", bucket: "eng", mode: "user",
    say: "追问计划，同时把术语和决定写进 GLOSSARY.md 与 ADR。",
    points: [
      "实现上只做一件事：分别调用 grilling 与 domain-modeling 两个技能。",
      "有工作目录时优于 /grill-me，因为它会留下可以复用的文字记录。",
      "术语一旦定下来，就立刻更新 GLOSSARY.md，不要攒到最后一起补。",
      "ADR 只在难以逆转、缺少上下文会让人困惑、且经过真实取舍三条同时满足时才创建。"
    ],
    path: "skills/engineering/grill-with-docs/SKILL.md"
  },
  {
    name: "triage", cn: "议题分诊", bucket: "eng", mode: "user",
    say: "把 issue 和外部 PR 推过五个状态标签，产出 agent 可接的 brief。",
    points: [
      "两个分类标签 bug / enhancement，五个状态标签 needs-triage、needs-info、ready-for-agent、ready-for-human、wontfix。",
      "先查代码库里是否已实现，再对照 .out-of-scope/ 的已拒绝项，然后才给分类与状态建议。",
      "下结论前先验证：bug 按报告步骤复现，PR 要检出并跑相关测试。",
      "每条写进 tracker 的评论都必须以「本内容由 AI 在分诊中生成」开头。",
      "wontfix 分三种处理：已实现就指出位置，拒绝 bug 给解释，拒绝需求写进 .out-of-scope/。"
    ],
    path: "skills/engineering/triage/SKILL.md"
  },
  {
    name: "improve-codebase-architecture", cn: "架构巡检", bucket: "eng", mode: "user",
    say: "扫描代码库找出可深化的模块，用 HTML 报告列出候选，再挑一个深入追问。",
    points: [
      "先划范围再扫描：优先看最近改动最多的地方，遵循 YAGNI。",
      "每张候选卡包含文件、问题、方案、收益（对调用方和维护方各有什么好处）、前后对比图和推荐强度。",
      "报告写到系统临时目录，用 Tailwind 与 Mermaid 渲染，不落进仓库。",
      "用户选中候选后调用 grilling；术语或命名变化时调用 domain-modeling。",
      "与 ADR 冲突的候选，只有在确实造成过麻烦时才提出，并明确标注。"
    ],
    path: "skills/engineering/improve-codebase-architecture/SKILL.md"
  },
  {
    name: "setup-matt-pocock-skills", cn: "仓库初始化", bucket: "eng", mode: "user",
    say: "每个仓库跑一次，配置 issue tracker、triage 标签和领域文档布局。",
    points: [
      "先探查 git remote、CLAUDE.md / AGENTS.md、GLOSSARY.md、docs/adr、.scratch 等现状。",
      "配置三块：issue 放在哪、triage 用哪些标签、领域文档是单上下文还是多上下文。",
      "结果写进 docs/agents/issue-tracker.md、triage-labels.md、domain.md。",
      "已有 CLAUDE.md 就编辑它，绝不另建 AGENTS.md 造成两份常驻文件。",
      "流程是探查、展示、确认、写入，不是确定性脚本。"
    ],
    path: "skills/engineering/setup-matt-pocock-skills/SKILL.md"
  },
  {
    name: "to-spec", cn: "生成规格书", bucket: "eng", mode: "user",
    say: "把当前对话整理成规格书并发布到 issue tracker，不再访谈用户。",
    points: [
      "定义性约束：只综合已经讨论过的内容，不重新提问。",
      "写之前先定测试 seam，优先复用已有 seam，能用最高层就用最高层，理想数量是一个。",
      "模板七段：问题、方案、用户故事、实现决定、测试决定、范围外、补充说明。",
      "不写具体文件路径和代码片段；原型里能说明问题的片段是例外。",
      "发布到 tracker 时直接打 ready-for-agent 标签。"
    ],
    path: "skills/engineering/to-spec/SKILL.md"
  },
  {
    name: "to-tickets", cn: "任务拆解", bucket: "eng", mode: "user",
    say: "把计划、规格书或对话拆成一个个 tracer bullet ticket，每个写明它依赖哪些 ticket。",
    points: [
      "每个 ticket 从头穿到尾：穿过所有层、单独可演示、能装进一个上下文窗口，必要的前置重构先做。",
      "每个 ticket 写明它依赖哪些 ticket（blocking edge）；没有前置依赖的 ticket 可以同时开始。",
      "大范围重构分三步：先加新形式，再分批迁移调用点，最后删除旧形式。",
      "发布前先向用户确认粒度、依赖关系是否正确，直到批准。",
      "本地 tracker 写 .scratch/<feature>/issues/<NN>-<slug>.md；真实 tracker 用原生阻塞链接。"
    ],
    path: "skills/engineering/to-tickets/SKILL.md"
  },
  {
    name: "implement", cn: "实现单个 ticket", bucket: "eng", mode: "user",
    say: "按规格书或一个 ticket 实现一块工作，通常一次一个。",
    points: [
      "传入 ticket 编号先从 tracker 取回并念出标题，指代不清就问。",
      "在事先约定的位置调用 tdd。",
      "经常跑类型检查和单个测试文件，最后跑一次完整测试。",
      "收尾调用 code-review，然后提交到当前分支。"
    ],
    path: "skills/engineering/implement/SKILL.md"
  },
  {
    name: "implement-spec", cn: "整份规格书并行实现", bucket: "eng", mode: "user",
    say: "把整份规格书实现到一条集成分支，各个 ticket 被当作任务图并行推进。",
    points: [
      "ticket 不是步骤列表，而是带依赖关系的任务图，因此总有一批 ticket 可以同时推进。",
      "每位 implementer subagent 用全新上下文、独立 worktree、独立分支，开工前先对齐集成分支。",
      "与 subagent 沟通时只给索引，指向规格书、ticket、研究笔记和提交，不复述内容。",
      "每个 implementer 完成后由 merger subagent 合入集成分支，再把刚没有前置依赖的 ticket 派出去。",
      "全部完成后在集成分支上跑一次 code-review，最后清理全部 worktree。"
    ],
    path: "skills/engineering/implement-spec/SKILL.md"
  },
  {
    name: "wayfinder", cn: "大工程探路", bucket: "eng", mode: "user",
    say: "把一次对话做不完的大工程画成决策地图，逐个解决待定问题，直到路径清晰。",
    points: [
      "先定下终点，它决定每个决策 ticket 怎么开。",
      "地图放在 issue tracker 上，包含目的地、已知决定、尚未明确、范围外。",
      "只做决定，不做交付；每个决策 ticket 讨论的是问题，不是某段实现。",
      "只有前方能看清的那一段才建 ticket，远处保持模糊。",
      "地图清晰后交给 /to-spec，整理成可以开工的计划，不直接进 /implement。"
    ],
    path: "skills/engineering/wayfinder/SKILL.md"
  },
  {
    name: "retro", cn: "复盘", bucket: "eng", mode: "user",
    say: "复盘一次编码过程，按严重程度提出对 agent 环境的改进。",
    points: [
      "改进对象是环境而不是这次代码：导航、自动检查、编码标准、AGENTS.md、工具成本、多余的指令、信息获取。",
      "机械性错误一律交给脚本自动检查，只有需要判断的地方才写进编码标准。",
      "仓库没有任何自动护栏（没有 pre-commit，也没有 CI 跑 lint、类型检查和测试），这本身就是问题。",
      "实现 agent 的上下文压力最大，审查 agent 最小，所以标准应该压给审查方。",
      "CLAUDE.md / AGENTS.md 只放索引和入口，越少越好。"
    ],
    path: "skills/engineering/retro/SKILL.md"
  },
  {
    name: "prototype", cn: "一次性原型", bucket: "eng", mode: "model",
    say: "写用完即弃的代码，回答一个设计问题。",
    points: [
      "问题决定形态：逻辑或状态模型问题产出一个可分享的单页 HTML，UI 问题产出同一路由下多个可切换的差异方案。",
      "从第一天就标记为原型，放在将来真正使用的位置旁边。",
      "默认不持久化、不写测试、不做抽象，只要能跑起来并完整展示当前状态。",
      "原型是第一手依据：结论回到真实代码里，原型本身提交到独立分支，并在实现 issue 上留一个链接。"
    ],
    path: "skills/engineering/prototype/SKILL.md"
  },
  {
    name: "diagnosing-bugs", cn: "疑难调试", bucket: "eng", mode: "model",
    say: "给难 bug 与性能回归用的分阶段排查流程。",
    points: [
      "第一阶段就是全部：先做出一条能快速复现这个 bug 的命令，没有它不许开始猜原因。",
      "这条命令要能让 bug 重现、结果稳定、几秒钟跑完，并且 agent 可以无人值守地跑；偶发 bug 先想办法提高复现率。",
      "复现后不断削减输入和步骤，直到每一项都删不掉。",
      "先列 3 到 5 个可证伪的假设并排序，再一次只改一个变量地加日志；调试日志带唯一前缀，收尾用一次 grep 清掉。",
      "修之前先在合适的位置补回归测试；找不到合适的位置，本身就说明架构有问题。"
    ],
    path: "skills/engineering/diagnosing-bugs/SKILL.md"
  },
  {
    name: "research", cn: "后台调研", bucket: "eng", mode: "model",
    say: "把阅读工作交给后台 agent，产出一份带引用的 Markdown。",
    points: [
      "用全新上下文启动后台 agent，主线程继续工作。",
      "只查一手来源：官方文档、源码、规范、第一方 API，每条结论都回到它原本的出处。",
      "结果写成单个 Markdown，逐条标注来源。",
      "放在仓库已有的笔记位置；没有惯例就选一个合理位置并说明。"
    ],
    path: "skills/engineering/research/SKILL.md"
  },
  {
    name: "tdd", cn: "测试驱动", bucket: "eng", mode: "model",
    say: "红绿循环的参考手册：好测试、接缝、常见错误与循环规则。",
    points: [
      "好测试通过公共接口验证行为，读起来像规格书，代码重构后仍然成立。",
      "测试只写在事先约定并确认的接缝上，不为没确认的接缝写测试。",
      "三个常见错误：实现耦合、同义反复（期望值用与实现相同的方式算出）、横向切片（先写完全部测试）。",
      "一次只做一个测试、一处实现，循环往复；每个测试都只针对上一轮新学到的一点。",
      "红先于绿；重构不属于循环，属于审查阶段。"
    ],
    path: "skills/engineering/tdd/SKILL.md"
  },
  {
    name: "domain-modeling", cn: "领域建模", bucket: "eng", mode: "model",
    say: "主动打磨项目的领域模型。",
    points: [
      "这是主动纪律：挑战术语、发明边界场景、在决定成形时就写下来，不是只读 GLOSSARY.md。",
      "术语与词汇表冲突时立刻指出；模糊或过载的词要提出精确的规范说法。",
      "用具体场景检验概念边界，并回到代码核对说法是否一致。",
      "术语一旦确定就立刻更新 GLOSSARY.md，词汇表里不写任何实现细节。",
      "ADR 只在难以逆转、缺少上下文会令人困惑、且经过真实取舍三条同时满足时才建议。"
    ],
    path: "skills/engineering/domain-modeling/SKILL.md"
  },
  {
    name: "codebase-design", cn: "模块设计词汇", bucket: "eng", mode: "model",
    say: "设计深模块的共享词汇与原则。",
    points: [
      "固定词汇：module、interface、depth、seam、adapter、leverage、locality，禁止替换成 component、service、API、boundary。",
      "深度是接口的属性：大量行为藏在很小的接口后面。",
      "删除测试：删掉模块后复杂度消失，说明它只是传声筒；散到调用者身上，说明它在创造价值。",
      "接口就是测试面；想绕过接口测试，通常说明模块形状错了。",
      "一个 adapter 是假设的 seam，两个 adapter 才是真实的 seam。"
    ],
    path: "skills/engineering/codebase-design/SKILL.md"
  },
  {
    name: "code-review", cn: "两轴审查", bucket: "eng", mode: "model",
    say: "从基线提交开始的 diff，按编码标准与规格书两条轴并行审查。",
    points: [
      "Standards 轴查仓库文档化的编码标准，外加 Fowler 十二种坏味道基线；仓库标准优先于基线。",
      "Spec 轴查规格书的要求是否缺失、是否有范围蔓延、是否有看似实现但实现错了的地方。",
      "两条轴跑并行 subagent，各自全新上下文，避免互相污染。",
      "汇总时只并排呈现，不合并、不重新排序，因为一条轴通过不代表另一条通过。",
      "先确认基线可解析、diff 非空，再派 subagent。"
    ],
    path: "skills/engineering/code-review/SKILL.md"
  },
  {
    name: "pr", cn: "PR 正文", bucket: "eng", mode: "model",
    say: "规定 PR 正文应该长什么样。",
    points: [
      "三块：Summary 用最简单的图说清改了什么，Evidence 给出改前改后的对比，Merge Danger 说明能不能回退、影响范围多大。",
      "Summary 可选形式：伪代码、调用树、组件树、文件树、Mermaid、diff。",
      "Evidence 最强的是截图，其次是可执行证据（测试或控制台输出）。",
      "有的改动一旦合入就很难回退，有的可以；影响范围（blast radius）要用最简短的话写清楚。",
      "frontmatter 里标注了改编来源：Humanlayer 的 show-me 技能。"
    ],
    path: "skills/engineering/pr/SKILL.md"
  },
  {
    name: "wizard", cn: "人工步骤向导", bucket: "eng", mode: "model",
    say: "生成一个交互式 bash 向导，带人走完只有人才能做的步骤。",
    points: [
      "适用场景：开通基础设施、配置凭证或 CI secret、走不熟悉的第三方后台、一次性迁移或切换。",
      "template.sh 已经解决交互体验：分阶段进度、确认门、跨平台开链接、隐藏输入、幂等写 .env、gh secret 写入。",
      "作者只负责划定流程和编写 stage，marker 以上的库一行都不要改。",
      "每个 stage 只做一件聚焦的事；先开 URL 再问值；密钥用 ask_secret；不可逆动作前必须 confirm。",
      "验证方式：bash -n、shellcheck、chmod +x，静态追踪每个值是否落位，不要端到端真跑。"
    ],
    path: "skills/engineering/wizard/SKILL.md"
  },

  /* ---------------- productivity ---------------- */
  {
    name: "grill-me", cn: "追问", bucket: "prod", mode: "user",
    say: "对计划或设计毫不留情地追问。",
    points: [
      "无状态，不落任何文件，适合没有工作目录的场景。",
      "实现上只做一件事：调用 grilling。",
      "在有仓库的情况下应改用 grill-with-docs，它走同一套追问流程，还会留下记录。"
    ],
    path: "skills/productivity/grill-me/SKILL.md"
  },
  {
    name: "grilling", cn: "追问流程", bucket: "prod", mode: "model",
    say: "把计划、决定或想法问到每个分支都有了答案。",
    points: [
      "决定之间有依赖，可以画成一棵树。前置条件已经满足、现在就能回答的，先问。",
      "一轮把眼下能问的都问完，每题编号并附推荐答案，问法要让人回答「是」就等于接受推荐。",
      "事实由 agent 派 subagent 去查，决定交给用户并等待回答。",
      "眼下能问的都问完才算结束，结束前不要动手实现。",
      "被 grill-me、grill-with-docs、triage、wayfinder、improve-codebase-architecture 复用。"
    ],
    path: "skills/productivity/grilling/SKILL.md"
  },
  {
    name: "handoff", cn: "交接文档", bucket: "prod", mode: "user",
    say: "把当前对话压缩成交接文档，让另一个 agent 接手。",
    points: [
      "写到系统临时目录，不写进当前工作区。",
      "文档里要有「建议调用的技能」一节。",
      "不重复规格书、计划、ADR、issue、提交里已有的内容，用路径或 URL 引用。",
      "敏感信息必须脱敏；按用户说的用途，裁剪下一次对话要用的内容。"
    ],
    path: "skills/productivity/handoff/SKILL.md"
  },
  {
    name: "teach", cn: "分多次教学", bucket: "prod", mode: "user",
    say: "把当前目录当教学工作区，分多次教一个主题。",
    points: [
      "状态文件：MISSION.md、RESOURCES.md、learning-records/、lessons/、reference/、assets/、NOTES.md。",
      "区分「用起来顺」与「记得牢」，用提取练习、间隔复习、交替练习，刻意制造一点难度。",
      "每节课是一个自包含 HTML，短、可很快完成、只教一件与 mission 相关的事。",
      "知识来自高可信资源并在课件里给引用；技能靠带即时反馈的互动练习。",
      "智慧来自真实世界，这类问题应引导用户进入高质量社群。"
    ],
    path: "skills/productivity/teach/SKILL.md"
  },
  {
    name: "to-questionnaire", cn: "问卷", bucket: "prod", mode: "user",
    say: "把一个人答不了的决策变成一份给别人填的问卷。",
    points: [
      "只问怎么发、不问主题：收件人是谁、你需要拿回什么。",
      "问题瞄准收件人知道而用户不知道的缺口。",
      "按主题分组，最重要的放前面，因为异步可能只有一次机会。",
      "每题只问一个想法，下面直接留答案位；容易被误读的题加一行「为什么重要」。",
      "输出到当前目录的 to-questionnaire-<slug>.md。"
    ],
    path: "skills/productivity/to-questionnaire/SKILL.md"
  },
  {
    name: "wait-what", cn: "重讲一遍", bucket: "prod", mode: "user",
    say: "上一条消息没听懂时，让 agent 换一种说法重讲。",
    points: [
      "补上缺失的上下文，用简化技术英语重述。",
      "使用 GLOSSARY.md 的统一语言；有多个上下文时按 GLOSSARY-MAP.md 找到正确的那份。",
      "这是事后纠正；事前预防靠 grill-with-docs 早点把共同语言定下来。"
    ],
    path: "skills/productivity/wait-what/SKILL.md"
  },
  {
    name: "writing-for-agents", cn: "写给 agent 的文档", bucket: "prod", mode: "model",
    say: "写 skill、AGENTS.md、CLAUDE.md，以及任何靠索引引用的文档时的参考。",
    points: [
      "索引里的措辞决定触发率，索引比正文更需要精简。",
      "两种负担：常驻上下文每一轮都要占用的 context load，和人要记住文档索引的 cognitive load。",
      "信息分三层：文件里的步骤、文件里需要时再看的参考、靠索引下放的参考；按情况决定写在同一处还是下放。",
      "每步要有能检查、又能覆盖全部工作的完成标准，防止提前收工。",
      "用 leading word 把一串要求收成一个词；写「不要做 X」反而把 X 摆进上下文，应该直接写希望它做什么。"
    ],
    path: "skills/productivity/writing-for-agents/SKILL.md"
  },

  /* ---------------- misc ---------------- */
  {
    name: "git-guardrails-claude-code", cn: "git 护栏", bucket: "misc", mode: "model",
    say: "给 Claude Code 装 PreToolUse hook，在执行前拦下危险 git 命令。",
    points: [
      "拦截 push、reset --hard、clean、branch -D 等破坏性操作。",
      "流程：问范围、复制 hook 脚本、写进 settings、问是否需要定制、验证。",
      "属于 misc 分组，冻结、不维护、不随插件发布。"
    ],
    path: "skills/misc/git-guardrails-claude-code/SKILL.md"
  },
  {
    name: "migrate-to-shoehorn", cn: "迁移到 shoehorn", bucket: "misc", mode: "model",
    say: "把测试里的 as 类型断言迁到 @total-typescript/shoehorn。",
    points: [
      "fromPartial() 替代 as Type，fromAny() 替代 as unknown as Type。",
      "适合只需要部分字段的测试数据。",
      "属于 misc 分组，冻结、不维护、不随插件发布。"
    ],
    path: "skills/misc/migrate-to-shoehorn/SKILL.md"
  },
  {
    name: "scaffold-exercises", cn: "练习脚手架", bucket: "misc", mode: "model",
    say: "生成能通过 lint 的课程练习目录，含 section、problem、solution、explainer。",
    points: [
      "规定目录命名、练习变体与必需文件。",
      "目标是过 pnpm ai-hero-cli internal lint 之后再提交。",
      "属于 misc 分组，冻结、不维护、不随插件发布。"
    ],
    path: "skills/misc/scaffold-exercises/SKILL.md"
  },
  {
    name: "setup-pre-commit", cn: "pre-commit 配置", bucket: "misc", mode: "model",
    say: "给仓库装上 Husky、lint-staged、类型检查与测试。",
    points: [
      "自动识别包管理器，安装依赖，初始化 Husky。",
      "生成 .husky/pre-commit 与 .lintstagedrc，必要时补 .prettierrc。",
      "最后验证并提交。属于 misc 分组，冻结、不维护、不随插件发布。"
    ],
    path: "skills/misc/setup-pre-commit/SKILL.md"
  },

  /* ---------------- in-progress ---------------- */
  {
    name: "chief-of-staff", cn: "幕僚长", bucket: "prog", mode: "user",
    say: "把工作分派给新的 subagent，并把每次学到的内容写进按日期组织的 wiki。",
    points: [
      "两项职责：分派、记忆。",
      "历史记录写过去发生了什么，不写现在是什么。",
      "遇到问题之后回头更新流程。",
      "公开测试，不进插件。"
    ],
    path: "skills/in-progress/chief-of-staff/SKILL.md"
  },
  {
    name: "claude-handoff", cn: "交给后台 agent", bucket: "prog", mode: "user",
    say: "把当前对话交给一个立刻接手的新后台 agent。",
    points: [
      "写交接摘要到系统临时目录。",
      "用 claude --bg --name 启动，摘要以文件传入，避免 shell 展开反引号和 $。",
      "一定带描述性名称，它决定任务列表、会话选择器和终端标题里的显示名。",
      "公开测试，不进插件。"
    ],
    path: "skills/in-progress/claude-handoff/SKILL.md"
  },
  {
    name: "loop-me", cn: "工作流规格书", bucket: "prog", mode: "user",
    say: "就你想搭建的工作流追问，只产出一份工作流规格书。",
    points: [
      "用 grilling 的纪律，按轮提问，每题附推荐答案。",
      "只围绕「工作流」这个视角，不扩散到其他产物。",
      "过程中直接创建、编辑、删除规格书文件。",
      "公开测试，不进插件。"
    ],
    path: "skills/in-progress/loop-me/SKILL.md"
  },
  {
    name: "setup-ts-deep-modules", cn: "TS 深模块约束", bucket: "prog", mode: "user",
    say: "用 dependency-cruiser 把 TypeScript 仓库的每个 package 变成深模块。",
    points: [
      "包的公开面只有根目录的 entry point，子目录一律隐藏。",
      "安装 dependency-cruiser，写规则，接进检查。",
      "最后要证明规则真的会拦下违规引用。",
      "公开测试，不进插件。"
    ],
    path: "skills/in-progress/setup-ts-deep-modules/SKILL.md"
  },
  {
    name: "software-factory", cn: "软件工厂词汇", bucket: "prog", mode: "user",
    say: "设计软件工厂时的共享语言：它跑的任务与接入的服务。",
    points: [
      "软件工厂是把 ticket、PR、定时任务变成已合并代码的 agent 系统。",
      "词汇分两类：任务与运行、服务。",
      "只使用它规定的词；用户用到 Avoid 列表里的词时改成规范词。",
      "公开测试，不进插件。"
    ],
    path: "skills/in-progress/software-factory/SKILL.md"
  },
  {
    name: "writing-fragments", cn: "写作：探索", bucket: "prog", mode: "user",
    say: "写作的探索阶段：挖碎片，不立结构。",
    points: [
      "只做发散，不急着定结构。",
      "用追问产出零散素材。",
      "分阶段、列提纲、成文都属于越界。",
      "公开测试，不进插件。"
    ],
    path: "skills/in-progress/writing-fragments/SKILL.md"
  },
  {
    name: "writing-shape", cn: "写作：成文", bucket: "prog", mode: "user",
    say: "写作的利用阶段：把素材逐段塑成文章。",
    points: [
      "输入是一堆原始材料，格式不限，先完整读一遍。",
      "逐段推进，边写边确认。",
      "属于 exploit，探索已经在别的技能里完成。",
      "公开测试，不进插件。"
    ],
    path: "skills/in-progress/writing-shape/SKILL.md"
  },
  {
    name: "writing-beats", cn: "写作：节拍", bucket: "prog", mode: "user",
    say: "写作的后半程：把已有素材组装成一段段向前推进的内容。",
    points: [
      "探索已完成，材料固定，只需要选一条路径，把每一段填满。",
      "每个术语都要在下一节用到它之前先定义好。",
      "注意收尾与写作节奏。",
      "公开测试，不进插件。"
    ],
    path: "skills/in-progress/writing-beats/SKILL.md"
  }
];
