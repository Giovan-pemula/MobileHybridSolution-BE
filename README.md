# BRAINUP (E-Learning / LMS API)

This is a robust backend API built with **NestJS**, **Prisma ORM**, and **PostgreSQL** for an E-Learning platform. The API supports courses management, student enrollments, trainer features, lesson tracking, discussions, and an ordering system.

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

- **Framework:** [NestJS](https://nestjs.com/)
- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/)
- **Validation:** Zod
- **Authentication:** JWT, Bcrypt
- **Language:** TypeScript

## 📦 Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) database running
- [npm](https://www.npmjs.com/) or yarn

## ⚙️ Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd MobileHybridSolutionWHB
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and configure your database and JWT secrets:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/yourdb?schema=public"
   PORT=3000
   ```

## 🗄️ Database Setup

Run the following commands to initialize the database with Prisma:

1. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

2. Run Migrations:
   ```bash
   npx prisma migrate dev
   ```

3. Seed the Database (if seed script exists):
   ```bash
   npm run seed
   ```

## 🏃 Running the Application

- **Development mode:**
  ```bash
  npm run dev
  ```

- **Production mode:**
  ```bash
  npm run build
  npm run start
  ```

## 📁 Project Structure

- `src/auth/` - Authentication and JWT logic
- `src/user/` - User profiles and management
- `src/course/` - Course, section, and lesson management
- `src/enrollment/` - Managing student enrollments and progress
- `src/trainer-request/` - Logic for upgrading user accounts to trainers
- `src/discussion/` - Lesson discussions and replies
- `src/order/` - Course purchase and transaction management
- `prisma/schema.prisma` - Prisma database schema definition

## 📡 API Endpoints

### 🔑 Legend
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
