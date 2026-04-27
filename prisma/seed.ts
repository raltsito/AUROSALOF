import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@aruosal.com';
  const name = 'Usuario Demo';
  const password = 'Password123!';

  // 1. Limpiar datos previos del demo si existen
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    await prisma.user.delete({ where: { email } });
    console.log('Usuario demo anterior eliminado.');
  }

  // 2. Crear usuario
  const hashedPassword = await argon2.hash(password, {
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
    type: 2,
  });

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      theme: 'calm',
      shift: 'morning',
      company_id: 'DEMO-CORP',
    },
  });

  console.log(`Usuario creado: ${user.email}`);

  // 3. Crear consentimiento
  await prisma.consent.create({
    data: {
      user_id: user.id,
      timestamp: new Date(),
      version: '1.0',
      text_hash: 'demo_consent_hash',
      otp_verified: true,
      ip_address: '127.0.0.1',
      device_id: 'demo-device-id',
    },
  });

  // 4. Crear perfil de zona
  await prisma.zoneProfile.create({
    data: {
      user_id: user.id,
      center_arousal: 5.5,
      center_valence: 6.0,
      sigma_arousal: 1.5,
      sigma_valence: 1.8,
      sample_count: 21, // 7 días * 3 check-ins
    },
  });

  // 5. Crear logs emocionales de los últimos 7 días
  const logs = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);

    // Mañana (Q2: High Arousal, High Valence) - Energizado y feliz
    logs.push({
      user_id: user.id,
      arousal: 7.5 + (Math.random() - 0.5),
      valence: 8.0 + (Math.random() - 0.5),
      zone: 'green',
      quadrant: 'Q2',
      timestamp: new Date(date.setHours(9, 0, 0, 0)),
    });

    // Tarde (Q1: High Arousal, Low Valence) - Estresado o cansado
    logs.push({
      user_id: user.id,
      arousal: 6.5 + (Math.random() - 0.5),
      valence: 4.5 + (Math.random() - 0.5),
      zone: 'yellow',
      quadrant: 'Q1',
      timestamp: new Date(date.setHours(15, 0, 0, 0)),
    });

    // Noche (Q4: Low Arousal, High Valence) - Calmado
    logs.push({
      user_id: user.id,
      arousal: 3.5 + (Math.random() - 0.5),
      valence: 7.5 + (Math.random() - 0.5),
      zone: 'green',
      quadrant: 'Q4',
      timestamp: new Date(date.setHours(21, 0, 0, 0)),
    });
  }

  await prisma.emotionalLog.createMany({
    data: logs,
  });

  console.log(`${logs.length} logs emocionales creados.`);

  // 6. Crear algunas sesiones de coach
  await prisma.coachSession.createMany({
    data: [
      {
        user_id: user.id,
        type: 'virtual',
        status: 'completed',
        started_at: new Date(new Date().setDate(now.getDate() - 3)),
        ended_at: new Date(new Date().setDate(now.getDate() - 3)),
      },
      {
        user_id: user.id,
        type: 'human',
        status: 'pending',
        started_at: new Date(new Date().setDate(now.getDate() + 1)),
      },
    ],
  });

  console.log('Sesiones de coach creadas.');
  console.log('Seed finalizado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
