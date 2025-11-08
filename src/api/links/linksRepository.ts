import slugify from "slugify";
import {DBLink, Link, LinkResponse} from "@/api/links/linksModel";
import {env} from "@/common/utils/envConfig";
import {nanoid} from "nanoid";


export class LinksRepository {
  private envData = env;

  async uniqueSlug(slug: string): Promise<boolean> {
    const exists = await DBLink.query().where("slug", slug).first();
    return !!exists;
  };

  async createLink(params: { linkUUID: string; linkName?: string; domain?: string; }): Promise<DBLink> {
    const { linkUUID, domain, linkName } = params;
    const {APP_CONFIG_DOMAIN} = this.envData;
    const existedLink = await DBLink.query().select("*").where("uuid", linkUUID).first();
    if (existedLink?.id) {
      return existedLink;
    }
    const domainName = domain || APP_CONFIG_DOMAIN || "";
    const dateSuffix = new Date().toISOString().slice(2, 10);
    let ln = !!domainName ? `${domainName[0]}${domainName[domainName.length -1]}` : dateSuffix;
    if (!!linkName) {
      ln = linkName.trim();
    }
    let baseSlug = slugify(ln, { lower: true, strict: true });

    let slug = baseSlug;

    // ensure unique
    const exists = await this.uniqueSlug(slug);
    if (exists) {
      const suffix = nanoid(7);
      slug = `${linkName} ${dateSuffix} ${suffix}`;
      return this.createLink({
        linkUUID,
        linkName: slug,
        domain
      })
    }

    const link = await DBLink.query().insertAndFetch({
      uuid: linkUUID,
      slug,
      domain: domainName,
    });

    return link;
  }

  async findLinkByUUIDAsync(linkUUID: string,domain?: string): Promise<DBLink | null> {
    if (!linkUUID) {
      return null;
    }
    const link = await DBLink.query()
        .where("uuid", linkUUID)
        .modify((qb) => {
          if (domain) qb.andWhere("domain", domain);
        })
        .first();
    return link ?? null;
  }

  async findLinkBySlugAsync(slug: string, domain?: string): Promise<DBLink | null> {
    if (!slug) {
      return null;
    }
    const link = await DBLink.query()
        .where("slug", slug)
        .modify((qb) => {
          if (domain) qb.andWhere("domain", domain);
        })
        .first();
    return link ?? null;
  }
}
