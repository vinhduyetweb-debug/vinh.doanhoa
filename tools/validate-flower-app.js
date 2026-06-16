const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const APP_PATH = path.join(ROOT, "app.js");
const FLOWER_DIR = path.join(ROOT, "assets", "flowers");
const EXPECTED_COUNT = 61;
const FORBIDDEN_TEXT = ["trứng", "con vật", "mở khóa con vật", "chuồng", "animal_pro", "egg", "animal", "beast", "cage"];

const appSource = fs.readFileSync(APP_PATH, "utf8");
const flowers = readFlowers(appSource);
const imageMap = Object.fromEntries(flowers.map((flower) => [flower.name, `assets/flowers/${flower.id.replace(/-/g, "_")}.webp`]));
const wowFacts = Object.fromEntries(flowers.map((flower) => [flower.name, flower.bloomFact]));
const assetFiles = fs.readdirSync(FLOWER_DIR).filter((file) => file.endsWith(".webp")).sort();

const errors = [];

if (flowers.length !== EXPECTED_COUNT) {
  errors.push(`FLOWERS length is ${flowers.length}, expected ${EXPECTED_COUNT}`);
}

if (Object.keys(imageMap).length !== EXPECTED_COUNT) {
  errors.push(`FLOWER_IMAGES mapping count is ${Object.keys(imageMap).length}, expected ${EXPECTED_COUNT}`);
}

if (Object.keys(wowFacts).length !== EXPECTED_COUNT) {
  errors.push(`FLOWER_WOW_FACTS count is ${Object.keys(wowFacts).length}, expected ${EXPECTED_COUNT}`);
}

for (const flower of flowers) {
  if (!flower.id || !flower.name || !flower.simpleHint || !flower.bloomFact) {
    errors.push(`Incomplete flower item: ${JSON.stringify({ id: flower.id, name: flower.name })}`);
  }

  const expectedImage = imageMap[flower.name];
  const absoluteImage = path.join(ROOT, expectedImage);
  if (!fs.existsSync(absoluteImage)) {
    errors.push(`Missing image for ${flower.name}: ${expectedImage}`);
  }

  if (!wowFacts[flower.name] || wowFacts[flower.name].trim().length < 20) {
    errors.push(`Missing or too-short Wow Fact for ${flower.name}`);
  }
}

const expectedAssetFiles = flowers.map((flower) => `${flower.id.replace(/-/g, "_")}.webp`).sort();
const missingAssets = expectedAssetFiles.filter((file) => !assetFiles.includes(file));
const extraAssets = assetFiles.filter((file) => !expectedAssetFiles.includes(file));

if (missingAssets.length) {
  errors.push(`Missing asset files: ${missingAssets.join(", ")}`);
}

if (extraAssets.length) {
  errors.push(`Extra asset files: ${extraAssets.join(", ")}`);
}

for (const word of FORBIDDEN_TEXT) {
  if (appSource.toLowerCase().includes(word.toLowerCase())) {
    errors.push(`Forbidden text found in app.js: ${word}`);
  }
}

const tuyetMai = flowers.find((flower) => flower.id === "hoa-tuyet-mai");
if (!tuyetMai) {
  errors.push("Hoa Tuyết Mai is missing from dataset");
} else {
  if (!wowFacts[tuyetMai.name]) errors.push("Hoa Tuyết Mai is missing Wow Fact");
  if (!fs.existsSync(path.join(ROOT, "assets", "flowers", "hoa_tuyet_mai.webp"))) {
    errors.push("Hoa Tuyết Mai image is missing: assets/flowers/hoa_tuyet_mai.webp");
  }
}

if (errors.length) {
  console.error("Flower app validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Flower app validation passed");
console.log(`FLOWERS: ${flowers.length}`);
console.log(`FLOWER_IMAGES: ${Object.keys(imageMap).length}`);
console.log(`FLOWER_WOW_FACTS: ${Object.keys(wowFacts).length}`);
console.log(`asset files: ${assetFiles.length}`);
console.log(`Hoa Tuyết Mai image: assets/flowers/hoa_tuyet_mai.webp`);

function readFlowers(source) {
  const match = source.match(/var FLOWERS = \[([\s\S]*?)\];/);
  if (!match) {
    throw new Error("Cannot find FLOWERS array in app.js");
  }

  return Function(`"use strict"; return [${match[1]}];`)();
}
