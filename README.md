# 🏏 Cricket Tournament Management System

A modern, full-stack cricket tournament management application built with Next.js, TypeScript, and Aiven PostgreSQL.

## ✨ Features

- **User Registration & Authentication** - Modal-based signup with JWT authentication
- **Team Management** - Register teams and manage player profiles
- **Photo Storage** - Database-based profile photo storage
- **Dashboard** - Comprehensive tournament dashboard with statistics
- **Responsive Design** - Modern UI with Tailwind CSS and shadcn/ui
- **Database Integration** - Aiven PostgreSQL with secure SSL connection

## 🚀 Live Demo

**Visit the deployed application:** [Your Vercel URL will be here]

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Node.js
- **Database**: Aiven PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel
- **Photo Storage**: PostgreSQL BYTEA

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Aiven PostgreSQL database
- Vercel account (for deployment)

## 🔧 Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cricket-tournament
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DB_USER=your_db_user
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=your_db_port
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXT_TELEMETRY_DISABLED=1
   ```

4. **Set up the database**
   ```bash
   node scripts/setup-aiven-database.js
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3003](http://localhost:3003)

## 🚀 Deployment to Vercel

### Method 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the application**
   ```bash
   vercel
   ```

4. **Set environment variables in Vercel**
   Go to your Vercel dashboard → Project Settings → Environment Variables and add:
   ```
   DB_USER=your_db_user
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=your_db_port
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXT_TELEMETRY_DISABLED=1
   ```

### Method 2: Deploy via GitHub Integration

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_USER` | Aiven PostgreSQL username | Yes |
| `DB_HOST` | Aiven PostgreSQL host | Yes |
| `DB_NAME` | Aiven PostgreSQL database name | Yes |
| `DB_PASSWORD` | Aiven PostgreSQL password | Yes |
| `DB_PORT` | Aiven PostgreSQL port | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | No |

## 📊 Database Schema

The application uses the following tables:
- `users` - User authentication data
- `profiles` - User profile information with photo storage
- `teams` - Team information
- `registrations` - Tournament registrations
- `contact_messages` - Contact form submissions
- `tournament_config` - Tournament configuration

## 🧪 Testing

Run the test scripts to verify functionality:

```bash
# Test database connection
node scripts/test-database-connection.js

# Test signup modal functionality
node scripts/test-signup-modal.js

# Test full application functionality
node scripts/test-full-functionality.js
```

## 📱 Features Overview

### User Registration
- Modal-based signup form
- Real-time email availability checking
- Password validation and visibility toggle
- Automatic redirect to dashboard

### Dashboard
- User profile overview
- Team statistics
- Player management
- Payment status tracking
- Tournament updates

### Photo Management
- Database-based photo storage (BYTEA)
- Secure photo serving API
- Profile photo upload and display

### Authentication
- JWT-based authentication
- Secure cookie storage
- Protected routes
- Automatic session management

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📁 Project Structure

```
cricket-tournament/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── auth/              # Authentication pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── database.ts       # Database configuration
│   ├── auth.ts           # Authentication utilities
│   └── tournament-config.ts
├── scripts/              # Database and test scripts
├── public/               # Static assets
└── vercel.json           # Vercel configuration
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify Aiven PostgreSQL credentials
   - Check SSL configuration
   - Ensure database is accessible

2. **Build Errors**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `npm install`
   - Check TypeScript errors: `npm run type-check`

3. **Environment Variables**
   - Ensure all required variables are set in Vercel
   - Check variable names and values
   - Redeploy after adding new variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review the documentation

---

**Built with ❤️ using Next.js, TypeScript, and Aiven PostgreSQL**
