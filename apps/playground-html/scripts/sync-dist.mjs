// 將 packages/ui-elements/dist 複製到本地 vendor/
// 模擬「拿到別人給的 dist 資料夾，丟進自己的專案」的場景。
// 之所以用「複製」而不是 symlink/相對路徑：要確保此 app 與 ui-elements 的原始碼完全脫鉤，
// 改 src 不會立即生效，必須重新 build:ui + sync 才會更新——這正是真實使用者會經歷的流程。

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_SRC = resolve(__dirname, '../../../packages/ui-elements/dist');
const VENDOR_DST = resolve(__dirname, '../vendor/ui-elements');

if (!existsSync(DIST_SRC)) {
  console.error(
    `[sync-dist] 找不到 ${DIST_SRC}\n請先在 repo 根目錄執行：npm run build:ui`,
  );
  process.exit(1);
}

rmSync(VENDOR_DST, { recursive: true, force: true });
mkdirSync(VENDOR_DST, { recursive: true });
cpSync(DIST_SRC, VENDOR_DST, { recursive: true });

console.log(`[sync-dist] 已將 dist 複製到 ${VENDOR_DST}`);
