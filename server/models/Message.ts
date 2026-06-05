import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  read: boolean;
}

const messageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true, maxlength: 200 },
    email: { type: String, required: true, maxlength: 320 },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>('Message', messageSchema);
