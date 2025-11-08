import {z} from "zod";
import express, {type Router} from "express";
import {createApiResponse} from "@/api-docs/openAPIResponseBuilders";
import {OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";
import {LinkCreateSchema, LinkRequestBySlugSchema, LinkRequestByUUIDSchema, LinkSchema} from "src/api/links/linksModel";
import {authMiddleware} from "src/common/middleware/auth";
import {linksController} from "src/api/links/linksController";
import {validateRequest} from "src/common/utils/httpHandlers";


export const linksRegistry = new OpenAPIRegistry();
export const linksRouter: Router = express.Router();

linksRegistry.register("Link", LinkSchema);

linksRegistry.registerPath({
    method: "get",
    path: "/links/slug/:slug",
    tags: ["Link"],
    responses: createApiResponse(z.array(LinkSchema), "Success"),
});

linksRouter.get("/slug/:slug", authMiddleware, validateRequest(LinkRequestBySlugSchema), linksController.getLinkBySlug);

linksRegistry.registerPath({
    method: "get",
    path: "/links/:linkUUID",
    tags: ["Link"],
    responses: createApiResponse(z.array(LinkSchema), "Success"),
});

linksRouter.get("/:linkUUID", authMiddleware, validateRequest(LinkRequestByUUIDSchema), linksController.getLinkByUUID);

linksRegistry.registerPath({
    method: "post",
    path: "/links",
    tags: ["Link"],
    request: {params: LinkCreateSchema.shape.body},
    responses: createApiResponse(LinkCreateSchema, "Success"),
});

linksRouter.post("/", authMiddleware, validateRequest(LinkCreateSchema), linksController.createLink);
