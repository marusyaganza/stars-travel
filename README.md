# Stars Travel - Star Wars Flight BookingUpstash Redis

Welcome to the galaxy's most secure and intelligent flight booking system! 🚀 This Star Wars-themed application lets you book intergalactic flights to planets like Tatooine, Coruscant, and Endor using iconic starships like the Millennium Falcon and X-wing fighters. But here's the twist – it's not just about booking flights! The app features an AI-powered chatbot where you can chat with Master Yoda (who speaks in his signature backwards wisdom) or the ever-polite protocol droid C-3PO. Want to know about the Force? Ask Yoda! Need help with booking procedures? C-3PO has got you covered! The entire experience is wrapped in enterprise-grade security (because even in a galaxy far, far away, you need CSRF protection), lightning-fast performance with Redis caching, and real-time rate limiting to prevent any Sith Lords from overwhelming the system. It's like having a travel agency, AI assistant, and security fortress all rolled into one epic space adventure! ✨

![Star Wars Flight Booking App Screenshot](docs/screenshot.png)

## 🚀 **Project Highlights**

- **Modern Full-Stack Architecture**: Built with Next.js 15+ App Router, TypeScript, and PostgreSQL
- **Enterprise Security**: Comprehensive CSRF protection, JWT authentication, and rate limiting
- **Production-Ready Caching**: Redis-based caching layer
- **Advanced Testing**: Unit tests (Vitest) and E2E tests (Playwright)
- **Performance Optimized**: Database query optimization, caching strategies, and responsive design
- **Developer Experience**: ESLint, Prettier, TypeScript strict mode, and automated testing workflows
- **AI Integration**: Powered by OpenAI API Interactive Star Wars chatbot with character-based responses and authentication-aware functionality

## 🔑 **Environment Variables & API Keys**

This project requires several API keys and environment variables for full functionality:

### **Required for Core Functionality**

- **`DATABASE_URL`**: PostgreSQL connection string
- **`JWT_SECRET`**: Secret key for JWT token signing
- **`CSRF_SECRET`**: Secret key for CSRF token generation

### **Required for AI Features**

- **`OPENAI_API_KEY`**: OpenAI API key for chatbot functionality
- **`NEXT_PUBLIC_ENABLE_CHATBOT`**: Feature flag to enable/disable chatbot

### **Required for Production Features**

- **`UPSTASH_REDIS_REST_URL`**: Upstash Redis REST API URL for rate limiting and caching
- **`UPSTASH_REDIS_REST_TOKEN`**: Upstash Redis REST API token
- **`BETTER_STACK_API_KEY`**: Better Stack API key for centralized logging
- **`LOG_ENDPOINT`**: Better Stack log endpoint URL

### **Optional Configuration**

- **`NEXT_PUBLIC_APP_URL`**: Application URL (defaults to localhost:3000)
- **`GOOGLE_SITE_VERIFICATION`**: Google Search Console verification code
- **`NODE_ENV`**: Environment mode (development/production)

### **Getting API Keys**

1. **OpenAI**: Sign up at [OpenAI Platform](https://platform.openai.com/) and create an API key
2. **Upstash Redis**: Create a free account at [Upstash](https://upstash.com/) and create a Redis database
3. **Better Stack**: Sign up at [Better Stack](https://betterstack.com/) and create a log source
4. **PostgreSQL**: Use Docker (included in setup) or create a cloud database

## 🚀 **Live Deployment**

This project is currently deployed and running in production on **Vercel**:

- **Live Demo**: [Project URL](https://stars-travel.vercel.app/)
- **Production Environment**: Fully configured with all security features, rate limiting, and AI integration
- **Performance Monitoring**: Real-time monitoring and logging through Better Stack
- **Auto-Deployments**: Connected to GitHub for automatic deployments on code changes

## Security Features

### CSRF Protection

This application implements CSRF (Cross-Site Request Forgery) protection for all authentication actions:

- **Sign In**: Protected with CSRF tokens
- **Sign Up**: Protected with CSRF tokens
- **Sign Out**: Protected with CSRF tokens

#### How it works:

1. CSRF tokens are generated server-side using cryptographically secure random bytes
2. Tokens include a timestamp and HMAC signature for validation
3. Tokens are stored in httpOnly cookies and included in forms as hidden fields
4. All authentication actions validate the CSRF token before processing
5. Tokens expire after 24 hours for security

#### Environment Variables:

- `CSRF_SECRET`: Secret key for CSRF token signing (falls back to JWT_SECRET)
- `JWT_SECRET`: Secret key for JWT tokens

### Rate Limiting

This application implements comprehensive rate limiting using **@upstash/ratelimit** with **Vercel KV** for distributed, production-ready rate limiting:

- **Sign In**: 5 attempts per 15 minutes
- **Sign Up**: 3 attempts per hour
- **General Auth**: 10 attempts per 15 minutes
- **CSRF Tokens**: 20 requests per 15 minutes

#### How it works:

1. **Distributed Rate Limiting**: Uses Redis for cross-server rate limit tracking
2. **IP-based Tracking**: Rate limits are tracked by client IP address
3. **Sliding Window**: Implements sliding window rate limiting algorithm
4. **Real-time Headers**: Rate limit information included in response headers
5. **HTTP 429 Responses**: Exceeded limits return proper status codes
6. **Analytics**: Built-in analytics for monitoring rate limit usage

#### Rate Limit Headers:

- `X-RateLimit-Remaining`: Number of requests remaining in current window
- `X-RateLimit-Reset`: Timestamp when the rate limit resets

#### API Endpoints:

- `/api/rate-limit`: Get current rate limit status for all endpoints
- `/api/health`: Health check including Redis and rate limiting status

#### Environment Variables:

- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST API URL
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST API token

#### Configuration:

Rate limits can be adjusted in `lib/auth/rateLimit.ts` under `RATE_LIMIT_CONFIGS`.

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Yarn package manager

### Database Setup

1. **Start PostgreSQL** (using Docker):

```bash
docker run -d \
  --name postgres-db \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15
```

Example connection string:
`postgres://username:password@postgres:5432/database-name`

2. **Configure environment variables**:

```bash
cp env.example .env
# Edit .env with your database credentials
```

3. **Setup database**:

```bash
yarn generate-types    # Generate Prisma client
yarn push-db          # Push schema to database
yarn seed             # Seed planets and starships
yarn seedFlights      # Seed sample flights
```

### Development Server

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run e2e tests
- `yarn seed` - Seed planets and starships
- `yarn seedFlights` - Seed sample flights

## Testing

### Unit Tests

Run unit tests with Vitest:

```bash
yarn test              # Run all tests
yarn test:watch        # Run tests in watch mode
yarn test:ui           # Run tests with UI
yarn test:coverage     # Run tests with coverage
```

### End-to-End Tests

For detailed e2e testing information, see [tests/e2e/README.md](tests/e2e/README.md).
