CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`message` text NOT NULL,
	`read` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(200) NOT NULL,
	`slug` varchar(200) NOT NULL,
	`tagline` varchar(300) NOT NULL,
	`description` text NOT NULL,
	`tech` json NOT NULL DEFAULT ('[]'),
	`category` enum('AI','Backend','Systems','FullStack','Automation') NOT NULL,
	`githubUrl` varchar(500),
	`liveUrl` varchar(500),
	`featured` boolean NOT NULL DEFAULT false,
	`hasCaseStudy` boolean NOT NULL DEFAULT false,
	`caseStudyProblem` text,
	`caseStudyApproach` text,
	`caseStudyArchitecture` text,
	`caseStudyOutcome` text,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
