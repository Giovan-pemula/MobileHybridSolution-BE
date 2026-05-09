# BRAINUP (E-Learning / LMS API)

This is a robust backend API built with **NestJS**, **Prisma ORM**, and **PostgreSQL** for an E-Learning platform. The API supports courses management, student enrollments, trainer features, lesson tracking, discussions, and an ordering system for courses.

## 🚀 Features

- **Authentication & Authorization**: Secure login and registration using JWT, with role-based access control (`USER`, `TRAINER`, `ADMIN`).
- **User Management**: Profile management and specialized features for different roles.
- **Course Management**: Trainers can create, draft, and publish courses with sections and lessons.
- **Student Enrollments & Progress**: Track student enrollment and lesson completion progress.
- **Trainer Requests**: Users can apply to become trainers by submitting their CV and experience.
- **Discussions**: Real-time Q&A through lesson-specific discussions and replies.
- **Ratings & Reviews**: Students can rate and review completed courses.
- **Wishlist**: Users can save courses to their wishlist for later.
- **Ordering System**: Integrated order tracking for purchasing paid courses.

## 🛠️ Tech Stack

- **Runtime:** Node.js v20+
- **Framework:** [NestJS](https://nestjs.com/)
- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/)
- **Validation:** Zod
- **Authentication:** JWT, Bcrypt
- **Language:** TypeScript

## 📦 Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [PostgreSQL](https://www.postgresql.org/) database running
- [npm](https://www.npmjs.com/) or yarn

## ⚙️ Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/Giovan-pemula/MobileHybridSolution-BE.git
   cd MobileHybridSolution-BE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## 🔧 Configuration
Create a `.env` file in the root directory
```bash
cp .env.example .env
```

Configure the following variables
| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `mysql://user:pass@localhost:3306/bncc_learning` |
| `JWT_KEY` | Secret key for verifying JWT tokens | `super-secret-key-change-me` |
| `PORT` | Application port | `3000` |

## 🗄️ Database Setup

Run the following commands to initialize the database with Prisma:

1. Run Migrations to create tables:

   ```bash
   npx prisma migrate dev
   ```

2. Generate Prisma Clients:

   ```bash
   npx prisma generate
   ```

3. Seed the Database (if seed script exists):
   ```bash
   npx prisma db seed
   ```

## 🏃 Running the Application

### Development mode

  ```bash
  npm run dev
  ```

### Production mode

Compile TypeScript and run:

  ```bash
  npm run build
  npm run start
  ```

## 🗄️ Database Schema

```
Category ←→ Course ←→ Section ←→ Lesson
Course ←→ Enrollment ←→ User
       ←→ Rating ←→ User
       ←→ Wishlist ←→ User
       ←→ OrderItem ←→ Order ←→ User
Lesson ←→ Discussion ←→ Reply ←→ User
       ←→ LessonCompletion ←→ User
User ←→ TrainerRequest
```

### Models

- `User` — A platform user with specific role (USER, TRAINER, ADMIN)
- `Category` — classification group for courses
- `Course` — learning course containing sections and lessons
- `Section` — structured grouping of lessons within a course
- `Lesson` — An individual learning material using video within a section
- `Enrollment` — Enrollment join table linking users to their courses with progress tracking
- `Rating` — user's review and rating score for a specific course
- `Wishlist` — record of a course saved by a user
- `TrainerRequest` — verification request submitted by a user to become a trainer
- `Discussion` — forum thread created by a user on a specific lesson
- `Reply` — response to a discussion thread by a user
- `LessonCompletion` — tracking record indicating a user's completion of a specific lesson
- `Order` — purchase transaction created by a user
- `OrderItem` — individual course included within an order transaction

## 📁 Project Structure

```
MobileHybridSolution-BE/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Migration history
├── src/
│   ├── <feature-modules>/   # Domain modules (auth, course, user, etc.)
│   ├── common/              # Shared components (guards, decorators, filters)
│   ├── config/              # Environment configuration
│   ├── utils/               # Helper functions
│   ├── validations/         # Validation schemas
│   ├── app.module.ts        # Main application module
│   └── main.ts              # Application entry point
├── .env.example             # Environment variables example
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## 📡 API Endpoints

- `[Public]` : Accessible without authentication.
- `[Bearer]` : Requires a valid Bearer Token (Authenticated).
- `[TRAINER]` : Requires Trainer or Admin role.
- `[ADMIN]` : Requires Admin role.

---

### Authentication (`/auth`)

- `POST /auth/login` `[Public]` - User login
- `POST /auth/register` `[Public]` - User registration

### Users (`/users`)

- `GET /users` `[ADMIN]` - Get all users
- `GET /users/:id` `[Bearer]` - Get a specific user
- `PATCH /users/:id` `[Bearer]` - Update user details
- `DELETE /users/:id` `[ADMIN]` - Delete user

### Categories (`/categories`)

- `GET /categories` `[Public]` - Get all categories
- `GET /categories/:id` `[Public]` - Get a specific category
- `POST /categories` `[ADMIN]` - Create a new category
- `PATCH /categories/:id` `[ADMIN]` - Update category
- `DELETE /categories/:id` `[ADMIN]` - Delete category

### Courses (`/courses`)

- `GET /courses` `[Public]` - Get all courses
- `GET /courses/:id` `[Public]` - Get course details
- `POST /courses` `[TRAINER]` - Create a new course
- `PATCH /courses/:id` `[TRAINER]` - Update course
- `DELETE /courses/:id` `[TRAINER]` - Delete course
- `GET /courses/:courseId/students` `[TRAINER]` - Get all students enrolled in a course

### Sections (`/sections`)

- `GET /courses/:courseId/sections` `[Public]` - Get sections of a course
- `POST /courses/:courseId/sections` `[TRAINER]` - Create a new section in a course
- `PATCH /sections/:id` `[TRAINER]` - Update section
- `DELETE /sections/:id` `[TRAINER]` - Delete section

### Lessons (`/lessons`)

- `POST /sections/:sectionId/lessons` `[TRAINER]` - Add a lesson to a section
- `PATCH /lessons/:id` `[TRAINER]` - Update lesson details
- `DELETE /lessons/:id` `[TRAINER]` - Delete lesson

### Enrollments (`/enrollment`)

- `GET /my-courses` `[Bearer]` - Get currently logged-in user's enrolled courses
- `POST /courses/:courseId/enroll` `[Bearer]` - Enroll in a course

### Lesson Completions

- `POST /lessons/:lessonId/complete` `[Bearer]` - Mark a lesson as completed
- `GET /analytics/learning` `[Bearer]` - Get learning progress analytics

### Discussions

- `GET /lessons/:lessonId/discussions` `[Public]` - Get discussions for a lesson
- `POST /lessons/:lessonId/discussions` `[Bearer]` - Create a new discussion thread
- `POST /discussions/:id/replies` `[Bearer]` - Reply to a discussion thread

### Ratings (`/ratings`)

- `GET /courses/:courseId/ratings` `[Public]` - Get all ratings for a course
- `POST /courses/:courseId/rating` `[Bearer]` - Rate a course
- `PATCH /ratings/:id` `[Bearer]` - Update a rating
- `DELETE /ratings/:id` `[Bearer]` - Delete a rating

### Wishlists (`/wishlist`)

- `GET /wishlist` `[Bearer]` - Get user's wishlist
- `POST /wishlist` `[Bearer]` - Add a course to wishlist
- `DELETE /wishlist/:courseId` `[Bearer]` - Remove a course from wishlist

### Orders (`/orders`)

- `GET /orders` `[Bearer]` - Get user's orders
- `POST /orders` `[Bearer]` - Create a new order

### Trainer & Trainer Requests

- `POST /trainer/request` `[Bearer]` - Submit a trainer request
- `GET /admin/trainer-requests` `[ADMIN]` - Get all trainer requests
- `PATCH /admin/trainer/:id/verify` `[ADMIN]` - Verify a trainer request
- `GET /trainer/dashboard` `[TRAINER]` - Get trainer dashboard stats
- `GET /trainer/sales` `[TRAINER]` - Get trainer sales stats

### Health Check

- `GET /health` `[Public]` - Check API health status

## 📄 License

This project is licensed under the ISC License.
