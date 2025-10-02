# Deployment Guide - Theater My Life

This guide will help you deploy the Theater My Life cinema management system to various platforms.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or cloud)
- MoMo account for payments
- Domain name (optional)

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Create a `.env.local` file with all required variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/theater-my-life

# NextAuth.js
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-super-secret-key-here

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# MoMo
MOMO_PARTNER_CODE=your_partner_code
MOMO_ACCESS_KEY=your_access_key
MOMO_SECRET_KEY=your_secret_key

# JWT
JWT_SECRET=your-jwt-secret-key

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# App Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 2. Database Setup
- Set up MongoDB Atlas or your preferred MongoDB hosting
- Update the `MONGODB_URI` in your environment variables
- Run the seeding script after deployment

### 3. MoMo Configuration
- Create a MoMo account and get your partner credentials
- Configure IPN URL to `/api/payments/momo/callback`

### 4. ZaloPay Configuration
- Create a ZaloPay merchant and get `APP_ID`, `KEY1`, `KEY2`
- Set callback to `/api/payments/zalopay/callback`
- Test payments in test mode first

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Steps:
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add all variables from your `.env.local` file
   - Make sure to use production values

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

5. **Custom Domain (Optional)**
   - Go to Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

#### Vercel Configuration
Create `vercel.json` in your project root:
```json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NEXTAUTH_URL": "@nextauth_url"
  }
}
```

### Option 2: Netlify

#### Steps:
1. **Build Configuration**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variables

### Option 3: Railway

#### Steps:
1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Configure Database**
   - Add MongoDB service
   - Copy connection string to environment variables

3. **Deploy**
   - Railway will automatically detect Next.js
   - Add environment variables
   - Deploy

### Option 4: DigitalOcean App Platform

#### Steps:
1. **Create App**
   - Go to DigitalOcean App Platform
   - Create new app from GitHub

2. **Configure**
   - Set build command: `npm run build`
   - Set run command: `npm start`
   - Add environment variables

3. **Add Database**
   - Add MongoDB managed database
   - Connect to your app

### Option 5: Self-Hosted (VPS)

#### Prerequisites
- Ubuntu 20.04+ server
- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy

#### Steps:
1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/theater-my-life.git
   cd theater-my-life
   ```

2. **Install Dependencies**
   ```bash
   npm install
   npm run build
   ```

3. **Setup PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "theater-my-life" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
   Create `/etc/nginx/sites-available/theater-my-life`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/theater-my-life /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

6. **Setup SSL (Let's Encrypt)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free cluster
   - Choose region closest to your users

2. **Configure Access**
   - Create database user
   - Whitelist IP addresses (0.0.0.0/0 for all)
   - Get connection string

3. **Seed Database**
   After deployment, call the seed endpoint:
   ```bash
   curl -X POST https://yourdomain.com/api/seed
   ```

### Self-Hosted MongoDB

1. **Install MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install mongodb
   
   # Start service
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

2. **Configure**
   ```bash
   # Create database
   mongo
   use theater-my-life
   exit
   ```

## 🔐 Security Configuration

### 1. Environment Variables
- Never commit `.env.local` to version control
- Use strong, unique secrets
- Rotate secrets regularly

### 2. HTTPS
- Always use HTTPS in production
- Set up SSL certificates
- Redirect HTTP to HTTPS

### 3. CORS Configuration
Update `next.config.ts`:
```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}
```

### 4. Rate Limiting
Consider adding rate limiting for API routes:
```typescript
// Example with express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## 📊 Monitoring & Analytics

### 1. Application Monitoring
- **Vercel Analytics**: Built-in with Vercel
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and error tracking

### 2. Database Monitoring
- **MongoDB Atlas**: Built-in monitoring
- **MongoDB Compass**: Database management tool

### 3. Performance Monitoring
- **Google PageSpeed Insights**: Performance analysis
- **GTmetrix**: Website speed testing
- **WebPageTest**: Detailed performance testing

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify MongoDB URI format
   - Check network connectivity
   - Verify database credentials

3. **Authentication Issues**
   - Check NEXTAUTH_SECRET is set
   - Verify OAuth provider configuration
   - Check callback URLs

4. **Payment Issues**
   - Verify Stripe keys are correct
   - Check webhook configuration
   - Test with Stripe test mode first

### Debug Mode
Enable debug mode in development:
```env
NEXTAUTH_DEBUG=true
```

## 📈 Performance Optimization

### 1. Image Optimization
- Use Next.js Image component
- Optimize image formats (WebP, AVIF)
- Implement lazy loading

### 2. Code Splitting
- Use dynamic imports for large components
- Implement route-based code splitting
- Optimize bundle size

### 3. Caching
- Implement Redis for session storage
- Use CDN for static assets
- Enable browser caching

## 🔄 Backup Strategy

### 1. Database Backups
- Enable MongoDB Atlas automated backups
- Set up regular backup exports
- Test backup restoration process

### 2. Code Backups
- Use Git for version control
- Regular pushes to remote repository
- Tag releases for easy rollback

### 3. Environment Backups
- Document all environment variables
- Store secrets in secure password manager
- Regular security audits

## 📞 Support

For deployment issues:
- Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment)
- Review platform-specific documentation
- Contact support for your hosting provider

---

**Happy Deploying!** 🚀

Remember to test thoroughly in a staging environment before deploying to production.
