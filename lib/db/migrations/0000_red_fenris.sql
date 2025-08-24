CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"interest" varchar(100) NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
