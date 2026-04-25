# Web Components Monorepo Demo

使用 npm workspaces + Vite + Vue 3 + TypeScript 建置的 Web Component monorepo 示範專案。

## 結構

```
webcomponent_demo/
├─ packages/
│  └─ ui-elements/          # 可發佈的 Web Component 套件 (@demo/ui-elements)
└─ apps/
   └─ playground/           # 引用 ui-elements 的 Demo App
```

## 環境需求

- Node.js ≥ 18
- npm ≥ 9（內建 workspaces 支援）

## 安裝

於專案根目錄：

```bash
npm install
```

`node_modules/@demo/ui-elements` 會以 symlink 連到 `packages/ui-elements`。

## 開發流程

Demo App 引用的是 `ui-elements` 的 **建置產物 (`dist/`)**，模擬真實外部專案的使用情境，所以開發前需先建置一次：

```bash
# 一鍵建置 ui-elements 並啟動 playground
npm run dev
```

或分開執行：

```bash
npm run build:ui          # 建置 ui-elements -> packages/ui-elements/dist
npm run dev:playground    # 啟動 playground (Vite dev server)
```

修改 `ui-elements` 程式碼後，需重新跑 `npm run build:ui`。

## 建置全部

```bash
npm run build             # 建置 ui-elements + playground
npm run preview           # 預覽 playground 打包結果
```

## 如何新增 Web Component

1. 於 `packages/ui-elements/src/components/` 新增 `MyThing.ce.vue`
2. 於 `packages/ui-elements/src/index.ts` 匯出：
   ```ts
   import MyThing from './components/MyThing.ce.vue';
   export const MyThingElement = defineCustomElement(MyThing);
   ```
3. 於 `packages/ui-elements/src/register.ts` 註冊：
   ```ts
   customElements.define(`${prefix}-thing`, MyThingElement);
   ```
4. `npm run build:ui` 後即可在 playground 使用 `<my-thing>`

## 在外部專案引用

`@demo/ui-elements` 已設定完整的 `main` / `module` / `types` / `exports` / `files`，未來可發佈至 npm。引用方式：

```ts
import { register } from '@demo/ui-elements';
register();

// 之後 HTML 中即可使用
// <my-button label="Hello" variant="primary"></my-button>
```
