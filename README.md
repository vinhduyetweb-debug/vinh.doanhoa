# Bé Đoán Loài Hoa - Magic Bloom Pro

Mini app static cho trẻ em đoán tên các loài hoa qua gợi ý nhỏ, chạm nụ hoa và xem bông hoa nở. App không backend, không framework, không database và không có build step.

## Cách mở local

Mở trực tiếp `index.html` trong trình duyệt, hoặc dùng static server:

```bash
python -m http.server 3000
```

Sau đó mở `http://localhost:3000`.

## Deploy Vercel

```bash
vercel --prod
```

Repo này là static app nên Vercel có thể deploy trực tiếp từ thư mục gốc.

## Cấu trúc file

```text
index.html
style.css
app.js
manifest.json
vercel.json
README.md
assets/
  flowers/
    .gitkeep
```

## Thêm hoa mới

Mở `app.js`, thêm item vào mảng `FLOWERS` với schema:

```js
{
  id: "hoa-hong",
  name: "Hoa hong",
  emoji: "🌹",
  color: "do, hong, vang",
  simpleHint: "Loài hoa này thường được tặng để nói lời yêu thương.",
  bloomFact: "Viết 3 câu ngắn, vui, dễ hiểu cho trẻ em."
}
```

Gợi ý viết `bloomFact`: 1 câu gây tò mò, 1 câu nói điểm lạ dễ nhớ, 1 câu kết vui hoặc gần gũi.

## Thêm ảnh hoa

Copy file `.webp` vào `assets/flowers/`.

Tên file nên dùng slug không dấu, dấu gạch dưới, ví dụ:

```text
assets/flowers/hoa_hong.webp
assets/flowers/hoa_sen.webp
```

`FLOWER_IMAGES` trong `app.js` đã tự tạo mapping từ `id`. Nếu ảnh chưa tồn tại, app tự fallback sang emoji và không hiện ảnh vỡ.

## localStorage keys

App dùng key riêng:

```text
flower_pro_index
flower_pro_score
flower_pro_unlocked
flower_pro_soundEnabled
```

Không dùng lại key của app khác; app hoa chỉ dùng nhóm `flower_pro_*`.

## Test checklist

- `node --check app.js`
- `git diff --check` nếu thư mục có Git repo
- Mở app bằng browser hoặc static server
- Chạm vào nụ hoa hiện câu hỏi
- Chọn sai có feedback nhẹ
- Chọn đúng hiện hoa nở và bloom fact
- Bấm "Trồng bông hoa tiếp theo" sang lượt mới
- Refresh vẫn giữ tiến độ
- Viewport mobile 390x700 không horizontal overflow
- Thiếu ảnh `.webp` vẫn fallback emoji đẹp
