# Deployment Guide - Sonar Kolkata

## Overview

This guide provides comprehensive instructions for deploying the Sonar Kolkata application to AWS using the infrastructure and deployment scripts created with Kiro's assistance.

## Prerequisites

### Required Tools
- **Node.js 18+** - For building the React application
- **npm** - Package manager for dependencies
- **AWS CLI** - For AWS resource management
- **Terraform** (optional) - For Infrastructure as Code deployment

### AWS Account Setup
1. **AWS Account** with appropriate permissions
2. **IAM User** with programmatic access
3. **Required Permissions**:
   - S3 bucket creation and management
   - CloudFront distribution management
   - IAM role creation (for Terraform)

### Environment Variables
```bash
# Required for Web3 functionality
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_CIVIC_CLIENT_ID=your_civic_client_id

# Optional for deployment
AWS_REGION=us-east-1
ENVIRONMENT=prod
```

## Deployment Options

### Option 1: Quick Deployment (Recommended for Testing)

This method creates a simple S3 static website without CloudFront CDN.

```bash
# 1. Build the application
npm install
npm run build

# 2. Run quick deployment script
./deploy/scripts/quick-deploy.sh
```

**What it creates:**
- S3 bucket with static website hosting
- Public read access for website files
- Basic error handling for SPA routing

**Output:**
```
🎉 Quick deployment completed successfully!
🌐 Your application is available at: http://sonar-kolkata-frontend-20241228-143022.s3-website-us-east-1.amazonaws.com
```

### Option 2: Production Deployment with Terraform

This method creates a complete production infrastructure with CDN, caching, and security.

```bash
# 1. Install Terraform (if not installed)
# macOS: brew install terraform
# Ubuntu: sudo apt-get install terraform

# 2. Build the application
npm install
npm run build

# 3. Run full deployment script
./deploy/scripts/deploy.sh
```

**What it creates:**
- S3 bucket with versioning and encryption
- CloudFront distribution with global CDN
- Origin Access Identity for security
- Custom error pages for SPA routing
- Proper caching headers and compression

### Option 3: Manual Deployment

For custom configurations or learning purposes.

#### Step 1: Build Application
```bash
npm install
npm run build
```

#### Step 2: Create S3 Bucket
```bash
# Create bucket (replace with unique name)
aws s3 mb s3://your-unique-bucket-name --region us-east-1

# Configure static website hosting
aws s3 website s3://your-unique-bucket-name \
  --index-document index.html \
  --error-document index.html
```

#### Step 3: Upload Files
```bash
# Sync built files to S3
aws s3 sync dist/ s3://your-unique-bucket-name --delete

# Set proper content types
aws s3 cp s3://your-unique-bucket-name s3://your-unique-bucket-name \
  --recursive --metadata-directive REPLACE \
  --content-type "text/html" --exclude "*" --include "*.html"
```

#### Step 4: Configure Public Access
```bash
# Create bucket policy for public read access
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-unique-bucket-name/*"
        }
    ]
}
EOF

# Apply bucket policy
aws s3api put-bucket-policy --bucket your-unique-bucket-name --policy file://bucket-policy.json
```

## Infrastructure Details

### S3 Configuration
```hcl
resource "aws_s3_bucket" "website" {
  bucket = "${var.project_name}-frontend-${var.environment}-${random_string.bucket_suffix.result}"
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"  # SPA routing support
  }
}
```

### CloudFront Configuration
```hcl
resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.website.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.website.cloudfront_access_identity_path
    }
  }

  # SPA routing support
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }
}
```

## Environment Management

### Development Environment
```bash
# Deploy to development
ENVIRONMENT=dev ./deploy/scripts/deploy.sh
```

### Staging Environment
```bash
# Deploy to staging
ENVIRONMENT=staging ./deploy/scripts/deploy.sh
```

### Production Environment
```bash
# Deploy to production
ENVIRONMENT=prod ./deploy/scripts/deploy.sh
```

## Post-Deployment Steps

### 1. Verify Deployment
```bash
# Check if site is accessible
curl -I https://your-cloudfront-domain.cloudfront.net

# Verify SPA routing works
curl -I https://your-cloudfront-domain.cloudfront.net/map
```

### 2. Test Web3 Functionality
1. Open the deployed application
2. Click "Connect Wallet" button
3. Verify MetaMask appears in wallet selection
4. Test wallet connection and network switching

### 3. Performance Testing
```bash
# Use Lighthouse for performance audit
npx lighthouse https://your-domain.com --output html --output-path ./lighthouse-report.html
```

### 4. Security Verification
- Verify HTTPS is working
- Check Content Security Policy headers
- Test for common vulnerabilities

## Monitoring & Maintenance

### CloudWatch Monitoring
```bash
# View CloudFront metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name Requests \
  --dimensions Name=DistributionId,Value=YOUR_DISTRIBUTION_ID \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-02T00:00:00Z \
  --period 3600 \
  --statistics Sum
```

### Log Analysis
```bash
# Enable CloudFront logging (optional)
aws cloudfront put-distribution-config \
  --id YOUR_DISTRIBUTION_ID \
  --distribution-config file://logging-config.json
```

### Cache Management
```bash
# Invalidate CloudFront cache after updates
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Troubleshooting

### Common Issues

#### 1. Site Not Loading
**Symptoms**: Blank page or loading errors
**Solutions**:
```bash
# Check build output
ls -la dist/

# Verify S3 upload
aws s3 ls s3://your-bucket-name/

# Check browser console for errors
```

#### 2. SPA Routing Not Working
**Symptoms**: 404 errors on direct URL access
**Solutions**:
- Verify error document is set to `index.html`
- Check CloudFront custom error responses
- Ensure proper cache behaviors

#### 3. MetaMask Not Detected
**Symptoms**: MetaMask doesn't appear in wallet selection
**Solutions**:
- Use the MetaMask Status debug component
- Verify HTTPS is enabled
- Check browser console for Web3 errors
- Try refreshing the page

#### 4. Slow Loading Times
**Symptoms**: Poor performance scores
**Solutions**:
```bash
# Enable compression
aws s3 cp s3://your-bucket s3://your-bucket \
  --recursive --metadata-directive REPLACE \
  --content-encoding gzip

# Optimize CloudFront caching
# Update cache behaviors in Terraform configuration
```

### Debug Commands
```bash
# Check AWS CLI configuration
aws sts get-caller-identity

# Verify S3 bucket exists
aws s3 ls | grep your-bucket-name

# Check CloudFront distribution status
aws cloudfront list-distributions --query 'DistributionList.Items[?Comment==`sonar-kolkata prod`]'

# Test DNS resolution
nslookup your-cloudfront-domain.cloudfront.net
```

## Cost Optimization

### S3 Costs
- Use S3 Intelligent Tiering for automatic cost optimization
- Enable S3 lifecycle policies for old versions
- Monitor storage usage regularly

### CloudFront Costs
- Optimize cache behaviors to reduce origin requests
- Use appropriate price class for your audience
- Monitor data transfer costs

### Estimated Monthly Costs
- **S3 Storage**: $1-5 (depending on assets)
- **CloudFront**: $1-10 (depending on traffic)
- **Data Transfer**: Variable based on usage

## Security Best Practices

### S3 Security
- Block public access except through CloudFront
- Enable versioning for rollback capability
- Use server-side encryption
- Implement proper IAM policies

### CloudFront Security
- Use Origin Access Identity (OAI)
- Enable HTTPS-only access
- Configure proper security headers
- Consider AWS WAF for additional protection

### Application Security
- Validate all environment variables
- Use Content Security Policy headers
- Implement proper error handling
- Regular security audits

## Backup & Recovery

### Backup Strategy
```bash
# Backup S3 bucket
aws s3 sync s3://your-bucket-name ./backup/$(date +%Y%m%d)

# Export CloudFront configuration
aws cloudfront get-distribution-config \
  --id YOUR_DISTRIBUTION_ID > cloudfront-backup.json
```

### Recovery Procedures
```bash
# Restore from backup
aws s3 sync ./backup/20241228 s3://your-bucket-name

# Rollback to previous version
aws s3 sync s3://your-bucket-name s3://your-bucket-name-backup
```

## Scaling Considerations

### Traffic Growth
- CloudFront automatically scales globally
- S3 handles unlimited requests
- Monitor costs as traffic increases

### Feature Expansion
- Use separate S3 buckets for different environments
- Implement blue-green deployment strategies
- Consider using AWS CodePipeline for CI/CD

### Geographic Expansion
- CloudFront provides global edge locations
- Consider regional S3 buckets for compliance
- Implement proper internationalization

This deployment guide ensures reliable, secure, and scalable hosting for the Sonar Kolkata application using AWS best practices and Infrastructure as Code principles.