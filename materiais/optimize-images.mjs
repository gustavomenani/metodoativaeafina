/**
 * One-shot optimizer for site WebP assets.
 * - Backs up originals to materiais/backups-pre-otimizacao/
 * - Replaces file only when the new version is meaningfully smaller
 * - Does not change paths or site code
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const backupDir = "materiais/backups-pre-otimizacao";
fs.mkdirSync(backupDir, { recursive: true });

const targets = [
  { file: "src/assets/images/criadoras/lilian-manu.webp", maxW: 1200, quality: 78 },
  { file: "src/assets/images/hero/antes-depois.webp", maxW: 900, quality: 80 },
  { file: "src/assets/images/passos/passo-1-respiracao.webp", maxW: 1000, quality: 78 },
  { file: "src/assets/images/passos/passo-2-ativacao.webp", maxW: 1000, quality: 78 },
  { file: "src/assets/images/passos/passo-3-funcional.webp", maxW: 1000, quality: 78 },
  { file: "src/assets/images/resultados/maristela.webp", maxW: 1000, quality: 80 },
  { file: "src/assets/images/resultados/resultado-a.webp", maxW: 900, quality: 78 },
  { file: "src/assets/images/resultados/resultado-b.webp", maxW: 900, quality: 78 },
  { file: "public/videos/video-vendas-poster.webp", maxW: 720, quality: 78 },
];

function backupName(p) {
  return p.replace(/[\\/]/g, "__");
}

let totalBefore = 0;
let totalAfter = 0;

for (const t of targets) {
  if (!fs.existsSync(t.file)) {
    console.log("SKIP missing", t.file);
    continue;
  }

  const input = fs.readFileSync(t.file);
  const before = input.length;
  const meta = await sharp(input).metadata();
  const backupPath = path.join(backupDir, backupName(t.file));
  fs.writeFileSync(backupPath, input);

  let pipeline = sharp(input).rotate();
  if (meta.width && meta.width > t.maxW) {
    pipeline = pipeline.resize({ width: t.maxW, withoutEnlargement: true });
  }

  const outBuf = await pipeline
    .webp({ quality: t.quality, effort: 6, smartSubsample: true })
    .toBuffer();

  // Explicitly close pipelines (Windows file locks)
  await sharp(input).destroy?.();

  const after = outBuf.length;
  const pct = (((before - after) / before) * 100).toFixed(1);

  if (after < before * 0.98) {
    const tmp = t.file + ".tmp.webp";
    fs.writeFileSync(tmp, outBuf);
    try {
      fs.rmSync(t.file, { force: true });
    } catch {
      // ignore
    }
    fs.renameSync(tmp, t.file);
    const newMeta = await sharp(outBuf).metadata();
    console.log("OK  ", t.file);
    console.log(
      `    ${(before / 1024).toFixed(1)}KB -> ${(after / 1024).toFixed(1)}KB (${pct}% smaller)  ${meta.width}x${meta.height} -> ${newMeta.width}x${newMeta.height}`,
    );
    totalBefore += before;
    totalAfter += after;
  } else {
    console.log(
      `KEEP ${t.file} (already good: ${(before / 1024).toFixed(1)}KB, new would be ${(after / 1024).toFixed(1)}KB)`,
    );
    totalBefore += before;
    totalAfter += before;
  }
}

console.log("");
console.log(
  `TOTAL used images: ${(totalBefore / 1024).toFixed(1)}KB -> ${(totalAfter / 1024).toFixed(1)}KB (saved ${((totalBefore - totalAfter) / 1024).toFixed(1)}KB)`,
);
