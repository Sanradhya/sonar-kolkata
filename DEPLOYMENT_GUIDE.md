# Sonar Kolkata - AWS Deployment Guide

## Quick Start Deployment

I've created deployment scripts for you. Here are your options:

### Option 1: Quick Deployment (Recommended for testing)
This creates a simple S3 static website without CloudFront:

```bash
# Run the quick deployment script
./deploy/scripts/quick-deploy.sh
```

### Option 2: Full Production Deployment
This uses Terraform to create S3 + CloudFront + proper caching:

```bash
# Install Terraform first (if not installed)
# macOS: brew install terraform
# Then run:
./deploy/scripts/deploy.sh
```

### Option 3: Manual Step-by-Step

1. **Build the application:**
   ```bash
   npm install
   npm run build
   ```

2. **Create S3 bucket:**
   ```bash
   aws s3 mb s3://your-bucket-name --region us-east-1
   ```

3. **Configure static website hosting:**
   ```bash
   aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
   ```

4. **Upload files:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name
   ```

## Prerequisites

Before deploying, make sure you have:

1. **AWS CLI installed and configured:**
   ```bash
   aws configure
   ```
   You'll need:
   - AWS Access Key ID
   - AWS Secret Access Key
   - Default region (e.g., us-east-1)

2. **Node.js and npm installed**

3. **Terraform installed (for full deployment):**
   ```bash
   # macOS
   brew install terraform
   
   # Or download from: https://www.terraform.io/downloads
   ```

## Environment Variables

Your application uses these environment variables (already configured in .env):
- `VITE_WALLETCONNECT_PROJECT_ID` - For Web3 wallet connections
- `VITE_CIVIC_CLIENT_ID` - For Civic integration

## Deployment Outputs

After successful deployment, you'll get:
- **S3 Bucket Name** - Where your files are stored
- **Website URL** - Where your app is accessible
- **CloudFront Distribution ID** - For cache invalidation (full deployment only)

## Post-Deployment Steps

1. **Test the application** at the provided URL
2. **Wait 5-10 minutes** for CloudFront propagation (full deployment)
3. **Configure custom domain** (optional)
4. **Set up monitoring** and alerts

## Troubleshooting

### Common Issues:

1. **AWS credentials not configured:**
   ```bash
   aws configure
   ```

2. **Build fails:**
   ```bash
   npm install
   npm run build
   ```

3. **Permission denied on scripts:**
   ```bash
   chmod +x deploy/scripts/*.sh
   ```

4. **Bucket name already exists:**
   - The scripts use timestamps to avoid conflicts
   - If it still fails, edit the bucket name in the script

## Cost Estimation

- **S3 hosting:** ~$1-5/month for typical usage
- **CloudFront:** ~$1-10/month depending on traffic
- **Data transfer:** Varies by usage

## Security Notes

- The quick deployment creates a public S3 bucket
- For production, use the full deployment with CloudFront
- Consider adding WAF for additional security
- Use HTTPS in production (CloudFront provides this)

## Next Steps

After deployment:
1. Set up CI/CD pipeline with GitHub Actions or AWS CodePipeline
2. Configure custom domain and SSL certificate
3. Set up monitoring with CloudWatch
4. Configure backup and disaster recovery