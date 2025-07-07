import { pgTable, text, varchar, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rfpDocuments = pgTable("rfp_documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  clientName: text("client_name").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  fileType: text("file_type").notNull(),
  content: text("content"),
  status: text("status").notNull().default("uploaded"),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  processedAt: timestamp("processed_at"),
});

export const companyDocuments = pgTable("company_documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  fileType: text("file_type").notNull(),
  category: text("category").notNull(),
  content: text("content"),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const rfpResponses = pgTable("rfp_responses", {
  id: serial("id").primaryKey(),
  rfpDocumentId: integer("rfp_document_id").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  status: text("status").notNull().default("draft"),
  // Pricing and Project Details
  projectDurationMonths: integer("project_duration_months"),
  numberOfConsultants: integer("number_of_consultants"),
  pricePerConsultantPerMonth: decimal("price_per_consultant_per_month", { precision: 10, scale: 2 }),
  totalProjectCost: decimal("total_project_cost", { precision: 12, scale: 2 }),
  taxRate: decimal("tax_rate", { precision: 5, scale: 2 }),
  taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }),
  finalTotalCost: decimal("final_total_cost", { precision: 12, scale: 2 }),
  deliveryModel: text("delivery_model"), // "onsite", "offshore", "hybrid"
  currency: text("currency").notNull().default("USD"), // "USD", "EUR", "SAR"
  consultantTypes: text("consultant_types"), // JSON string of consultant roles and rates
  additionalCosts: text("additional_costs"), // JSON string for travel, equipment, etc.
  paymentTerms: text("payment_terms"),
  proposalValidityDays: integer("proposal_validity_days"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const brandingSettings = pgTable("branding_settings", {
  id: serial("id").primaryKey(),
  logoUrl: text("logo_url"),
  companyName: text("company_name").notNull(),
  primaryColor: text("primary_color").notNull().default("#1976D2"),
  secondaryColor: text("secondary_color").notNull().default("#FF9800"),
  fontFamily: text("font_family").notNull().default("Roboto"),
  presentationUrl: text("presentation_url"), // PPTX brand presentation
  presentationName: text("presentation_name"), // Original filename
  presentationSize: integer("presentation_size"), // File size in bytes
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// User authentication tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  password: text("password"), // bcrypt hash
  isActive: boolean("is_active").notNull().default(false),
  emailVerified: boolean("email_verified").notNull().default(false),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verificationTokens = pgTable("verification_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  type: text("type").notNull(), // "email_verification", "password_reset"
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertRfpDocumentSchema = createInsertSchema(rfpDocuments).omit({
  id: true,
  uploadedAt: true,
  processedAt: true,
});

export const insertCompanyDocumentSchema = createInsertSchema(companyDocuments).omit({
  id: true,
  uploadedAt: true,
});

export const insertRfpResponseSchema = createInsertSchema(rfpResponses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdAt: true,
});

export const insertBrandingSettingsSchema = createInsertSchema(brandingSettings).omit({
  id: true,
  updatedAt: true,
});

export type RfpDocument = typeof rfpDocuments.$inferSelect;
export type InsertRfpDocument = z.infer<typeof insertRfpDocumentSchema>;
export type CompanyDocument = typeof companyDocuments.$inferSelect;
export type InsertCompanyDocument = z.infer<typeof insertCompanyDocumentSchema>;
export type RfpResponse = typeof rfpResponses.$inferSelect;
export type InsertRfpResponse = z.infer<typeof insertRfpResponseSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type BrandingSettings = typeof brandingSettings.$inferSelect;
export type InsertBrandingSettings = z.infer<typeof insertBrandingSettingsSchema>;

// Authentication types
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  isActive: true,
  emailVerified: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVerificationTokenSchema = createInsertSchema(verificationTokens).omit({
  id: true,
  usedAt: true,
  createdAt: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type InsertVerificationToken = z.infer<typeof insertVerificationTokenSchema>;
export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
