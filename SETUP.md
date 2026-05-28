# Setup Guide for NexusReflect Development

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp apps/web/.env.example apps/web/.env
   ```

3. **Configure your environment variables** in `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/nexusreflect"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   OPENAI_API_KEY="your-openai-api-key"
   MIDTRANS_SERVER_KEY="your-midtrans-server-key"
   MIDTRANS_IS_PRODUCTION="false"
   ```

4. **Set up database**:
   ```bash
   cd apps/web
   npm run db:generate
   npm run db:push  # For development, creates tables
   ```

5. **Run development server**:
   ```bash
   npm run dev
   ```

## Demo Accounts

For testing purposes, you can sign in with any email and password combination.

## Database Setup

### PostgreSQL Database

1. Install PostgreSQL locally or use a service like Supabase/PlanetScale
2. Create a new database:
   ```sql
   CREATE DATABASE nexusreflect;
   ```
3. Update your `DATABASE_URL` in `.env`

### Sample Data Import

The application starts with empty data. You can create sample entries through the UI:

1. Sign in with any account
2. Navigate to each module (Journal, Mirror, Manifestation)
3. Create sample entries to test functionality

## Key Features to Test

1. **Authentication**:
   - Sign in/out flow
   - Session persistence
   - Protected routes

2. **Navigation**:
   - Switch between modules
   - Mobile responsiveness
   - Active state indicators

3. **Journal Module**:
   - Create new entries
   - Add mood tags
   - Future letters
   - Love letters

4. **Mirror Module**:
   - AI analysis (requires OpenAI key)
   - Pattern tracking
   - Identity scripts

5. **Manifestation Module**:
   - Set intentions
   - Track evidence
   - 30-day challenges

## Development Workflow

### Adding New Features

1. Create new pages in `apps/web/src/app/`
2. Use existing UI components
3. Follow the established patterns

### Making Changes

1. Edit files directly
2. The dev server will hot-reload
3. Check browser console for errors

### Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Database Connection Issues

- Check if PostgreSQL is running
- Verify DATABASE_URL
- Ensure database exists

### Authentication Issues

- Check NEXTAUTH_SECRET
- Verify NEXTAUTH_URL
- Clear browser cookies

### AI Analysis Issues

- Verify OPENAI_API_KEY
- Check API quota
- Ensure internet connection

## Next Steps

1. Set up real user authentication (add password hashing)
2. Implement subscription management
3. Add payment processing with Midtrans
4. Create comprehensive documentation
5. Set up CI/CD pipeline