import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  tech: string[];
  category: 'AI' | 'Backend' | 'Systems' | 'FullStack' | 'Automation';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  hasCaseStudy: boolean;
  caseStudyProblem?: string;
  caseStudyApproach?: string;
  caseStudyArchitecture?: string;
  caseStudyOutcome?: string;
  displayOrder: number;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, maxlength: 200, index: true },
    tagline: { type: String, required: true, maxlength: 300 },
    description: { type: String, required: true },
    tech: [{ type: String }],
    category: {
      type: String,
      enum: ['AI', 'Backend', 'Systems', 'FullStack', 'Automation'],
      required: true,
    },
    githubUrl: { type: String, maxlength: 500 },
    liveUrl: { type: String, maxlength: 500 },
    featured: { type: Boolean, default: false },
    hasCaseStudy: { type: Boolean, default: false },
    caseStudyProblem: String,
    caseStudyApproach: String,
    caseStudyArchitecture: String,
    caseStudyOutcome: String,
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>('Project', projectSchema);
