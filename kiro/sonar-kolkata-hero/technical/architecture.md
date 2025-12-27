# Sonar Kolkata - Architecture & AWS Deployment Guide

## Application Overview

Sonar Kolkata is a modern Web3-enabled React application that combines heritage site exploration with blockchain technology. The application features an interactive map of Kolkata's heritage sites, Web3 wallet integration, and a decentralized marketplace for heritage-related content.

## Architecture Components

### Frontend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React SPA (Vite)                        │
├─────────────────────────────────────────────────────────────┤
│  UI Layer                                                   │
│  ├── shadcn/ui + Radix UI Components                       │
│  ├── Tailwind CSS Styling                                  │
│  └── Responsive Design (Mobile-first)                      │
├─────────────────────────────────────────────────────────────┤
│  State Management                                           │
│  ├── React Query (Server State)                            │
│  ├── React Hook Form (Form State)                          │
│  └── React Context (Global State)                          │
├─────────────────────────────────────────────────────────────┤
│  Web3 Integration                                           │
│  ├── Wagmi (Ethereum Interactions)                         │
│  ├── RainbowKit (Wallet Connection)                        │
│  ├── Ethers.js (Contract Interactions)                     │
│  └── Multi-chain Support (Mainnet, Base, Polygon, etc.)    │
├─────────────────────────────────────────────────────────────┤
│  Mapping & Geospatial                                      │
│  ├── React Leaflet (Interactive Maps)                      │
│  ├── Marker Clustering                                     │
│  └── Custom Heritage Site Markers                          │
├─────────────────────────────────────────────────────────────┤
│  Routing & Navigation                                       │
│  ├── React Router DOM                                      │
│  ├── Client-side Routing                                   │
│  └── Mobile Bottom Navigation                              │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Core Framework
- **React 19.2.0** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing

#### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Tailwind Animate** - Animation utilities

#### Web3 & Blockchain
- **Wagmi** - React hooks for Ethereum
- **RainbowKit** - Wallet connection UI
- **Ethers.js** - Ethereum library
- **Viem** - TypeScript Ethereum interface

#### Maps & Geospatial
- **Leaflet** - Interactive maps
- **React Leaflet** - React bindings for Leaflet
- **Marker Clustering** - Performance optimization for map markers

#### State Management
- **TanStack React Query** - Server state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

## Application Structure

### Page Architecture
```
/                    # Landing page with hero section
├── /map            # Interactive heritage map
├── /marketplace    # Web3 marketplace for heritage content
└── /*              # 404 Not Found page
```

### Component Hierarchy
```
src/
├── components/
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   ├── landing/               # Landing page specific components
│   ├── modals/                # Modal dialogs
│   │   ├── InteractiveMapModal.tsx
│   │   ├── PlaceDetailModal.tsx
│   │   └── SuccessModal.tsx
│   ├── BackgroundEffects.tsx  # Visual effects
│   ├── HeroCard.tsx          # Hero section component
│   ├── MapComponent.tsx      # Main map component
│   ├── Navbar.tsx            # Navigation header
│   ├── NavLink.tsx           # Navigation links
│   ├── RainbowLoginButton.tsx # Web3 wallet connection
│   └── spotlight-card.tsx    # Featured content cards
├── pages/
│   ├── Index.tsx             # Landing page
│   ├── MapPage.tsx           # Map page
│   ├── Marketplace.tsx       # Marketplace page
│   └── NotFound.tsx          # 404 page
├── web3/
│   ├── wagmi.ts              # Wagmi configuration
│   └── contract.ts           # Smart contract interface
├── hooks/
│   ├── use-mobile.tsx        # Mobile detection hook
│   └── use-toast.ts          # Toast notifications
└── lib/
    └── utils.ts              # Utility functions
```

## AWS Deployment Architecture

### Recommended AWS Services

#### 1. Static Website Hosting
```
┌─────────────────────────────────────────────────────────────┐
│                    Amazon CloudFront                        │
│  ├── Global CDN Distribution                               │
│  ├── SSL/TLS Termination                                   │
│  ├── Caching Strategy                                      │
│  └── Custom Domain Support                                 │
├─────────────────────────────────────────────────────────────┤
│                    Amazon S3                               │
│  ├── Static Asset Storage                                  │
│  ├── Website Hosting                                       │
│  └── Versioned Deployments                                 │
└─────────────────────────────────────────────────────────────┘
```

#### 2. CI/CD Pipeline
```
┌─────────────────────────────────────────────────────────────┐
│                    AWS CodePipeline                        │
│  ├── Source: GitHub Integration                            │
│  ├── Build: AWS CodeBuild                                  │
│  └── Deploy: S3 + CloudFront Invalidation                  │
├─────────────────────────────────────────────────────────────┤
│                    AWS CodeBuild                           │
│  ├── Node.js 18+ Runtime                                   │
│  ├── npm install & build                                   │
│  ├── Environment Variable Injection                        │
│  └── Artifact Generation                                   │
└─────────────────────────────────────────────────────────────┘
```

#### 3. Environment Management
```
┌─────────────────────────────────────────────────────────────┐
│                AWS Systems Manager                          │
│  ├── Parameter Store (Environment Variables)               │
│  ├── Secure String Parameters                              │
│  └── Cross-Environment Configuration                       │
├─────────────────────────────────────────────────────────────┤
│                    AWS Secrets Manager                     │
│  ├── WalletConnect Project ID                              │
│  ├── API Keys                                              │
│  └── Third-party Service Credentials                       │
└─────────────────────────────────────────────────────────────┘
```

### Deployment Configuration

#### Build Configuration
```yaml
# buildspec.yml for AWS CodeBuild
version: 0.2
phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - npm install
  build:
    commands:
      - echo Build started on `date`
      - npm run build
  post_build:
    commands:
      - echo Build completed on `date`
artifacts:
  files:
    - '**/*'
  base-directory: dist
```

#### Environment Variables
```bash
# Required Environment Variables
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_API_BASE_URL=https://api.sonarkolkata.com
VITE_CONTRACT_ADDRESS=0x47A3B21b3eA6DAbAD4e3EDE568F9C1a90aD8eB4e
VITE_ENVIRONMENT=production
```

### Infrastructure as Code (Terraform)

#### S3 Bucket Configuration
```hcl
resource "aws_s3_bucket" "sonar_kolkata_frontend" {
  bucket = "sonar-kolkata-frontend-${var.environment}"
}

resource "aws_s3_bucket_website_configuration" "sonar_kolkata_website" {
  bucket = aws_s3_bucket.sonar_kolkata_frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"  # SPA routing
  }
}

resource "aws_s3_bucket_public_access_block" "sonar_kolkata_pab" {
  bucket = aws_s3_bucket.sonar_kolkata_frontend.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
```

#### CloudFront Distribution
```hcl
resource "aws_cloudfront_distribution" "sonar_kolkata_distribution" {
  origin {
    domain_name = aws_s3_bucket.sonar_kolkata_frontend.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.sonar_kolkata_frontend.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.sonar_kolkata_oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.sonar_kolkata_frontend.id}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  # SPA routing support
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
```

## Performance Optimizations

### Build Optimizations
- **Code Splitting**: Automatic route-based code splitting with React.lazy
- **Tree Shaking**: Vite automatically removes unused code
- **Asset Optimization**: Image compression and format optimization
- **Bundle Analysis**: Use `npm run build -- --analyze` for bundle size analysis

### Runtime Optimizations
- **React Query Caching**: Intelligent server state caching
- **Map Marker Clustering**: Performance optimization for large datasets
- **Lazy Loading**: Components and routes loaded on demand
- **Service Worker**: Offline support and caching (optional)

### CDN Strategy
- **Static Assets**: All static assets served via CloudFront
- **Cache Headers**: Aggressive caching for immutable assets
- **Compression**: Gzip/Brotli compression enabled
- **Edge Locations**: Global content delivery

## Security Considerations

### Web3 Security
- **Wallet Connection**: Secure wallet integration via RainbowKit
- **Contract Interactions**: Type-safe contract calls with Ethers.js
- **Network Validation**: Multi-chain support with network switching
- **Transaction Security**: User confirmation for all blockchain transactions

### Application Security
- **HTTPS Only**: All traffic encrypted in transit
- **Content Security Policy**: Strict CSP headers
- **Environment Variables**: Sensitive data in AWS Parameter Store
- **Input Validation**: Zod schema validation for all forms

### AWS Security
- **IAM Roles**: Least privilege access for all services
- **S3 Bucket Policies**: Restricted access with CloudFront OAI
- **CloudFront Security**: WAF integration for DDoS protection
- **Secrets Management**: AWS Secrets Manager for sensitive data

## Monitoring & Observability

### Application Monitoring
- **CloudWatch Logs**: Application and build logs
- **Real User Monitoring**: CloudWatch RUM for performance metrics
- **Error Tracking**: Integration with Sentry or similar service
- **Web3 Analytics**: Wallet connection and transaction metrics

### Infrastructure Monitoring
- **CloudFront Metrics**: CDN performance and cache hit rates
- **S3 Metrics**: Storage and request metrics
- **CodePipeline Monitoring**: Build and deployment success rates
- **Cost Monitoring**: AWS Cost Explorer and budgets

## Deployment Environments

### Development
- **Branch**: `develop`
- **Domain**: `dev.sonarkolkata.com`
- **Environment**: Development configuration
- **Auto-deploy**: On push to develop branch

### Staging
- **Branch**: `staging`
- **Domain**: `staging.sonarkolkata.com`
- **Environment**: Production-like configuration
- **Manual Deploy**: Requires approval

### Production
- **Branch**: `main`
- **Domain**: `sonarkolkata.com`
- **Environment**: Production configuration
- **Manual Deploy**: Requires approval and testing

## Scaling Considerations

### Traffic Scaling
- **CloudFront**: Automatic global scaling
- **S3**: Unlimited storage and bandwidth
- **Multi-Region**: Deploy to multiple AWS regions if needed

### Development Scaling
- **Micro-frontends**: Potential future architecture
- **API Gateway**: For backend service integration
- **Lambda Functions**: Serverless backend services

## Cost Optimization

### AWS Cost Management
- **S3 Intelligent Tiering**: Automatic cost optimization
- **CloudFront Pricing**: Optimize cache behaviors
- **Reserved Capacity**: For predictable workloads
- **Cost Budgets**: Automated cost monitoring and alerts

### Development Efficiency
- **Fast Builds**: Vite for rapid development cycles
- **Hot Reloading**: Instant feedback during development
- **TypeScript**: Catch errors at compile time
- **Automated Testing**: Reduce manual QA overhead

## Getting Started with AWS Deployment

### Prerequisites
1. AWS Account with appropriate permissions
2. AWS CLI configured
3. Terraform installed (optional, for IaC)
4. GitHub repository with the application code

### Quick Deployment Steps
1. **Create S3 Bucket**: For hosting static files
2. **Setup CloudFront**: For global CDN
3. **Configure CodePipeline**: For automated deployments
4. **Set Environment Variables**: In Parameter Store
5. **Deploy Application**: Trigger initial build

### Manual Deployment
```bash
# Build the application
npm run build

# Sync to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

This architecture provides a scalable, secure, and cost-effective deployment strategy for the Sonar Kolkata application on AWS, leveraging modern Web3 technologies and best practices for React applications.