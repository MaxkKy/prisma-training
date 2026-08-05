# Docker Compose — Learning Links (เอกสาร Compose)

แหล่งหลักทางการของ Docker: เริ่มจากหน้านี้แล้วไล่เมนูซ้าย  
https://docs.docker.com/compose/

---

## 1) เริ่มต้น / ภาพรวม
- Compose overview: https://docs.docker.com/compose/
- Quickstart: https://docs.docker.com/compose/gettingstarted/
- Features & use cases: https://docs.docker.com/compose/intro/features-uses/
- How Compose works (application model): https://docs.docker.com/compose/intro/compose-application-model/
- History / versions: https://docs.docker.com/compose/intro/history/
- Install Compose: https://docs.docker.com/compose/install/

---

## 2) Compose file reference (หัวใจของ compose.yaml)
- หน้าหลัก Compose file: https://docs.docker.com/reference/compose-file/
- Version & name: https://docs.docker.com/reference/compose-file/version-and-name/
- `services`: https://docs.docker.com/reference/compose-file/services/
- `build`: https://docs.docker.com/reference/compose-file/build/
- `networks` (top-level): https://docs.docker.com/reference/compose-file/networks/
- `volumes` (top-level): https://docs.docker.com/reference/compose-file/volumes/
- `configs`: https://docs.docker.com/reference/compose-file/configs/
- `secrets`: https://docs.docker.com/reference/compose-file/secrets/
- `fragments` / extension fields: https://docs.docker.com/reference/compose-file/fragments/
- `include`: https://docs.docker.com/reference/compose-file/include/
- Merge / multiple Compose files: https://docs.docker.com/reference/compose-file/merge/
- Deploy (Swarm-oriented): https://docs.docker.com/reference/compose-file/deploy/
- Develop: https://docs.docker.com/reference/compose-file/develop/

### คีย์ใน services ที่ใช้บ่อย (โปรเจกต์นี้)
- `image`: https://docs.docker.com/reference/compose-file/services/#image
- `build`: https://docs.docker.com/reference/compose-file/build/
- `ports`: https://docs.docker.com/reference/compose-file/services/#ports
- `expose`: https://docs.docker.com/reference/compose-file/services/#expose
- `environment`: https://docs.docker.com/reference/compose-file/services/#environment
- `env_file`: https://docs.docker.com/reference/compose-file/services/#env_file
- `command`: https://docs.docker.com/reference/compose-file/services/#command
- `entrypoint`: https://docs.docker.com/reference/compose-file/services/#entrypoint
- `depends_on`: https://docs.docker.com/reference/compose-file/services/#depends_on
- `healthcheck`: https://docs.docker.com/reference/compose-file/services/#healthcheck
- `volumes` (ใน service): https://docs.docker.com/reference/compose-file/services/#volumes
- `secrets` (ใน service): https://docs.docker.com/reference/compose-file/services/#secrets
- `restart`: https://docs.docker.com/reference/compose-file/services/#restart
- `container_name`: https://docs.docker.com/reference/compose-file/services/#container_name
- `profiles`: https://docs.docker.com/reference/compose-file/services/#profiles

---

## 3) How-tos (วิธีใช้จริง)
> หมายเหตุ: หน้า `https://docs.docker.com/compose/how-tos/` (index) อาจ **404**  
> ให้เข้าทีละหัวข้อด้านล่าง หรือเริ่มจาก https://docs.docker.com/compose/

- Environment variables (ชุดรวม): https://docs.docker.com/compose/how-tos/environment-variables/
- Variable interpolation `${VAR}` (how-to): https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/
- Interpolation ใน Compose file reference: https://docs.docker.com/reference/compose-file/interpolation/
- Set environment variables: https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/
- Env vars precedence: https://docs.docker.com/compose/how-tos/environment-variables/envvars-precedence/
- Use secrets: https://docs.docker.com/compose/how-tos/use-secrets/
- Networking: https://docs.docker.com/compose/how-tos/networking/
- Startup order / depends_on: https://docs.docker.com/compose/how-tos/startup-order/
- File watch: https://docs.docker.com/compose/how-tos/file-watch/
- Init / lifecycle (pre_start ฯลฯ): https://docs.docker.com/compose/how-tos/init-containers/
- Volumes (reference): https://docs.docker.com/reference/compose-file/volumes/
- Multiple compose files (merge): https://docs.docker.com/reference/compose-file/merge/

---

## 4) CLI commands (`docker compose ...`)
- CLI reference หน้าหลัก: https://docs.docker.com/reference/cli/docker/compose/
- `up`: https://docs.docker.com/reference/cli/docker/compose/up/
- `down`: https://docs.docker.com/reference/cli/docker/compose/down/
- `start`: https://docs.docker.com/reference/cli/docker/compose/start/
- `stop`: https://docs.docker.com/reference/cli/docker/compose/stop/
- `restart`: https://docs.docker.com/reference/cli/docker/compose/restart/
- `ps`: https://docs.docker.com/reference/cli/docker/compose/ps/
- `logs`: https://docs.docker.com/reference/cli/docker/compose/logs/
- `exec`: https://docs.docker.com/reference/cli/docker/compose/exec/
- `run`: https://docs.docker.com/reference/cli/docker/compose/run/
- `build`: https://docs.docker.com/reference/cli/docker/compose/build/
- `pull`: https://docs.docker.com/reference/cli/docker/compose/pull/
- `config` (ตรวจ YAML): https://docs.docker.com/reference/cli/docker/compose/config/
- `images`: https://docs.docker.com/reference/cli/docker/compose/images/
- `ls` / `ls` projects: https://docs.docker.com/reference/cli/docker/compose/ls/
- `top`: https://docs.docker.com/reference/cli/docker/compose/top/
- `kill`: https://docs.docker.com/reference/cli/docker/compose/kill/
- `pause` / `unpause`: https://docs.docker.com/reference/cli/docker/compose/pause/
- `port`: https://docs.docker.com/reference/cli/docker/compose/port/
- `cp`: https://docs.docker.com/reference/cli/docker/compose/cp/
- `watch`: https://docs.docker.com/reference/cli/docker/compose/watch/
- `events`: https://docs.docker.com/reference/cli/docker/compose/events/

ตัวอย่างที่ใช้กับโปรเจกต์นี้:
```powershell
docker compose up -d --build
docker compose ps
docker compose logs -f web
docker compose exec web sh
docker compose down
docker compose down -v
docker compose config
```

หมายเหตุ: **ไม่มี** flag `--update` → ใช้ `up -d` / `--build` / `--force-recreate`

---

## 5) Compose Specification (มาตรฐานกลาง)
- Compose Spec หน้าหลัก: https://compose-spec.github.io/compose-spec/
- Spec บน GitHub: https://github.com/compose-spec/compose-spec
- Compose file ใน Spec: https://compose-spec.github.io/compose-spec/03-compose-file.html

---

## 6) เอกสารเสริมที่เกี่ยวกับโปรเจกต์นี้ (ไม่ใช่ Compose โดยตรง แต่ใช้คู่กัน)
- MySQL Docker Hub (`MYSQL_*`, `MYSQL_ROOT_PASSWORD_FILE`): https://hub.docker.com/_/mysql
- Dockerfile reference: https://docs.docker.com/reference/dockerfile/
- Prisma migrate deploy: https://www.prisma.io/docs/cli/migrate/deploy

---

## ลำดับอ่านแนะนำ
1. Quickstart + How Compose works  
2. Compose file → `services` / `volumes` / `secrets`  
3. How-tos: env interpolation, secrets, startup order  
4. CLI: `up`, `down`, `logs`, `exec`, `config`  
5. Compose Spec (อ่านลึกเมื่อพร้อม)

---

## Map กับ compose.yaml ปัจจุบัน
| หัวข้อในไฟล์ | อ่านที่ |
|--------------|---------|
| `environment` ใต้ `web` | services → environment + env how-tos |
| `${DATABASE_USER}` | variable interpolation |
| `command` (migrate && start) | services → command |
| `depends_on` + `service_healthy` | depends_on + healthcheck + startup-order |
| `secrets` + `MYSQL_ROOT_PASSWORD_FILE` | secrets + use-secrets + MySQL Hub |
| `db_data:/var/lib/mysql` | volumes |
| `ports` `3001:3000`, `3307:3306` | services → ports |
| `restart: unless-stopped` | services → restart |
