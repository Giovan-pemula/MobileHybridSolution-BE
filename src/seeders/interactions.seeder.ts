import { PrismaClient } from '../../generated/prisma/client';

const enrollmentMap: Record<number, number[]> = {
  0: [0, 2, 4],   
  1: [2, 3, 5],   
  2: [0, 1, 4],   
  3: [2, 5],     
  4: [3, 4],     
};

const ratingsData = [
  { userIndex: 0, courseIndex: 0, rating: 5, review: 'Materi NestJS-nya sangat lengkap dan mudah dipahami! Highly recommended.' },
  { userIndex: 0, courseIndex: 2, rating: 4, review: 'Penjelasan Pandas-nya bagus, tapi lebih banyak contoh real-world would be great.' },
  { userIndex: 1, courseIndex: 2, rating: 5, review: 'Kursus Data Science terbaik untuk pemula. Gratis lagi!' },
  { userIndex: 1, courseIndex: 3, rating: 4, review: 'ML course yang komprehensif. TensorFlow section sangat membantu.' },
  { userIndex: 2, courseIndex: 0, rating: 5, review: 'Akhirnya paham dependency injection! Materinya terstruktur dengan baik.' },
  { userIndex: 2, courseIndex: 4, rating: 4, review: 'Flutter course yang solid. Riverpod section bisa lebih detail sedikit.' },
  { userIndex: 3, courseIndex: 2, rating: 5, review: 'Sangat membantu untuk karir saya di data analytics.' },
  { userIndex: 4, courseIndex: 3, rating: 3, review: 'Bagus tapi beberapa topik advanced kurang dalam pembahasannya.' },
  { userIndex: 4, courseIndex: 4, rating: 5, review: 'Terbaik! Dari zero to hero Flutter dalam satu kursus.' },
];

const discussionsData = [
  { userIndex: 0, lessonKey: 'NestJS?', comment: 'Apakah NestJS bisa digunakan untuk real-time app dengan WebSocket?' },
  { userIndex: 2, lessonKey: 'NestJS?', comment: 'Bagaimana cara handle error secara global di NestJS?' },
  { userIndex: 1, lessonKey: 'Setup Python & Jupyter Notebook', comment: 'Kalau pakai VS Code bisa langsung tanpa Jupyter Notebook?' },
];

async function seedInteractions(
  prisma: PrismaClient,
  userIds: number[],
  courseIds: number[],
) {
  console.log('Seeding enrollments, ratings & discussions...');

  let enrollCount = 0;
  for (const [userIdx, courseIdxList] of Object.entries(enrollmentMap)) {
    const userId = userIds[Number(userIdx)];
    if (!userId) continue;

    for (const courseIdx of courseIdxList) {
      const courseId = courseIds[courseIdx];
      if (!courseId) continue;

      await prisma.enrollment.upsert({
        where: { userId_courseId: { userId, courseId } },
        update: {},
        create: { userId, courseId, progress: Math.random() * 0.8, completed: false },
      });
      enrollCount++;
    }
  }
  console.log(`  ✓ ${enrollCount} enrollments seeded`);

  
  let ratingCount = 0;
  for (const r of ratingsData) {
    const userId = userIds[r.userIndex];
    const courseId = courseIds[r.courseIndex];
    if (!userId || !courseId) continue;

    await prisma.rating.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { rating: r.rating, review: r.review },
      create: { userId, courseId, rating: r.rating, review: r.review },
    });
    ratingCount++;
  }
  console.log(`  ✓ ${ratingCount} ratings seeded`);

  let discussionCount = 0;
  for (const d of discussionsData) {
    const userId = userIds[d.userIndex];
    if (!userId) continue;

    const lesson = await prisma.lesson.findFirst({
      where: { title: { contains: d.lessonKey } },
    });
    if (!lesson) continue;

    const existing = await prisma.discussion.findFirst({
      where: { lessonId: lesson.id, userId, comment: d.comment },
    });
    if (!existing) {
      await prisma.discussion.create({
        data: { lessonId: lesson.id, userId, comment: d.comment },
      });
      discussionCount++;
    }
  }
  console.log(`  ✓ ${discussionCount} discussions seeded`);
}

export default seedInteractions;
