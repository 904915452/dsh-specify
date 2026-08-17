# @zhangqingyu/dsh-specify

DeepSeek Harness 插件：**Spec-Kit spec-driven 开发**，以一组**可主动调用的斜杠命令**暴露。

移植自本机 Claude Code 的 `sdd` skill，拆成 granular 命令，让你在 Harness 里用
`/speckit-*` 逐步控制整个 spec-driven 流程。

## 可用命令

| 命令 | 产物 | 作用 |
|---|---|---|
| `/speckit` | — | hub：安装、greenfield/brownfield 决策、分支约定、摘要/状态模板 |
| `/speckit-constitution` | `.speckit/constitution.md` | 项目原则 |
| `/speckit-specify` | `…/specify.md` | 定义需求（WHAT/WHY） |
| `/speckit-clarify` | 修订 `specify.md` | 澄清歧义 |
| `/speckit-plan` | `…/plan.md` | 技术方案 |
| `/speckit-tasks` | `…/tasks.md` | 任务拆解 |
| `/speckit-analyze` | 一致性报告 | 需求/验收/边界覆盖检查 |
| `/speckit-implement` | 代码 | 按任务实现 |
| `/speckit-checklist` | `…/checklist.md` | 质量门禁 |
| `/speckit-status` | 仪表盘 | 进度/依赖/下一步 |

命令名用连字符（`speckit-implement`），因为 DSH 的斜杠命令识别只接受 kebab-case。

## 分支控制

`/speckit-specify` 开始一个 feature 前会按「分支约定」决定是否新建分支：

- 默认：从干净的 `main`/`master` 建 `feat/<feature-slug>` 分支；
- 说「不建分支」或在命令后加 `--no-branch`：留在当前分支；
- 在命令后加 `--branch <name>`：用指定分支名。

决策会写进摘要，`/speckit-implement` 会据此在正确分支上实现。

## 结构

```
dsh-specify/
├── cordis.patch.yml
├── lib/index.js                # host 插件：扫描 skills/ 注册所有命令
└── skills/
    ├── speckit/SKILL.md        # hub
    ├── speckit-*/SKILL.md      # 9 个 granular 命令
    ├── references/             # greenfield / brownfield / feature_management / install
    └── scripts/                # 4 个分析脚本
```

`lib/index.js` 把每个 `<name>/SKILL.md` 注册为 runtime skill，`resourceBase` 统一指向 `skills/`
根目录，所以所有命令正文里的 `references/…`、`scripts/…` 相对路径都能解析。`ctx.skills.register`
默认 `userInvocable: true`，因此这些名字会作为 `/speckit-*` 斜杠命令暴露。

## 安装

```bash
# 任选一个镜像仓库克隆
git clone https://gitee.com/zqy-904915452/dsh-specify.git
# git clone https://github.com/904915452/dsh-specify.git
cd dsh-specify
dsh plugin --profile web add "file:$(pwd)"
```

`file:` 后要写 clone 下来的**绝对路径**；如果你用的是自定义 profile，把 `web` 换成你的 profile 名。
也可以直接用仓库地址装：`dsh plugin --profile web add git+https://gitee.com/zqy-904915452/dsh-specify.git`
（或 GitHub 镜像 `git+https://github.com/904915452/dsh-specify.git`）。

安装后重启会话。之后直接输入 `/speckit-specify …` 即可主动触发对应步骤。

## 前置

Spec-Kit 流程依赖 `specify` CLI：

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify check
```

排障见 `skills/references/sdd_install.md`。
