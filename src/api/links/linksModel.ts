// import { randomUUID } from "node:crypto";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { Model } from "objection";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Link = z.infer<typeof LinkSchema>;
export type LinkResponse = Pick<Link, "uuid" | "domain" | "slug" | "createdAt">
export const LinkSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  slug: z.string(),
  domain: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const LinkCreateSchema = z.object({
  body: z.object({
    linkUUID: z.string().min(1).max(255),
    linkName: z.string().min(0).max(255).optional(),
    domain: z.string().min(0).max(255).optional(),
  }),
});

export const LinkRequestByUUIDSchema = z.object({
  params: z.object({
    linkUUID: z.string().min(2).max(255),
  }),
  query: z.object({
    domain: z.string().min(3).max(255).optional(),
  }),
});

export const LinkRequestBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(2).max(255),
  }),
  query: z.object({
    domain: z.string().min(3).max(255).optional(),
  }),
});

export class DBLink extends Model {
  id!: number;
  uuid!: string;
  slug!: string;
  domain?: string;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return "short_links";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["uuid"],
      properties: {
        id: { type: "integer" },
        uuid: { type: "string" },
        slug: { type: "string" },
        domain: { type: "string", maxLength: 255 },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    };
  }

  $beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
