# Bright Solutions - Deployment Guide

## Deployment Overview

This guide covers deploying Bright Solutions to production across multiple platforms. Choose based on your infrastructure preferences.

---

## Option 1: Docker Deployment (Recommended)

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+
- Git

### Step 1: Prepare Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 2: Clone Repository

```bash
git clone <your-repo-url> bright-solutions
cd bright-solutions
```

### Step 3: Configure Environment

```bash
# Create .env file for backend
cat > backend/.env << 'EOF'
DATABASE_URL="postgresql://bright_user:secure_password@postgres:5432/bright_solutions"
JWT_SECRET="$(openssl rand -base64 32)"
PORT=3000
NODE_ENV=production
FRONTEND_URL="https://yourdomain.com"
EOF

# Create .env for frontend (if needed)
cat > frontend/.env.production << 'EOF'
VITE_API_URL="https://api.yourdomain.com"
EOF
```

### Step 4: Update Docker Compose

Edit `docker-compose.yml`:
```yaml
services:
  postgres:
    environment:
      POSTGRES_PASSWORD: "secure_password"  # Change this
```

### Step 5: Deploy

```bash
# Build and start containers
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Initialize database (first time only)
docker-compose exec backend npx prisma migrate deploy
```

### Step 6: Setup Reverse Proxy (Nginx)

```bash
# Install Nginx
sudo apt install nginx -y

# Create SSL certificate (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot certonly --nginx -d yourdomain.com -d api.yourdomain.com

# Configure Nginx
sudo tee /etc/nginx/sites-available/bright-solutions > /dev/null <<EOF
upstream backend {
    server localhost:3000;
}

upstream frontend {
    server localhost:5173;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}

server {
    listen 443 ssl;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/bright-solutions /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Option 2: Vercel (Frontend) + Railway (Backend)

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repo
   - Select "frontend" as root directory
   - Environment variables:
     ```
     VITE_API_URL=https://api.yourdomain.com
     ```
   - Deploy

### Backend Deployment (Railway)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Deploy Backend**
   - Create new project
   - Select "Deploy from GitHub"
   - Choose your repo
   - Add PostgreSQL plugin
   - Configure variables:
     ```
     JWT_SECRET=<random-secret>
     NODE_ENV=production
     PORT=3000
     FRONTEND_URL=https://yourdomain.com
     ```

3. **Database Setup**
   - Railway automatically creates PostgreSQL
   - Copy `DATABASE_URL` to environment
   - Run migrations:
     ```bash
     railway run npx prisma migrate deploy
     ```

### Update Frontend URL

In Vercel dashboard:
- Go to Settings > Environment Variables
- Update `VITE_API_URL` with Railway backend URL

---

## Option 3: AWS Deployment

### Using Elastic Beanstalk

#### Backend (Node.js)

1. **Prepare Application**
   ```bash
   cd backend
   npm run build
   # Create .ebextensions/nodejs.config
   mkdir -p .ebextensions
   ```

2. **Create EB Config**
   ```yaml
   # .ebextensions/nodejs.config
   option_settings:
     aws:elasticbeanstalk:application:environment:
       NODE_ENV: production
       JWT_SECRET: your-secret-key
       DATABASE_URL: your-rds-endpoint
   ```

3. **Deploy**
   ```bash
   eb init -p "Node.js 18" --region us-east-1
   eb create bright-solutions-env
   eb deploy
   ```

#### Frontend (S3 + CloudFront)

1. **Build**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to S3**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name/
   ```

3. **Create CloudFront Distribution**
   - Origin: S3 bucket
   - Default root object: index.html
   - Add SSL certificate

---

## Option 4: DigitalOcean App Platform

### Deploy Full Stack

1. **Prepare Repository**
   - Push code to GitHub
   - Ensure Dockerfiles are present

2. **Create on DigitalOcean**
   - Go to App Platform
   - Click "Create App"
   - Select GitHub repo
   - Configure:
     - **Service 1 (Backend)**
       - Docker
       - buildpack: Dockerfile
       - Environment variables
     - **Service 2 (Frontend)**
       - Docker
       - buildpack: Dockerfile
       - Environment variables
     - **Database**
       - PostgreSQL 15
       - Managed database

3. **Deploy**
   - Review configuration
   - Click "Deploy"

---

## Option 5: Self-Hosted on Ubuntu Server

### Full Manual Setup

```bash
# 1. Install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl wget nodejs npm postgresql postgresql-contrib nginx certbot python3-certbot-nginx

# 2. Clone repo
git clone <repo-url> /opt/bright-solutions
cd /opt/bright-solutions

# 3. Install npm packages
npm run install-all

# 4. Setup PostgreSQL
sudo -u postgres createdb bright_solutions
sudo -u postgres createuser bright_user
sudo -u postgres psql -c "ALTER USER bright_user WITH PASSWORD 'secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE bright_solutions TO bright_user;"

# 5. Build application
npm run build

# 6. Create systemd service
sudo tee /etc/systemd/system/bright-solutions.service > /dev/null <<EOF
[Unit]
Description=Bright Solutions Waste Management
After=postgresql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/bright-solutions
Environment="PATH=/usr/bin:/usr/local/bin"
Environment="NODE_ENV=production"
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# 7. Start service
sudo systemctl daemon-reload
sudo systemctl enable bright-solutions
sudo systemctl start bright-solutions

# 8. Configure Nginx (as shown in Docker section)
# 9. Setup SSL with Let's Encrypt
# 10. Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Database Backups

### Automated Backups

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups"
DB_NAME="bright_solutions"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
pg_dump $DB_NAME | gzip > $BACKUP_DIR/bright_solutions_$TIMESTAMP.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "bright_solutions_*.sql.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_DIR/bright_solutions_$TIMESTAMP.sql.gz"
```

Add to crontab:
```bash
0 2 * * * /opt/bright-solutions/backup.sh
```

### Restore from Backup

```bash
# Stop application
docker-compose down

# Restore database
gunzip -c backup.sql.gz | psql bright_solutions

# Restart
docker-compose up -d
```

---

## Monitoring & Logging

### Application Monitoring

```bash
# Docker logs
docker-compose logs -f backend

# System metrics
docker stats

# Database logs
docker-compose logs postgres
```

### Uptime Monitoring

Use services like:
- UptimeRobot (free tier available)
- Pingdom
- Datadog

### Log Aggregation

Setup ELK Stack or use:
- CloudWatch (AWS)
- Loggly
- LogRocket

---

## Environment Variables Checklist

Required for production:
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `JWT_SECRET` - Long random string (32+ chars)
- [ ] `NODE_ENV` - Set to "production"
- [ ] `FRONTEND_URL` - Your frontend domain
- [ ] `PORT` - Server port (usually 3000)

Optional:
- [ ] `SMTP_HOST` - For email notifications
- [ ] `SMTP_PASSWORD` - Email service password
- [ ] `AWS_ACCESS_KEY_ID` - For S3 storage
- [ ] `AWS_SECRET_ACCESS_KEY` - For S3 storage

---

## SSL/TLS Certificate

### Using Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com -d api.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## Scaling Considerations

### Horizontal Scaling
1. Multiple backend instances behind load balancer
2. Database replication for high availability
3. CDN for static assets (CloudFront, Cloudflare)

### Vertical Scaling
1. Increase server resources (CPU, RAM)
2. Database optimization with indexing
3. Redis caching layer

### Performance Optimization
1. Enable gzip compression
2. Minify and bundle assets
3. Database query optimization
4. API rate limiting
5. CDN for assets

---

## Post-Deployment Checklist

- [ ] Test application thoroughly
- [ ] Verify all endpoints accessible
- [ ] Check database connectivity
- [ ] Test file uploads (if applicable)
- [ ] Verify email notifications work
- [ ] Setup monitoring and alerts
- [ ] Configure automated backups
- [ ] Test backup restoration
- [ ] Setup SSL certificates
- [ ] Configure CORS properly
- [ ] Test payment processing (if applicable)
- [ ] Load testing for performance
- [ ] Security audit
- [ ] GDPR/Privacy compliance check

---

## Troubleshooting Deployment

### Application won't start
```bash
# Check logs
docker-compose logs backend

# Verify environment variables
docker-compose config | grep -A 20 backend

# Test database connection
docker-compose exec backend node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"
```

### Database migration failed
```bash
# Reset and re-migrate (development only)
docker-compose exec backend npx prisma migrate reset

# Or deploy existing schema
docker-compose exec backend npx prisma migrate deploy
```

### High memory usage
```bash
# Check container stats
docker stats

# Review application logs for memory leaks
docker-compose logs --tail=100 backend | grep -i memory
```

---

## Support

For deployment issues:
1. Check logs: `docker-compose logs`
2. Review environment variables
3. Test database connectivity
4. Check network/firewall rules
5. Consult platform-specific docs
6. Open an issue on GitHub

---

Last Updated: 2024
