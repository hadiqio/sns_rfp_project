# SNS RFP Generator - Azure VM Deployment Guide

## Prerequisites

- Azure VM with Ubuntu 20.04+ or similar Linux distribution
- Node.js 18+ installed
- PM2 or similar process manager for production
- Nginx for reverse proxy (recommended)
- Azure PostgreSQL database
- Azure AI Foundry resource

## Step 1: Environment Configuration

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Edit the `.env` file with your actual values:
```bash
nano .env
```

## Step 2: Required Environment Variables

### Essential Variables (Must Configure)

| Variable | Description | Example |
|----------|-------------|---------|
| `AZURE_AI_ENDPOINT` | Your Azure AI Foundry endpoint | `https://your-resource.openai.azure.com/` |
| `AZURE_AI_API_KEY` | Your Azure AI API key | `abc123...` |
| `AZURE_DB_PASSWORD` | Your Azure PostgreSQL password | `YourSecurePassword123!` |
| `JWT_SECRET` | Strong random string for JWT signing | Generate using: `openssl rand -base64 64` |
| `EMAIL_USER` | Email address for sending verification emails | `admin@yourdomain.com` |
| `EMAIL_PASSWORD` | Email password or app-specific password | `your-app-password` |

### How to Get Your Azure AI Credentials

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Azure AI Foundry resource
3. Go to "Keys and Endpoint" section
4. Copy the endpoint URL and one of the API keys
5. Check your deployment name (usually `gpt-4o`, `gpt-4`, or `gpt-35-turbo`)

### How to Set Up Email Authentication

For Gmail:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use your Gmail address and the generated app password

## Step 3: Database Setup

Your Azure PostgreSQL database should already be configured with these settings:
- Host: `snsrfpdb.postgres.database.azure.com`
- User: `user`
- Database: `postgres`
- Port: `5432`
- SSL: Required

Run database migrations:
```bash
npm run db:push
```

## Step 4: Application Deployment

### Option A: Direct Node.js (Development/Testing)

1. Install dependencies:
```bash
npm install
```

2. Build the application:
```bash
npm run build
```

3. Start the application:
```bash
npm start
```

### Option B: PM2 (Recommended for Production)

1. Install PM2 globally:
```bash
npm install -g pm2
```

2. Create PM2 ecosystem file:
```bash
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'sns-rfp-generator',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF
```

3. Start with PM2:
```bash
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 5: Nginx Configuration (Optional but Recommended)

Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/sns-rfp-generator
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
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

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/sns-rfp-generator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 6: SSL Certificate (Recommended)

Install Let's Encrypt certificate:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Step 7: Firewall Configuration

Allow necessary ports:
```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## Step 8: Monitoring and Logs

Monitor the application:
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs sns-rfp-generator

# System logs
sudo journalctl -f -u nginx
```

## Troubleshooting

### Common Issues

1. **Azure AI Connection Failed**
   - Verify your endpoint URL format
   - Check API key validity
   - Ensure deployment name matches your Azure resource

2. **Database Connection Error**
   - Verify Azure PostgreSQL credentials
   - Check firewall rules in Azure
   - Ensure SSL is properly configured

3. **Email Sending Failed**
   - Verify email credentials
   - Check if using app-specific password for Gmail
   - Ensure less secure app access is enabled (if applicable)

### Health Checks

Test your deployment:
```bash
# Test Azure AI connection
curl http://localhost:5000/api/ai/test

# Test database connection
curl http://localhost:5000/api/stats

# Test application health
curl http://localhost:5000/api/health
```

## Security Recommendations

1. **Environment Variables**: Never commit `.env` file to version control
2. **Database**: Use strong passwords and enable SSL
3. **API Keys**: Rotate keys regularly
4. **Firewall**: Only open necessary ports
5. **Updates**: Keep system and dependencies updated
6. **Monitoring**: Set up log monitoring and alerts

## Performance Optimization

1. **Enable compression** in Nginx
2. **Configure caching** for static assets
3. **Set up monitoring** with tools like New Relic or DataDog
4. **Database indexing** for better query performance
5. **CDN integration** for global content delivery

## Backup Strategy

1. **Database backups**: Use Azure PostgreSQL automated backups
2. **Application files**: Regular file system backups
3. **Environment configuration**: Secure backup of `.env` file
4. **SSL certificates**: Backup certificate files

For support or issues, contact the development team.