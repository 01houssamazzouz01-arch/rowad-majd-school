# 🚀 دليل النشر الكامل — مدرسة رواد المجد الخاصة

دليل خطوة بخطوة لنشر الموقع على Vercel مجاناً للأبد.

---

## 📋 المتطلبات

- حساب بريد إلكتروني
- Node.js 18+ (للتطوير المحلي)
- 30 دقيقة من وقتك

---

## 🗂️ الخطوة 1: استخراج الكود

```bash
# فك ضغط الملف
unzip rowad-al-majd-source-code.zip

# ادخل إلى مجلد المشروع
cd rowad-al-majd-code
```

---

## 💻 الخطوة 2: التشغيل المحلي (اختياري — للتأكد من عمل الكود)

### 2.1 ثبّت Node.js
حمّل من: https://nodejs.org (اختر LTS)

### 2.2 ثبّت الـ dependencies
```bash
npm install
```

### 2.3 أنشئ ملف .env
```bash
cp .env.example .env
# عدّل القيم إذا أردت
```

### 2.4 أنشئ قاعدة البيانات
```bash
npx prisma db push
npx prisma generate
```

### 2.5 أنشئ حساب المدير
```bash
npx tsx scripts/seed.ts
```

### 2.6 شغّل الموقع
```bash
npm run dev
```

افتح: http://localhost:3000

**بيانات الدخول**: admin / admin123

---

## 🐙 الخطوة 3: إنشاء حساب GitHub

1. اذهب إلى: https://github.com/signup
2. املأ البريد + كلمة المرور + اسم المستخدم
3. أكّد البريد (افتح الرسالة واضغط الرابط)

---

## 📤 الخطوة 4: رفع الكود إلى GitHub

### الطريقة الأسهل: عبر الموقع

1. سجّل دخول إلى GitHub
2. اضغط **"+"** في الأعلى ← **"New repository"**
3. اكتب اسم المستودع: `rowad-al-majd`
4. اختر **Public** (مجاني)
5. اضغط **"Create repository"**
6. اضغط **"uploading an existing file"**
7. اسحب كل محتويات مجلد `rowad-al-majd-code` إلى الصفحة
8. اكتب رسالة: "Initial commit"
9. اضغط **"Commit changes"**

### ⚠️ ملفات لا ترفعها:
- `node_modules/` (ضخم، يُبنى تلقائياً)
- `.env` (يحتوي أسراراً)
- `.next/` (ملفات بناء)
- `*.db` (قاعدة البيانات المحلية)

ملف `.gitignore` المضمّن يتجاهلها تلقائياً.

---

## ☁️ الخطوة 5: النشر على Vercel

### 5.1 سجّل في Vercel
1. اذهب إلى: https://vercel.com
2. اضغط **"Sign Up"** ← **"Continue with GitHub"**
3. اسمح لـ Vercel بالوصول إلى GitHub

### 5.2 أنشئ مشروعاً
1. في Dashboard، اضغط **"Add New..."** ← **"Project"**
2. ابحث عن مستودع `rowad-al-majd`
3. اضغط **"Import"**

### 5.3 الإعدادات
- Framework Preset: **Next.js** (تلقائي)
- Build Command: `next build` (تلقائي)
- Output Directory: `.next` (تلقائي)

### 5.4 أضف متغيرات البيئة

قبل الضغط على Deploy، اضغط **"Environment Variables"** وأضف:

| المفتاح | القيمة |
|------|------|
| `DATABASE_URL` | (رابط PostgreSQL من Neon — الخطوة 6) |
| `AUTH_SECRET` | نص سرّي طويل (مثل: `my-secret-2026-rowad-majd-x7k9p`) |

### 5.5 اضغط "Deploy"
- انتظر 2-3 دقائق
- سترى: "✅ Congratulations!"
- رابط موقعك: `https://rowad-al-majd.vercel.app`

---

## 🗄️ الخطوة 6: إعداد PostgreSQL (مهم!)

SQLite لا يعمل على Vercel. ستحتاج PostgreSQL مجاني من Neon.

### 6.1 أنشئ حساب Neon
1. اذهب إلى: https://neon.tech
2. سجّل بـ GitHub أو بريدك
3. اضغط **"New Project"**
4. اسم المشروع: `rowad-majd-db`
5. المنطقة: `AWS Middle East - Bahrain` (الأقرب)
6. اضغط **"Create project"**

### 6.2 انسخ رابط الاتصال
في صفحة المشروع، سترى:
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
```
انسخه بالكامل.

### 6.3 حدّث الكود

في ملف `prisma/schema.prisma`، غيّر:
```prisma
datasource db {
  provider = "postgresql"   // كان "sqlite"
  url      = env("DATABASE_URL")
}
```

ارفع التعديل إلى GitHub:
```bash
git add prisma/schema.prisma
git commit -m "Switch to PostgreSQL"
git push
```

### 6.4 أضف DATABASE_URL إلى Vercel
1. Vercel Dashboard ← مشروعك ← Settings ← Environment Variables
2. أضف/عدّل `DATABASE_URL` = رابط PostgreSQL من Neon
3. اضغط **Save**

### 6.5 أنشئ الجداول
على جهازك المحلي:
```bash
# ثبّت Vercel CLI
npm install -g vercel

# سجّل دخول
vercel login

# اسحب متغيرات البيئة من Vercel
vercel env pull .env.production.local

# شغّل Prisma
npx prisma db push
npx prisma generate

# أنشئ حساب المدير
npx tsx scripts/seed.ts
```

### 6.6 أعد النشر
Vercel Dashboard ← Deployments ← آخر deployment ← **"Redeploy"**

---

## 🌐 الخطوة 7: ربط نطاقك الخاص (اختياري)

### 7.1 اشترِ النطاق
من Namecheap أو GoDaddy:
- ابحث عن `rowadal-majdnet.school`
- اشترِه (~40-60$/سنة)

### 7.2 أضف النطاق على Vercel
1. Vercel Dashboard ← مشروعك ← Settings ← Domains
2. اكتب: `rowadal-majdnet.school`
3. اضغط **"Add"**

### 7.3 حدّث DNS
في لوحة تحكم Namecheap/GoDaddy (DNS Settings):

| Type | Name | Value |
|------|------|------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### 7.4 انتظر التفعيل
- 30 دقيقة إلى 24 ساعة
- Vercel سيؤكد تلقائياً
- ✅ سيعمل على `https://rowadal-majdnet.school`

---

## 📊 الخطوة 8: المراقبة بـ UptimeRobot

### 8.1 سجّل في UptimeRobot
1. اذهب إلى: https://uptimerobot.com
2. سجّل حساباً مجانياً

### 8.2 أضف مراقباً
1. اضغط **"Add New Monitor"**
2. النوع: HTTP(s)
3. الاسم: Rowad Al-Majd
4. URL: `https://your-site.vercel.app/api/health`
5. الفاصل: 5 دقائق
6. اضغط **"Create Monitor"**

### 8.3 ماذا يفعل؟
- يطلب `/api/health` كل 5 دقائق
- يبقي الخادم مستيقظاً
- يرسل إشعاراً عند توقف الموقع

---

## ✅ Checklist نهائي

- [ ] GitHub: حساب مُنشأ + الكود مرفوع
- [ ] Vercel: حساب + مشروع منشور
- [ ] متغيرات البيئة: `DATABASE_URL` + `AUTH_SECRET`
- [ ] Neon: قاعدة بيانات PostgreSQL مُنشأة
- [ ] Prisma: `provider = "postgresql"` + `db push` + `seed`
- [ ] الموقع يعمل: `https://your-project.vercel.app`
- [ ] المدير يستطيع الدخول: admin / admin123
- [ ] UptimeRobot: يراقب `/api/health`
- [ ] (اختياري) النطاق المخصص مربوط

---

## 🆘 مشاكل شائعة

### "Build Failed"
- اقرأ Build Logs على Vercel
- تأكد من `package.json` موجود وصحيح
- تأكد من عدم وجود أخطاء TypeScript

### "Database connection failed"
- تأكد من `DATABASE_URL` صحيح
- تأكد من `provider = "postgresql"` في schema.prisma
- تأكد من `npx prisma db push` تم تشغيله

### "401 Unauthorized"
- تأكد من `AUTH_SECRET` مضاف في Vercel
- أعد النشر بعد إضافته

### البيانات تختفي
- أنت تستخدم SQLite (لا يعمل على Vercel)
- انتقل إلى PostgreSQL (الخطوة 6)

---

## 📞 الدعم

إذا واجهت مشكلة:
1. تحقق من Build Logs على Vercel
2. ابحث عن رسالة الخطأ في Google
3. تأكد من اتباع كل الخطوات بالترتيب

**بالتوفيق! 🚀**
