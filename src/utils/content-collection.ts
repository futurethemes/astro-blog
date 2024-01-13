import { type BlogSchemaTransformed, type BlogContentCollectionData } from '../schema/BlogSchema'

export const transformContentCollection = (contentCollectionData: BlogContentCollectionData): BlogSchemaTransformed => {
    return {
        title: contentCollectionData.data.title,
        description: contentCollectionData.data.description,
        slug: contentCollectionData.slug,
        link: `/blog/${ contentCollectionData.slug }`,
        datePublished: contentCollectionData.data.datePublished.toDateString(),
        imageSrc: contentCollectionData.data.imageSrc satisfies ImageMetadata,
        imageAlt: contentCollectionData.data.imageAlt,
        author: contentCollectionData.data.author,
        isDraft: contentCollectionData.data.isDraft,
        tags: contentCollectionData.data.tags,
        render: contentCollectionData.render,
        id: contentCollectionData.id,
    } satisfies BlogSchemaTransformed;
}