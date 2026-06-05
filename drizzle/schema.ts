import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Projects table — portfolio projects with optional case study.
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  tagline: varchar("tagline", { length: 300 }).notNull(),
  description: text("description").notNull(),
  tech: json("tech").$type<string[]>().notNull().default([]),
  category: mysqlEnum("category", ["AI", "Backend", "Systems", "FullStack", "Automation"]).notNull(),
  githubUrl: varchar("githubUrl", { length: 500 }),
  liveUrl: varchar("liveUrl", { length: 500 }),
  featured: boolean("featured").default(false).notNull(),
  hasCaseStudy: boolean("hasCaseStudy").default(false).notNull(),
  caseStudyProblem: text("caseStudyProblem"),
  caseStudyApproach: text("caseStudyApproach"),
  caseStudyArchitecture: text("caseStudyArchitecture"),
  caseStudyOutcome: text("caseStudyOutcome"),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Messages table — contact form submissions.
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;
