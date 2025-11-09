# Deployment Guide - FDA Compliance AI

## 🚀 Deployment Options

Choose your preferred platform and follow the instructions below.

---

## Option 1: Vercel (RECOMMENDED) ⭐

**Why Vercel?**
- Optimized for React/Vite
- Automatic deployments from Git
- Free tier included
- Lightning-fast performance
- Built-in CI/CD

### Setup Steps

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. For production
vercel --prod
```

### GitHub Integration (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial React conversion"
git push origin main

# 2. Go to https://vercel.com/dashboard
# 3. Click "New Project"
# 4. Import from GitHub
# 5. Select your repository
# 6. Click Deploy

# Auto-deployments on every push!
```

### Environment Variables

Create `.env.local`:
```
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key_here
```

### Performance Metrics

- Build time: ~2 minutes
- Bundle size: ~66 KB (gzipped)
- CDN latency: <50ms globally

---

## Option 2: Netlify

**Why Netlify?**
- Simple drag-and-drop deployment
- Excellent React support
- Free SSL certificates
- Edge functions for serverless

### Setup Steps

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build locally
npm run build

# 3. Deploy
netlify deploy --prod --dir=dist
```

### Connect to GitHub

```bash
# 1. Go to https://app.netlify.com
# 2. Click "New site from Git"
# 3. Choose GitHub repository
# 4. Configure build settings:
#    - Build command: npm run build
#    - Publish directory: dist
# 5. Deploy!
```

### netlify.toml Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[env.production]
  variable1 = "value1"
```

---

## Option 3: AWS Amplify

**Why AWS?**
- Enterprise-grade infrastructure
- Scalable globally
- Integrated with other AWS services
- Pay-as-you-go pricing

### Setup Steps

```bash
# 1. Install Amplify CLI
npm install -g @aws-amplify/cli

# 2. Configure Amplify
amplify configure

# 3. Initialize project
amplify init

# 4. Add hosting
amplify add hosting
# Select: Hosting with Amplify Console
# Select: Manual or CI/CD

# 5. Publish
amplify publish
```

### GitHub Integration

```bash
# In AWS Amplify Console:
# 1. Connect GitHub repo
# 2. Set build settings:
#    - Build command: npm run build
#    - Build output directory: dist
# 3. Deploy!
```

---

## Option 4: Docker + Cloud Run (Google Cloud)

**Why Google Cloud?**
- Container-based deployment
- Highly scalable
- Pay per use
- Easy backend integration

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

ENV PORT=8080
EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
```

### Deploy to Google Cloud Run

```bash
# 1. Build Docker image
docker build -t fda-compliance-ai .

# 2. Tag for Google Container Registry
docker tag fda-compliance-ai gcr.io/YOUR_PROJECT_ID/fda-compliance-ai

# 3. Push to registry
docker push gcr.io/YOUR_PROJECT_ID/fda-compliance-ai

# 4. Deploy to Cloud Run
gcloud run deploy fda-compliance-ai \
  --image gcr.io/YOUR_PROJECT_ID/fda-compliance-ai \
  --region us-central1 \
  --allow-unauthenticated
```

---

## Option 5: Traditional Hosting (cPanel, Shared Hosting)

### Build and Upload

```bash
# 1. Build production bundle
npm run build

# 2. Upload dist/ folder to public_html
# Use FTP or File Manager

# 3. Create .htaccess for React routing
cat > public_html/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOF

# 4. Done!
```

---

## Option 6: Self-Hosted VPS (DigitalOcean, Linode)

### Ubuntu/Debian Setup

```bash
# 1. SSH into server
ssh root@your_server_ip

# 2. Update system
apt update && apt upgrade -y

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# 4. Install PM2 (process manager)
npm install -g pm2

# 5. Clone repository
git clone https://github.com/yourusername/fda-compliance-ai.git
cd fda-compliance-ai

# 6. Install dependencies
npm install

# 7. Build
npm run build

# 8. Start with PM2
pm2 start "npm run preview" --name "fda-compliance"
pm2 startup
pm2 save

# 9. Install Nginx reverse proxy
apt install -y nginx

# 10. Configure Nginx
cat > /etc/nginx/sites-available/fda-compliance << 'EOF'
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:4173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# 11. Enable site
ln -s /etc/nginx/sites-available/fda-compliance /etc/nginx/sites-enabled/

# 12. Install SSL certificate
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your_domain.com

# 13. Start Nginx
systemctl restart nginx
```

---

## 🔄 CI/CD Pipeline Setup

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          production: true
```

### Setup GitHub Secrets

```bash
# In GitHub repository settings → Secrets → New secret

# Add these secrets:
VERCEL_TOKEN        # From vercel.com/account/tokens
VERCEL_ORG_ID       # From Vercel dashboard
VERCEL_PROJECT_ID   # From Vercel project settings
```

---

## 📊 Comparison Table

| Platform | Setup Time | Cost | Scaling | Best For |
|----------|-----------|------|---------|----------|
| **Vercel** | 5 min | Free/Pay | Excellent | Production |
| **Netlify** | 5 min | Free/Pay | Good | Static sites |
| **AWS** | 15 min | Pay | Excellent | Enterprise |
| **Google Cloud** | 20 min | Pay | Excellent | Containers |
| **cPanel** | 10 min | Low | Limited | Small apps |
| **VPS** | 30 min | Low | Good | Full control |

---

## 🔒 Security Checklist

- [ ] Enable HTTPS (automatic on most platforms)
- [ ] Set environment variables securely
- [ ] Use API keys only in backend
- [ ] Enable rate limiting
- [ ] Add CORS headers
- [ ] Validate file uploads
- [ ] Keep dependencies updated
- [ ] Enable security headers
- [ ] Monitor error logs
- [ ] Backup regularly

---

## 📈 Performance Optimization

### Before Deployment

```bash
# 1. Optimize build
npm run build

# 2. Analyze bundle
npm run build -- --analyze

# 3. Check file sizes
ls -lh dist/
```

### Caching Strategy

Set cache headers in your platform:

```
- HTML: no-cache (always check for updates)
- CSS/JS: max-age=31536000 (cache for 1 year)
- Images: max-age=604800 (cache for 1 week)
```

### CDN Setup

- All platforms above include CDN
- Files served from closest edge location
- Typical latency: <50ms worldwide

---

## 🆘 Common Issues & Solutions

### Issue: Build fails with "Memory exceeded"

```bash
# Solution: Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Issue: CSS not loading after deploy

```bash
# Solution: Check Tailwind config paths
# tailwind.config.js must include:
content: ["./src/**/*.{js,jsx}"]
```

### Issue: React Router shows 404

```bash
# Solution: Add redirect rules
# For Vercel: Create vercel.json
# For Netlify: Add _redirects file
# For others: Configure web server rewrites
```

### Issue: Images not loading

```bash
# Solution: Use correct paths in imports
import logo from '/logo.svg'  // ✗ Wrong
import logo from './assets/logo.svg'  // ✓ Correct

// In JSX
<img src={logo} alt="logo" />  // ✓ Works
```

---

## 🚀 Post-Deployment

### Monitor Performance

```bash
# Check Core Web Vitals
# Use: https://pagespeed.web.dev

# Set up error tracking
# Use: Sentry, LogRocket, or similar
```

### Setup Analytics

```javascript
// Add Google Analytics
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Automated Testing

```bash
# Install testing library
npm install -D @testing-library/react vitest

# Create test files
npm run test
```

---

## 📞 Platform Support Links

- **Vercel:** https://vercel.com/support
- **Netlify:** https://support.netlify.com
- **AWS:** https://aws.amazon.com/support
- **Google Cloud:** https://cloud.google.com/support
- **DigitalOcean:** https://www.digitalocean.com/support

---

## ✅ Final Checklist

- [ ] Code committed to Git
- [ ] Environment variables configured
- [ ] Build tested locally
- [ ] Performance optimized
- [ ] Security headers set
- [ ] Analytics configured
- [ ] Error tracking enabled
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Team has deployment access

---

**Recommended Path for Production:**

```
Development → Vercel Preview → Vercel Production
              (Auto on PR)      (Auto on merge)
```

This gives you immediate feedback, easy rollbacks, and production parity!

---

**Version:** 1.0.0  
**Last Updated:** November 2024
