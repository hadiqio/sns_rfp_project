# RFP Generator - Document Management System

## Overview

This is a full-stack web application for managing RFP (Request for Proposal) documents and generating automated responses. The system allows users to upload RFP documents, maintain a library of company documents, generate responses using templates, and export final documents with custom branding.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **File Upload**: Multer middleware for handling multipart/form-data
- **Development**: Hot Module Replacement (HMR) via Vite integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **File Storage**: In-memory storage with multer (suitable for development)

## Key Components

### Database Schema
The application uses five main database tables:

1. **RFP Documents** (`rfp_documents`)
   - Stores uploaded RFP files with metadata
   - Tracks processing status and content extraction
   - Fields: id, title, clientName, fileName, fileSize, fileType, content, status, uploadedAt, processedAt

2. **Company Documents** (`company_documents`)
   - Library of company information and capabilities
   - Categorized for easy organization and retrieval
   - Fields: id, title, fileName, fileSize, fileType, category, content, uploadedAt

3. **RFP Responses** (`rfp_responses`)
   - Generated responses linked to RFP documents
   - Supports draft and finalized states
   - Fields: id, rfpDocumentId, title, content, status, createdAt, updatedAt

4. **Templates** (`templates`)
   - Reusable response templates by category
   - Supports content generation workflows
   - Fields: id, name, description, content, category, createdAt

5. **Branding Settings** (`branding_settings`)
   - Customizable branding for document exports
   - Company logos, colors, and styling preferences
   - Fields: id, logoUrl, companyName, primaryColor, secondaryColor, fontFamily

### Application Pages
- **Dashboard**: Overview of RFPs, statistics, and quick actions
- **Upload RFPs**: Document upload and management interface
- **Data Documents**: Company document library with categorization
- **Generate Response**: AI-assisted response generation workflow
- **Preview & Export**: Document review and export functionality
- **Branding**: Company branding and styling configuration
- **Settings**: Application preferences and system configuration

## Data Flow

1. **Document Upload**: Users upload RFP documents which are stored with metadata and content extraction
2. **Content Processing**: Uploaded documents are analyzed and content is extracted for response generation
3. **Response Generation**: System matches RFP requirements with company documents and templates
4. **Review & Export**: Generated responses can be reviewed, edited, and exported with custom branding

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework with custom theming
- **Lucide React**: Modern icon library
- **Class Variance Authority**: Type-safe variant API for components

### Data and State Management
- **TanStack Query**: Server state synchronization and caching
- **React Hook Form**: Performant form library with validation
- **Zod**: TypeScript-first schema validation
- **Date-fns**: Date utility library

### Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Type safety across the application
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Autoprefixer

## Deployment Strategy

### Development
- Local development server using Vite with Express backend
- Hot Module Replacement for fast iteration
- TypeScript compilation checking without emitting files

### Production Build
- Frontend built using Vite to static assets
- Backend bundled using ESBuild with Node.js target
- Database migrations handled via Drizzle Kit
- Environment variables for database connection and configuration

### Architecture Benefits
- **Type Safety**: End-to-end TypeScript ensures reliable data flow
- **Modern Stack**: Latest React and Node.js features for optimal performance
- **Scalable Database**: PostgreSQL with type-safe ORM for reliable data operations
- **Component Reusability**: Shadcn/ui provides consistent, accessible UI components
- **Developer Experience**: Fast builds, HMR, and comprehensive tooling

## Changelog
- June 30, 2025: Initial setup
- June 30, 2025: Updated branding to Smart National Solutions (SNS) with custom logo and color scheme
- June 30, 2025: Added database infrastructure with Azure PostgreSQL connection
  - Created DatabaseStorage class implementing all CRUD operations
  - Set up database connection with user's Azure PostgreSQL instance
  - Database tables created successfully in Azure
  - Currently using in-memory storage while finalizing Azure connection optimization
- June 30, 2025: Integrated Azure AI Foundry for intelligent RFP processing
  - Created AzureAIService with document analysis and response generation
  - Added AI-powered endpoints for RFP analysis and content generation
  - Enhanced Generate Response page with AI status monitoring
  - Azure AI connection fully operational with gpt-4o deployment
- June 30, 2025: Enhanced navigation and branding UI with specific SNS colors
  - Updated page titles for clarity: "Upload RFPs", "Company Data", "SNS Branding"
  - Added SNS color palette selector with hex values: #0EA5E9, #1E40AF, #1E3A8A
  - Integrated three SNS logo variations (light blue, royal blue, deep blue)
  - Added presentation upload section for PPTX brand materials
  - Set Smart National Solutions as default company with light blue branding
- June 30, 2025: Implemented multi-currency pricing system
  - Added support for USD, EUR, and SAR currencies with proper formatting
  - Created currency selector in pricing interface
  - Integrated Intl.NumberFormat for accurate currency display
  - Updated database schema with currency field
  - Real-time currency conversion in cost calculations and summaries
- June 30, 2025: Built comprehensive authentication system
  - User registration with email verification workflow
  - Temporary token-based email verification (24-hour expiry)
  - Password creation after email confirmation
  - JWT-based session management with database persistence
  - Email service integration with branded templates
  - Authentication middleware for protected routes
  - Complete user flow: Register → Email verification → Set password → Login
- June 30, 2025: Implemented multi-language support with English/Arabic
  - Created comprehensive i18n system with Zustand state management
  - Added language toggle component next to dark mode toggle in header
  - Implemented RTL (Right-to-Left) CSS support for Arabic language
  - Document direction automatically switches based on selected language
  - Translation dictionary covers all major UI components and pages
  - Language preference persists in localStorage across sessions
  - Email placeholders updated to use nationalsol.com domain
- June 30, 2025: Built comprehensive AI-powered chatbot system
  - Created integrated chatbot controlled by header icon with Azure AI integration
  - Positioned chatbot panel on right side of main content area (320px width)
  - Intelligent message processing with specialized handlers for navigation, tables, and images
  - Navigation assistance provides guided help through platform sections
  - Automatic table generation for pricing, timelines, and project structures
  - Image generation placeholder with Azure AI Foundry connection ready
  - RFP content generation using GPT-4 via Azure AI endpoint
  - Conversation history context and professional RFP-focused responses
  - Minimizable chat interface with suggested quick actions
  - Real-time typing indicators and error handling
  - ChatbotContext for state management across components
  - Updated Azure AI configuration with deployment name "gpt-4o" and API version "2025-01-01-preview"
  - Chatbot appears/disappears via header MessageCircle icon next to account and language toggles
  - Azure AI integration fully functional with 3-second response time and contextual AI responses
- June 30, 2025: Enhanced button styling and document processing workflow
  - Updated all button colors to hex #36a0d0 across entire application
  - Made RFP Title and Client Name mandatory fields with enhanced validation
  - Fixed file upload error by correcting FormData handling for multipart uploads
  - Added animated processing indicators with spinning icons for document processing
  - Implemented Arabic language support in Azure AI for document analysis and response generation
  - Enhanced AI services to understand and process Arabic RFP documents
  - Added auto-refresh functionality for document list when processing status is active
  - Improved user experience with real-time status updates and bilingual AI support
- June 30, 2025: Implemented comprehensive workflow stepper navigation system
  - Added workflow stepper component to all 5 main pages (Upload RFP, Company Data, Generate Response, SNS Branding, Preview & Export)
  - Created visual progress indicators showing completed steps with green checkmarks and current step highlighted in SNS blue (#36a0d0)
  - Implemented Previous/Next navigation buttons for seamless workflow progression
  - Added smart step completion detection based on data availability
  - Workflow guides users through complete RFP response process with clear visual feedback
  - Navigation buttons disable appropriately based on completion status (e.g., need RFP uploaded before proceeding to next step)
  - Consistent workflow stepper design across all pages with responsive layout
- June 30, 2025: Added PPTX brand presentation upload and enhanced Preview & Export integration
  - Created brand presentation upload section in SNS Branding page for PPTX files containing colors, fonts, icons, and infographics
  - Updated database schema to include presentationUrl field in branding_settings table
  - Enhanced Preview & Export page with comprehensive branding preview showing applied SNS elements
  - Added visual indicators for uploaded brand presentation with confirmation status
  - Preview section now displays how final RFP response will look with SNS branding applied
  - Integrated company logo, color swatches, font information, and presentation asset status
  - Users can now see real-time preview of branded document before export
- June 30, 2025: Implemented AI-powered document summaries and enhanced header layout
  - Created DocumentSummary component that generates AI summaries for processed RFP documents
  - Added Azure AI summary endpoint (/api/documents/:id/summary) with fallback handling
  - AI summaries appear automatically after documents are processed, in the original document language
  - Enhanced header layout: moved Account icon to far right, added Azure AI status indicator
  - Azure AI status shows "Online/Offline" with color-coded indicator and auto-refresh every 30 seconds
  - Fixed workflow stepper to show branding completion status across all pages when brand presentations are uploaded
  - Reactive workflow state management with custom events for real-time status updates
  - Fixed Arabic filename encoding issues with proper UTF-8 decoding on server-side and automatic text direction on client-side
  - Enhanced AI document summaries to extract structured information: submission deadlines, key requirements, important dates, budget/value, technical specifications, and evaluation criteria
  - Improved summary display with proper formatting for section headers, bullet points, and structured content
  - Added regex-based fallback extraction for dates and budget references when Azure AI is unavailable
- June 30, 2025: Completely overhauled Generate Response functionality for comprehensive proposal creation
  - Enhanced AI service to generate 3000-5000 word detailed proposals following professional structure
  - Implemented 10-section proposal format: Executive Summary, Requirements Understanding, Solution Architecture, Scope of Work, Implementation Plan, Team Structure, Technology Recommendations, Knowledge Transfer, Risk Management, and Conclusion
  - Integrated ALL company documents and capabilities into response generation process
  - Increased AI token limit to 8000 for comprehensive responses
  - Created detailed fallback response system that incorporates company documentation when Azure AI unavailable
  - Enhanced prompt engineering to include specific technical details, architecture concepts, and implementation approaches
  - Added comprehensive project timeline estimation and resource allocation recommendations
  - Response generation now pulls from entire company data library to showcase SNS capabilities across all domains
- June 30, 2025: Implemented comprehensive AI-powered editing functionality with visual content integration
  - Created AIEditor component with intelligent content modification using Azure AI
  - Added AI content editing with section-specific targeting and instruction-based modifications
  - Implemented visual content generation for images, architecture diagrams, logos, infographics, and charts
  - Built branding asset integration system that pulls from uploaded PPTX presentations
  - Enhanced editing interface with tabbed visual content insertion (Generate New vs From Branding)
  - Added smart content insertion with AI-generated descriptions and specifications
  - Integrated comprehensive editing toolbar with AI Edit and Add Visual buttons
  - Created real-time content modification with change tracking and confidence scoring
  - Visual content includes mock branding assets extraction from uploaded brand presentations
  - Full integration with Azure AI Foundry for intelligent content enhancement and visual content specification generation
- June 30, 2025: Enhanced navigation and header with collapsible sidebar and processing status
  - Moved Processing Status from Dashboard to Header next to Azure AI status indicator
  - Created dynamic processing status tracking with real-time monitoring of RFP documents and responses
  - Implemented collapsible/expandable navigation bar controlled by clicking the SNS logo
  - Added smooth animation transitions between expanded (256px) and collapsed (64px) sidebar states
  - Enhanced collapsed navigation with tooltips showing page names on icon hover
  - Aligned Recent RFPs section with dashboard stats tiles for consistent layout
  - Processing status shows active process count and auto-refreshes every 5 seconds
  - Navigation preserves all functionality in both expanded and collapsed states with SNS blue highlighting
- June 30, 2025: Improved chatbot positioning and simplified interface
  - Added spacing between chatbot panel and header to prevent visual overlap
  - Repositioned message input field to bottom of chatbot panel for better accessibility
  - Removed expand/minimize button from chatbot header for cleaner interface
  - Chatbot now displays in full mode only with just close button in header
  - Enhanced chatbot layout with proper flex positioning and fixed input area
- July 2, 2025: Created comprehensive Azure VM deployment configuration
  - Built complete .env.example file with all required environment variables
  - Configured Azure AI Foundry, PostgreSQL, JWT, and email authentication settings
  - Created detailed DEPLOYMENT.md guide with step-by-step Azure VM setup instructions
  - Added health check endpoint (/api/health) for deployment monitoring and service status verification
  - Included PM2 process management, Nginx reverse proxy, SSL certificate, and security configurations
  - Ready for production deployment on Azure VM with complete environment variable documentation

## User Preferences

Preferred communication style: Simple, everyday language.
Company branding: Smart National Solutions (SNS) 
- Primary color: #36a0d0 (Updated Blue)
- Secondary color: #00BCD4 (Teal) 
- Logo: SNS geometric logo with outlined cyan design