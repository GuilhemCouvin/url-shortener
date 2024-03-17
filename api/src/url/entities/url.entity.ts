// url.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Url {
  @Prop({
    type: String,
    required: true,
  })
  source: string;

  @Prop({
    type: String,
    required: true,
  })
  url: string;

  @Prop({
    type: String,
    required: true,
  })
  scheme: string;

  @Prop({
    type: String,
    required: true,
  })
  host: string;

  @Prop({
    type: String,
    immutable: true,
    default: process.env.API_DOMAIN || 'localhost:4000',
    // default: 'localhost:4000',
  })
  domain: string;

  @Prop({
    type: String,
    required: true,
  })
  alias: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  custom: boolean;

  @Prop({
    type: String,
    required: true,
  })
  shortUrl: string;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  clicks: number;

  @Prop({
    type: Date,
    required: false,
    default: null,
  })
  expireAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
