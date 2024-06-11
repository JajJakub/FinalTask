import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class Comment {
  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true, select: false })
  authorId: string;

  @Prop({ required: true })
  commentBody: string;

  @Prop({ type: Date, default: Date.now })
  commentDate: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
