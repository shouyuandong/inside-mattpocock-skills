# 深入了解站点

本仓库是 `mattpocock/skills` 的中文单页解读，纯静态、零构建，文件放在仓库根目录。

## 本地预览

```bash
python -m http.server 8080
```

然后打开 http://localhost:8080 。

## 部署（GitHub Pages）

Pages 发布源选 main 分支根目录即可，`.nojekyll` 已就位。页面内部使用相对路径。

## 文件

- `index.html`：页面结构与正文
- `assets/site.css`：样式与主题
- `assets/site.js`：目录高亮、进度条、主题切换、技能搜索与详情
- `assets/skills-data.js`：39 个技能的数据

内容基于 2026-11-25 的本地快照，对应版本 1.3.2。
