#!/bin/bash

# Sonar Kolkata Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="sonar-kolkata"
ENVIRONMENT=${ENVIRONMENT:-"prod"}
AWS_REGION=${AWS_REGION:-"us-east-1"}

echo -e "${BLUE}🚀 Starting Sonar Kolkata deployment...${NC}"

# Check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}📋 Checking prerequisites...${NC}"
    
    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
        exit 1
    fi
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is not installed. Please install it first.${NC}"
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm is not installed. Please install it first.${NC}"
        exit 1
    fi
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        echo -e "${RED}❌ AWS credentials not configured. Please run 'aws configure' first.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ All prerequisites met!${NC}"
}

# Install dependencies
install_dependencies() {
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✅ Dependencies installed!${NC}"
}

# Build the application
build_application() {
    echo -e "${YELLOW}🔨 Building application...${NC}"
    npm run build
    
    if [ ! -d "dist" ]; then
        echo -e "${RED}❌ Build failed - dist directory not found${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Application built successfully!${NC}"
}

# Deploy infrastructure with Terraform
deploy_infrastructure() {
    echo -e "${YELLOW}🏗️  Deploying infrastructure...${NC}"
    
    cd deploy/terraform
    
    # Initialize Terraform
    terraform init
    
    # Plan deployment
    terraform plan -var="environment=${ENVIRONMENT}" -var="aws_region=${AWS_REGION}"
    
    # Apply deployment
    terraform apply -var="environment=${ENVIRONMENT}" -var="aws_region=${AWS_REGION}" -auto-approve
    
    # Get outputs
    S3_BUCKET=$(terraform output -raw s3_bucket_name)
    CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id)
    WEBSITE_URL=$(terraform output -raw website_url)
    
    cd ../..
    
    echo -e "${GREEN}✅ Infrastructure deployed!${NC}"
    echo -e "${BLUE}📝 S3 Bucket: ${S3_BUCKET}${NC}"
    echo -e "${BLUE}📝 CloudFront ID: ${CLOUDFRONT_ID}${NC}"
    echo -e "${BLUE}📝 Website URL: ${WEBSITE_URL}${NC}"
}

# Upload files to S3
upload_to_s3() {
    echo -e "${YELLOW}📤 Uploading files to S3...${NC}"
    
    if [ -z "$S3_BUCKET" ]; then
        echo -e "${RED}❌ S3 bucket name not found. Please run infrastructure deployment first.${NC}"
        exit 1
    fi
    
    # Sync files to S3
    aws s3 sync dist/ s3://${S3_BUCKET} --delete --region ${AWS_REGION}
    
    echo -e "${GREEN}✅ Files uploaded to S3!${NC}"
}

# Invalidate CloudFront cache
invalidate_cloudfront() {
    echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
    
    if [ -z "$CLOUDFRONT_ID" ]; then
        echo -e "${RED}❌ CloudFront distribution ID not found. Please run infrastructure deployment first.${NC}"
        exit 1
    fi
    
    # Create invalidation
    aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*" --region ${AWS_REGION}
    
    echo -e "${GREEN}✅ CloudFront cache invalidated!${NC}"
}

# Main deployment function
main() {
    echo -e "${BLUE}🌟 Sonar Kolkata - AWS Deployment${NC}"
    echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
    echo -e "${BLUE}Region: ${AWS_REGION}${NC}"
    echo ""
    
    check_prerequisites
    install_dependencies
    build_application
    
    # Check if Terraform is installed for infrastructure deployment
    if command -v terraform &> /dev/null; then
        deploy_infrastructure
        upload_to_s3
        invalidate_cloudfront
    else
        echo -e "${YELLOW}⚠️  Terraform not found. Skipping infrastructure deployment.${NC}"
        echo -e "${YELLOW}📝 Please install Terraform or deploy infrastructure manually.${NC}"
        
        # Try to get existing infrastructure info
        echo -e "${YELLOW}🔍 Looking for existing S3 bucket...${NC}"
        
        # You'll need to set these manually if not using Terraform
        if [ -z "$S3_BUCKET" ]; then
            echo -e "${RED}❌ Please set S3_BUCKET environment variable${NC}"
            exit 1
        fi
        
        if [ -z "$CLOUDFRONT_ID" ]; then
            echo -e "${RED}❌ Please set CLOUDFRONT_ID environment variable${NC}"
            exit 1
        fi
        
        upload_to_s3
        invalidate_cloudfront
    fi
    
    echo ""
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${BLUE}🌐 Your application is available at: ${WEBSITE_URL}${NC}"
    echo ""
    echo -e "${YELLOW}📝 Next steps:${NC}"
    echo -e "   1. Wait 5-10 minutes for CloudFront to propagate"
    echo -e "   2. Test your application at the URL above"
    echo -e "   3. Configure custom domain if needed"
    echo -e "   4. Set up monitoring and alerts"
}

# Handle script arguments
case "${1:-}" in
    "infrastructure")
        check_prerequisites
        deploy_infrastructure
        ;;
    "build")
        check_prerequisites
        install_dependencies
        build_application
        ;;
    "upload")
        check_prerequisites
        upload_to_s3
        invalidate_cloudfront
        ;;
    *)
        main
        ;;
esac