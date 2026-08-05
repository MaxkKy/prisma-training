# ใช้ Node บน Alpine Linux (image เล็กกว่า Debian)
# Alpine ใช้ตัวจัดการแพ็กเกจชื่อ apk ไม่ใช่ apt
FROM node:alpine

# ตั้งโฟลเดอร์ทำงานใน container เป็น /app
WORKDIR /app

# ติดตั้งเครื่องมือระบบสำหรับคอมไพล์ native module (เช่น argon2)
# apk = ตัวจัดการแพ็กเกจของ Alpine (เทียบกับ apt ของ Debian)
# --no-cache = ลงแพ็กเกจโดยไม่เก็บ index/cache ไว้ → image เล็กลง
#   (คล้ายแนวคิด rm apt lists บน Debian แต่ทำในขั้นตอนเดียว)
# python3, make, g++ = ใช้ตอน npm ci build โค้ด C++ ของ argon2
# libc6-compat = ช่วยให้บาง binary ที่คาดหวัง glibc รันบน musl ของ Alpine ได้ดีขึ้น
RUN apk add --no-cache python3 make g++ libc6-compat

# copy แค่ไฟล์ dependency ก่อน เพื่อให้ Docker cache layer ของ npm ci ได้
COPY package.json package-lock.json ./
# ติดตั้ง packages ตาม package-lock.json (ทั้ง dependencies + devDependencies)
RUN npm ci

# copy โค้ดโปรเจกต์ที่เหลือเข้า container
COPY . .

# สร้าง Prisma Client จาก schema (ไปที่ generated/prisma)
RUN npx prisma generate
# build Next.js เป็น production
RUN npm run build

# บอกว่าเป็นโหมด production
ENV NODE_ENV=production
# เอกสารว่า container เปิดพอร์ต 3000 (ยังต้อง map ใน Compose/run)
EXPOSE 3000

# คำสั่งตอน start container → รัน next start
# (Compose อาจทับด้วย command เช่น migrate ก่อนแล้วค่อย start)
CMD ["npm", "run", "start"]
