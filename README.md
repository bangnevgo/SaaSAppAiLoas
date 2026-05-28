# NexusReflect - Unified SaaS Platform

A powerful, integrated platform that combines three personal growth applications into one cohesive experience.

## Applications Included

### 1. Journal
- Personal journaling with mood tracking
- Future letters to your future self
- Love letters with sharing capabilities
- Prompts and reflection aids

### 2. Mirror
- AI-powered self-concept analysis
- Pattern recognition and tracking
- Identity script generation
- Based on Neville Goddard's philosophy

### 3. Manifestation
- Intention setting and tracking
- Evidence vault for manifestations
- 30-day challenge programs
- Doubt reset protocols

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **AI**: OpenAI GPT-4 API
- **Payment**: Midtrans (Indonesian market)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Midtrans account (for payment processing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd unified-saas-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp apps/web/.env.example apps/web/.env
# Edit .env with your credentials
```

4. Set up the database:
```bash
cd apps/web
npm run db:generate
npm run db:migrate
```

5. Run the development server:
```bash
npm run dev
```

## Project Structure

```
unified-saas-platform/
├── apps/
│   └── web/                 # Main web application
│       ├── src/
│       │   ├── app/         # Next.js app router
│       │   ├── components/  # React components
│       │   ├── lib/        # Utilities and configurations
│       │   └── types/      # TypeScript definitions
│       └── prisma/          # Database schema
├── packages/
│   └── ui/                  # Shared UI components
└── docs/                    # Documentation
```

## Features

### Unified Navigation
- Seamless switching between applications
- Consistent user experience
- Mobile-responsive design

### Authentication
- NextAuth.js integration
- Session management
- OAuth providers support

### Database
- Unified schema supporting all applications
- PostgreSQL for scalability
- Prisma ORM for type safety

### AI Integration
- OpenAI GPT-4 for analysis
- Cross-application insights
- Pattern recognition

### Payment System
- Midtrans integration
- Subscription management
- IDR pricing support

## Development

### Adding New Features

1. Create new pages in the appropriate app directory
2. Use shared UI components from `packages/ui`
3. Follow the existing patterns and conventions

### Database Changes

1. Update `prisma/schema.prisma`
2. Run migrations:
```bash
npm run db:migrate
```

### Building for Production

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.