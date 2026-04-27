import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@aruosal.com';
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      consent: true,
      zone_profile: true,
      emotional_logs: {
        orderBy: { timestamp: 'desc' },
      },
      coach_sessions: true,
    },
  });

  if (!user) {
    console.error('Usuario demo no encontrado.');
    return;
  }

  console.log('--- Resumen del Usuario Demo ---');
  console.log(`Nombre: ${user.name}`);
  console.log(`Email: ${user.email}`);
  console.log(`Consentimiento: ${user.consent ? 'OK' : 'Faltante'}`);
  console.log(`Perfil de Zona: ${user.zone_profile ? 'Creado' : 'Faltante'}`);
  console.log(`Logs Emocionales: ${user.emotional_logs.length}`);
  console.log(`Sesiones de Coach: ${user.coach_sessions.length}`);

  if (user.emotional_logs.length > 0) {
    console.log('Últimos 3 logs:');
    user.emotional_logs.slice(0, 3).forEach((log) => {
      console.log(`- ${log.timestamp.toISOString()}: Zone=${log.zone}, Q=${log.quadrant}, A=${log.arousal.toFixed(2)}, V=${log.valence.toFixed(2)}`);
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
