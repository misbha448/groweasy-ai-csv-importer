# Frontend Deployment Checklist

## Pre-Deployment

- [ ] Review `.env` variables match your environment
- [ ] Run `npm run build` successfully
- [ ] Test production build locally: `npm run start`
- [ ] Verify all components render correctly
- [ ] Check responsive design on mobile devices
- [ ] Test file upload functionality
- [ ] Verify Toast notifications work
- [ ] Check error handling

## Environment Setup

- [ ] Set `NEXT_PUBLIC_API_URL` to your backend URL
- [ ] Configure authentication if needed
- [ ] Set up analytics tracking (optional)
- [ ] Configure any third-party services

## Vercel Deployment

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel deploy --prod

# 4. Set environment variables in Vercel dashboard
# NEXT_PUBLIC_API_URL=https://your-api.com/api
```

## Docker Deployment

```bash
# Build Docker image
docker build -t groweasy-importer:latest .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:3001/api \
  groweasy-importer:latest

# Or use Docker Compose
docker-compose up -d
```

## Performance Optimization

- [ ] Enable gzip compression on server
- [ ] Configure CDN for static assets
- [ ] Set up image optimization
- [ ] Monitor Core Web Vitals
- [ ] Enable caching headers

## Security Checklist

- [ ] Enable HTTPS/TLS
- [ ] Set security headers (CSP, X-Frame-Options, etc.)
- [ ] Protect API endpoints with authentication
- [ ] Sanitize user inputs
- [ ] Enable rate limiting on API
- [ ] Regular dependency updates

## Monitoring

- [ ] Set up error logging (Sentry, etc.)
- [ ] Monitor application performance
- [ ] Set up uptime monitoring
- [ ] Configure alerting for errors
- [ ] Track user analytics

## Post-Deployment

- [ ] Verify app is running
- [ ] Test all features in production
- [ ] Check browser console for errors
- [ ] Monitor server logs
- [ ] Smoke test on mobile devices
- [ ] Test file upload functionality
- [ ] Verify API connectivity
