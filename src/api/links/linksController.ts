import {handleServiceResponse} from "@/common/utils/httpHandlers";
import type {Request, RequestHandler, Response} from "express";
import {linksService} from "@/api/links/linksService";
import {devLog, prodLog} from "@/common/utils/devLog";

class LinksController {

    public createLink: RequestHandler = async (req: Request, res: Response) => {
        const {linkUUID, linkName, domain} = req.body;
        prodLog('--createLink', linkUUID, linkName, domain);
        const serviceResponse = await linksService.createLink({
            linkUUID, linkName, domain
        });
        devLog("service response :", serviceResponse);
        prodLog("service response :", serviceResponse);
        return handleServiceResponse(serviceResponse, res);
    };

    public getLinkByUUID: RequestHandler = async (req: Request, res: Response) => {
        const {linkUUID} = req.params;
        const {domain} = req.query;
        const serviceResponse = await linksService.getLinkByUUID(
            {domain: domain?.toString().trim(), linkUUID: linkUUID?.toString().trim()},
        );
        return handleServiceResponse(serviceResponse, res);
    };

    public getLinkBySlug: RequestHandler = async (req: Request, res: Response) => {
        const {slug} = req.params;
        const {domain} = req.query;
        const serviceResponse = await linksService.getUUIDBySlug(
            {domain: domain?.toString().trim(), slug: slug?.toString().trim()},
        );
        return handleServiceResponse(serviceResponse, res);
    };
}

export const linksController = new LinksController();
