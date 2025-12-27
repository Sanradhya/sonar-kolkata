#!/bin/bash

# Quick deployment script for Sonar Kolkata (without Terraform)
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Sonar Kolkata - Quick AWS Deployment${NC}"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

# Configuration
PROJECT_NAME="sonar-kolkata"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BUCKET_NAME="${PROJECT_NAME}-frontend-${TIMESTAMP}"
AWS_REGION=${AWS_REGION:-"us-east-1"}

echo -e "${YELLOW}📋 Configuration:${NC}"
echo -e "   Project: ${PROJECT_NAME}"
echo -e "   Bucket: ${BUCKET_NAME}"
echo -e "   Region: ${AWS_REGION}"
echo ""

# Build the application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm install
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Application built successfully!${NC}"

# Create S3 bucket
echo -e "${YELLOW}🪣 Creating S3 bucket...${NC}"
if [ "$AWS_REGION" = "us-east-1" ]; then
    aws s3 mb s3://${BUCKET_NAME} --region ${AWS_REGION}
else
    aws s3 mb s3://${BUCKET_NAME} --region ${AWS_REGION} --create-bucket-configuration LocationConstraint=${AWS_REGION}
fi

# Configure bucket for static website hosting
echo -e "${YELLOW}🌐 Configuring static website hosting...${NC}"
aws s3 website s3://${BUCKET_NAME} --index-document index.html --error-document index.html --region ${AWS_REGION}

# Create bucket policy for public read access
cat > /tmp/bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
        }
    ]
}
EOF

# Apply bucket policy
echo -e "${YELLOW}🔒 Setting bucket policy...${NC}"
aws s3api put-bucket-policy --bucket ${BUCKET_NAME} --policy file:///tmp/bucket-policy.json --region ${AWS_REGION}

# Disable block public access
aws s3api put-public-access-block --bucket ${BUCKET_NAME} --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" --region ${AWS_REGION}

# Upload files to S3
echo -e "${YELLOW}📤 Uploading files to S3...${NC}"
aws s3 sync dist/ s3://${BUCKET_NAME} --region ${AWS_REGION}

# Set proper content types
echo -e "${YELLOW}🏷️  Setting content types...${NC}"
aws s3 cp s3://${BUCKET_NAME} s3://${BUCKET_NAME} --recursive --metadata-directive REPLACE --content-type "text/html" --exclude "*" --include "*.html" --region ${AWS_REGION}
aws s3 cp s3://${BUCKET_NAME} s3://${BUCKET_NAME} --recursive --metadata-directive REPLACE --content-type "text/css" --exclude "*" --include "*.css" --region ${AWS_REGION}
aws s3 cp s3://${BUCKET_NAME} s3://${BUCKET_NAME} --recursive --metadata-directive REPLACE --content-type "application/javascript" --exclude "*" --include "*.js" --region ${AWS_REGION}

# Get website URL
WEBSITE_URL="http://${BUCKET_NAME}.s3-website-${AWS_REGION}.amazonaws.com"

echo ""
echo -e "${GREEN}🎉 Quick deployment completed successfully!${NC}"
echo -e "${BLUE}🌐 Your application is available at: ${WEBSITE_URL}${NC}"
echo ""
echo -e "${YELLOW}📝 Important notes:${NC}"
echo -e "   • This is a basic S3 website hosting setup"
echo -e "   • For production, consider using CloudFront for HTTPS and better performance"
echo -e "   • The website URL uses HTTP (not HTTPS)"
echo -e "   • Bucket name: ${BUCKET_NAME}"
echo ""
echo -e "${YELLOW}🔧 To add CloudFront later:${NC}"
echo -e "   1. Create a CloudFront distribution"
echo -e "   2. Point it to your S3 bucket"
echo -e "   3. Configure SSL certificate"
echo -e "   4. Update DNS records"

# Clean up temporary files
rm -f /tmp/bucket-policy.json

echo ""
echo -e "${GREEN}✅ Deployment information saved. You can now access your application!${NC}"