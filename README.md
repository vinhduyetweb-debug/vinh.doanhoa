# Bé Đoán Loài Hoa - Magic Bloom Pro

Mini app static cho trẻ em đoán tên 61 loài hoa qua gợi ý nhỏ, chạm nụ hoa và xem bông hoa nở. App không backend, không framework, không database và không có build step.

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
    hoa_ten_khong_dau.webp
tools/
  validate-flower-app.js
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

Gợi ý viết `bloomFact`: 1 câu gây tò mò, 1 câu nói điểm lạ dễ nhớ, 1 câu kết vui hoặc gần gũi. `FLOWER_WOW_FACTS` được tạo từ `bloomFact` để màn kết quả luôn hiển thị đúng Wow Fact theo tên hoa.

## Thêm ảnh hoa

Ảnh hoa nằm trong `assets/flowers/`. Hiện app đã có đủ 61 ảnh `.webp`, bao gồm `hoa_tuyet_mai.webp` cho Hoa Tuyết Mai.

Tên file nên dùng slug không dấu, dấu gạch dưới, ví dụ:

```text
assets/flowers/hoa_hong.webp
assets/flowers/hoa_sen.webp
```

`FLOWER_IMAGES` trong `app.js` đã tự tạo mapping từ `id`. Nếu ảnh chưa tồn tại, app tự fallback sang emoji và không hiện ảnh vỡ.

## Quy trình bảo trì

1. Thêm item vào `FLOWERS`.
2. Thêm ảnh `.webp` vào `assets/flowers/`.
3. Đảm bảo `id` sinh đúng path trong `FLOWER_IMAGES`.
4. Thêm Wow Fact trong `bloomFact`.
5. Chạy validator và test.

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
- `node tools/validate-flower-app.js`
- `git diff --check`
- Mở app bằng browser hoặc static server
- Chạm vào nụ hoa hiện câu hỏi
- Chọn sai có feedback nhẹ
- Chọn đúng hiện hoa nở và bloom fact
- Bấm "Trồng bông hoa tiếp theo" sang lượt mới
- Refresh vẫn giữ tiến độ
- Viewport mobile 390x700 không horizontal overflow
- Thiếu ảnh `.webp` vẫn fallback emoji đẹp
