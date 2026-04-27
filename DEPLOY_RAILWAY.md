# Deploy en Railway

## 1. Crear el proyecto

1. Sube este directorio a GitHub como repositorio propio.
2. En Railway, crea un proyecto nuevo desde ese repositorio.
3. Agrega un servicio de PostgreSQL en el mismo proyecto.

## 2. Variables de entorno

Configura estas variables en el servicio web de Railway:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=
JWT_EXPIRES_IN=7d
ENCRYPTION_KEY=
NEXT_PUBLIC_APP_URL=https://tu-dominio.railway.app
NEXT_PUBLIC_THEME=calm
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=contacto@tudominio.com
SMTP_PASS=
SMTP_FROM=ARUOSAL <contacto@tudominio.com>
```

Genera los secretos localmente:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Usa el primer valor para `JWT_SECRET` y el segundo para `ENCRYPTION_KEY`.

## 3. Deploy

Railway usa `railway.json`:

- Build: `npm run railway:build`
- Start: `npm run railway:start`

El comando de arranque ejecuta `prisma db push` antes de iniciar Next.js para crear las tablas en PostgreSQL.

## 4. Correo OTP

El envio de OTP usa SMTP. Si usas Hostinger Email, revisa el buzon en hPanel y configura:

- `SMTP_HOST`: `smtp.hostinger.com`
- `SMTP_PORT`: `465`
- `SMTP_USER`: correo completo del buzon
- `SMTP_PASS`: password del buzon
- `SMTP_FROM`: remitente, por ejemplo `ARUOSAL <contacto@tudominio.com>`
