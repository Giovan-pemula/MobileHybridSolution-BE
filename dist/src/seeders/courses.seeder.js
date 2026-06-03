"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coursesData = [
    {
        trainerIndex: 0,
        categorySlug: 'web-development',
        title: 'NestJS Masterclass: Bangun REST API Profesional',
        description: 'Pelajari cara membangun API backend yang scalable dan maintainable menggunakan NestJS, Prisma, dan PostgreSQL dari nol hingga production.',
        price: 299000,
        isFree: false,
        previewYoutubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: 'PUBLISHED',
        sections: [
            {
                title: 'Pengenalan NestJS',
                order: 1,
                lessons: [
                    { title: 'Apa itu NestJS?', duration: 480, isPreview: true, order: 1 },
                    { title: 'Instalasi & Setup Project', duration: 600, isPreview: true, order: 2 },
                    { title: 'Struktur Folder NestJS', duration: 540, isPreview: false, order: 3 },
                ],
            },
            {
                title: 'Modules, Controllers & Services',
                order: 2,
                lessons: [
                    { title: 'Memahami Dependency Injection', duration: 720, isPreview: false, order: 1 },
                    { title: 'Membuat Controller Pertama', duration: 660, isPreview: false, order: 2 },
                    { title: 'Service Layer Pattern', duration: 600, isPreview: false, order: 3 },
                ],
            },
            {
                title: 'Database dengan Prisma',
                order: 3,
                lessons: [
                    { title: 'Setup Prisma & PostgreSQL', duration: 900, isPreview: false, order: 1 },
                    { title: 'Migrasi & Schema Design', duration: 840, isPreview: false, order: 2 },
                    { title: 'CRUD Operations dengan Prisma', duration: 1080, isPreview: false, order: 3 },
                    { title: 'Relasi & Query Lanjutan', duration: 960, isPreview: false, order: 4 },
                ],
            },
            {
                title: 'Autentikasi & Otorisasi',
                order: 4,
                lessons: [
                    { title: 'JWT Authentication', duration: 900, isPreview: false, order: 1 },
                    { title: 'Role-Based Access Control', duration: 780, isPreview: false, order: 2 },
                    { title: 'Guards & Decorators', duration: 660, isPreview: false, order: 3 },
                ],
            },
        ],
    },
    {
        trainerIndex: 0,
        categorySlug: 'devops',
        title: 'Docker & CI/CD untuk Backend Developer',
        description: 'Kuasai containerization dengan Docker dan otomasi deployment menggunakan GitHub Actions. Deploy aplikasi NestJS ke cloud dengan percaya diri.',
        price: 249000,
        isFree: false,
        previewYoutubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: 'PUBLISHED',
        sections: [
            {
                title: 'Dasar-Dasar Docker',
                order: 1,
                lessons: [
                    { title: 'Apa itu Container?', duration: 480, isPreview: true, order: 1 },
                    { title: 'Instalasi Docker & Docker Compose', duration: 540, isPreview: true, order: 2 },
                    { title: 'Membuat Dockerfile Pertama', duration: 720, isPreview: false, order: 3 },
                ],
            },
            {
                title: 'Dockerize Aplikasi NestJS',
                order: 2,
                lessons: [
                    { title: 'Multi-Stage Builds', duration: 660, isPreview: false, order: 1 },
                    { title: 'Docker Compose untuk Development', duration: 780, isPreview: false, order: 2 },
                    { title: 'Environment Variables & Secrets', duration: 540, isPreview: false, order: 3 },
                ],
            },
            {
                title: 'CI/CD dengan GitHub Actions',
                order: 3,
                lessons: [
                    { title: 'Setup GitHub Actions Workflow', duration: 840, isPreview: false, order: 1 },
                    { title: 'Automated Testing & Linting', duration: 720, isPreview: false, order: 2 },
                    { title: 'Deploy ke VPS / Cloud', duration: 900, isPreview: false, order: 3 },
                ],
            },
        ],
    },
    {
        trainerIndex: 1,
        categorySlug: 'data-science',
        title: 'Python untuk Data Science: dari Pandas ke Visualisasi',
        description: 'Belajar mengolah data menggunakan Python, Pandas, NumPy, dan Matplotlib. Cocok untuk pemula yang ingin terjun ke dunia data.',
        price: 0,
        isFree: true,
        previewYoutubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: 'PUBLISHED',
        sections: [
            {
                title: 'Pengenalan Python untuk Data',
                order: 1,
                lessons: [
                    { title: 'Setup Python & Jupyter Notebook', duration: 480, isPreview: true, order: 1 },
                    { title: 'Tipe Data & Struktur Dasar', duration: 600, isPreview: true, order: 2 },
                    { title: 'List Comprehension & Lambda', duration: 540, isPreview: true, order: 3 },
                ],
            },
            {
                title: 'Pandas untuk Analisis Data',
                order: 2,
                lessons: [
                    { title: 'DataFrame & Series', duration: 720, isPreview: false, order: 1 },
                    { title: 'Data Cleaning & Transformasi', duration: 900, isPreview: false, order: 2 },
                    { title: 'Groupby & Aggregasi', duration: 780, isPreview: false, order: 3 },
                    { title: 'Merge, Join & Concat', duration: 660, isPreview: false, order: 4 },
                ],
            },
            {
                title: 'Visualisasi Data',
                order: 3,
                lessons: [
                    { title: 'Matplotlib Basics', duration: 600, isPreview: false, order: 1 },
                    { title: 'Seaborn untuk Statistik Visual', duration: 720, isPreview: false, order: 2 },
                    { title: 'Dashboard Interaktif dengan Plotly', duration: 840, isPreview: false, order: 3 },
                ],
            },
        ],
    },
    {
        trainerIndex: 1,
        categorySlug: 'machine-learning',
        title: 'Machine Learning dengan Scikit-Learn & TensorFlow',
        description: 'Pelajari algoritma ML klasik hingga deep learning. Implementasi langsung pada dataset nyata dan deploy model ke API.',
        price: 399000,
        isFree: false,
        previewYoutubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: 'PUBLISHED',
        sections: [
            {
                title: 'Fundamental Machine Learning',
                order: 1,
                lessons: [
                    { title: 'Apa itu Machine Learning?', duration: 480, isPreview: true, order: 1 },
                    { title: 'Supervised vs Unsupervised Learning', duration: 600, isPreview: true, order: 2 },
                    { title: 'Train/Test Split & Cross-Validation', duration: 720, isPreview: false, order: 3 },
                ],
            },
            {
                title: 'Algoritma Klasik dengan Scikit-Learn',
                order: 2,
                lessons: [
                    { title: 'Linear & Logistic Regression', duration: 900, isPreview: false, order: 1 },
                    { title: 'Decision Trees & Random Forest', duration: 840, isPreview: false, order: 2 },
                    { title: 'SVM & K-Nearest Neighbors', duration: 780, isPreview: false, order: 3 },
                    { title: 'Feature Engineering & Selection', duration: 720, isPreview: false, order: 4 },
                ],
            },
            {
                title: 'Deep Learning dengan TensorFlow',
                order: 3,
                lessons: [
                    { title: 'Neural Network Fundamentals', duration: 900, isPreview: false, order: 1 },
                    { title: 'Membangun Model dengan Keras', duration: 1080, isPreview: false, order: 2 },
                    { title: 'Convolutional Neural Networks (CNN)', duration: 1200, isPreview: false, order: 3 },
                    { title: 'Deploy Model sebagai REST API', duration: 960, isPreview: false, order: 4 },
                ],
            },
        ],
    },
    {
        trainerIndex: 2,
        categorySlug: 'mobile-development',
        title: 'Flutter Complete Course: Bangun App iOS & Android',
        description: 'Kuasai Flutter dari dasar hingga mahir. Buat aplikasi cross-platform yang indah dan performan untuk iOS dan Android.',
        price: 349000,
        isFree: false,
        previewYoutubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: 'PUBLISHED',
        sections: [
            {
                title: 'Dasar-Dasar Flutter & Dart',
                order: 1,
                lessons: [
                    { title: 'Pengenalan Flutter & Dart', duration: 480, isPreview: true, order: 1 },
                    { title: 'Setup Environment Flutter', duration: 600, isPreview: true, order: 2 },
                    { title: 'Tipe Data & OOP di Dart', duration: 720, isPreview: false, order: 3 },
                    { title: 'Widget Tree & Stateless vs Stateful', duration: 660, isPreview: false, order: 4 },
                ],
            },
            {
                title: 'UI Komponen & Layout',
                order: 2,
                lessons: [
                    { title: 'Material Design Components', duration: 840, isPreview: false, order: 1 },
                    { title: 'Flex, Row, Column & Stack', duration: 720, isPreview: false, order: 2 },
                    { title: 'ListView, GridView & CustomScrollView', duration: 900, isPreview: false, order: 3 },
                    { title: 'Animasi Dasar di Flutter', duration: 780, isPreview: false, order: 4 },
                ],
            },
            {
                title: 'State Management dengan Riverpod',
                order: 3,
                lessons: [
                    { title: 'Apa itu State Management?', duration: 480, isPreview: false, order: 1 },
                    { title: 'Provider & StateNotifier', duration: 840, isPreview: false, order: 2 },
                    { title: 'AsyncNotifier & FutureProvider', duration: 780, isPreview: false, order: 3 },
                ],
            },
            {
                title: 'Integrasi API & Database Lokal',
                order: 4,
                lessons: [
                    { title: 'HTTP Requests dengan Dio', duration: 720, isPreview: false, order: 1 },
                    { title: 'JSON Serialization', duration: 660, isPreview: false, order: 2 },
                    { title: 'Local Storage dengan Hive', duration: 600, isPreview: false, order: 3 },
                    { title: 'Build & Release App', duration: 900, isPreview: false, order: 4 },
                ],
            },
        ],
    },
    {
        trainerIndex: 2,
        categorySlug: 'mobile-development',
        title: 'React Native untuk Pemula: Buat App Mobile dengan JS',
        description: 'Pelajari React Native dari nol. Gunakan keahlian JavaScript/React yang sudah kamu miliki untuk membangun aplikasi mobile native.',
        price: 0,
        isFree: true,
        previewYoutubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: 'PUBLISHED',
        sections: [
            {
                title: 'Memulai React Native',
                order: 1,
                lessons: [
                    { title: 'React Native vs Flutter vs Native', duration: 480, isPreview: true, order: 1 },
                    { title: 'Setup dengan Expo', duration: 540, isPreview: true, order: 2 },
                    { title: 'Core Components: View, Text, Image', duration: 660, isPreview: false, order: 3 },
                ],
            },
            {
                title: 'Navigasi & Layar',
                order: 2,
                lessons: [
                    { title: 'React Navigation Setup', duration: 720, isPreview: false, order: 1 },
                    { title: 'Stack & Tab Navigator', duration: 660, isPreview: false, order: 2 },
                    { title: 'Passing Data Antar Layar', duration: 540, isPreview: false, order: 3 },
                ],
            },
        ],
    },
];
async function seedCourses(prisma, trainerIds) {
    console.log('Seeding courses, sections & lessons...');
    let totalCourses = 0;
    let totalSections = 0;
    let totalLessons = 0;
    // Pre-fetch all categories
    const categories = await prisma.category.findMany();
    const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));
    for (const data of coursesData) {
        const trainerId = trainerIds[data.trainerIndex];
        const categoryId = categoryMap.get(data.categorySlug);
        if (!trainerId || !categoryId) {
            console.warn(`  ⚠ Skipping "${data.title}": trainer or category not found`);
            continue;
        }
        const existing = await prisma.course.findFirst({
            where: { title: data.title, trainerId },
        });
        const course = existing
            ? await prisma.course.update({
                where: { id: existing.id },
                data: {
                    description: data.description,
                    price: data.price,
                    isFree: data.isFree,
                    previewYoutubeUrl: data.previewYoutubeUrl,
                    status: data.status,
                    categoryId,
                },
            })
            : await prisma.course.create({
                data: {
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    isFree: data.isFree,
                    previewYoutubeUrl: data.previewYoutubeUrl,
                    status: data.status,
                    categoryId,
                    trainerId,
                },
            });
        totalCourses++;
        console.log(`  ✓ Course: "${course.title}"`);
        for (const sectionData of data.sections) {
            const existingSection = await prisma.section.findFirst({
                where: { title: sectionData.title, courseId: course.id },
            });
            const section = existingSection
                ? await prisma.section.update({
                    where: { id: existingSection.id },
                    data: { order: sectionData.order },
                })
                : await prisma.section.create({
                    data: {
                        title: sectionData.title,
                        order: sectionData.order,
                        courseId: course.id,
                    },
                });
            totalSections++;
            for (const lessonData of sectionData.lessons) {
                const existingLesson = await prisma.lesson.findFirst({
                    where: { title: lessonData.title, sectionId: section.id },
                });
                if (!existingLesson) {
                    await prisma.lesson.create({
                        data: {
                            title: lessonData.title,
                            duration: lessonData.duration,
                            isPreview: lessonData.isPreview,
                            order: lessonData.order,
                            sectionId: section.id,
                        },
                    });
                }
                totalLessons++;
            }
        }
    }
    console.log(`${totalCourses} courses, ${totalSections} sections, ${totalLessons} lessons seeded`);
}
exports.default = seedCourses;
//# sourceMappingURL=courses.seeder.js.map