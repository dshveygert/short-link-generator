import {StatusCodes} from "http-status-codes";
import {ServiceResponse} from "@/common/models/serviceResponse";
import {logger} from "@/server";
import {LinksRepository} from "src/api/links/linksRepository";
import {LinkResponse} from "@/api/links/linksModel";

export class LinksService {
    private linksRepository: LinksRepository;

    constructor(repository: LinksRepository = new LinksRepository()) {
        this.linksRepository = repository;
    }

    // Create
    async createLink(params: { linkUUID: string; linkName?: string; domain?: string; }): Promise<
        ServiceResponse<LinkResponse | null>
    > {
        try {
            const link = await this.linksRepository.createLink(params);
            console.log("Service links", link);
            if (link) {
                const {uuid, domain, slug, createdAt} = link;
                return ServiceResponse.success<LinkResponse>("New Link", {
                    uuid,
                    domain,
                    slug,
                    createdAt: createdAt?.toISOString()
                });
            }
            return ServiceResponse.failure("Link does not created", null, StatusCodes.INTERNAL_SERVER_ERROR);
        } catch (ex) {
            const errorMessage = `Error creating Link: $${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while creating link.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Retrieves links by slug
    async getUUIDBySlug(params: { slug?: string; domain?: string }): Promise<
        ServiceResponse<LinkResponse | null>
    > {
        const {slug, domain} = params ?? {};
        try {
            if (!slug) {
                return ServiceResponse.failure("No slug received", null, StatusCodes.NOT_FOUND);
            }
            if (slug) {
                const result = await this.linksRepository.findLinkBySlugAsync(slug, domain);
                if (result) {
                    return ServiceResponse.success<LinkResponse>("Link found", {
                        ...result,
                        createdAt: result.createdAt?.toISOString()
                    });
                }
            }
            return ServiceResponse.success<LinkResponse | null>("Link not found", null);
        } catch (ex) {
            const errorMessage = `Error finding link: $${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while retrieving links.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Retrieves links by UUID
    async getLinkByUUID(params: { domain?: string; linkUUID: string }): Promise<
        ServiceResponse<LinkResponse | null>
    > {
        const {domain, linkUUID} = params ?? {};
        try {
            if (!linkUUID) {
                return ServiceResponse.failure("No uuid received", null, StatusCodes.NOT_FOUND);
            }
            if (linkUUID) {
                const result = await this.linksRepository.findLinkByUUIDAsync(linkUUID, domain);
                if (result) {
                    return ServiceResponse.success<LinkResponse>("Link found", {
                        ...result,
                        createdAt: result.createdAt?.toISOString()
                    });
                }
            }
            return ServiceResponse.success<LinkResponse | null>("Link not found", null);
        } catch (ex) {
            const errorMessage = `Error finding link: $${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while retrieving links.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

export const linksService = new LinksService();
