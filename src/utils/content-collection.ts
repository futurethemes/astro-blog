import { getEntry, getEntries } from 'astro:content';
import { type BlogSchemaTransformed, type BlogContentCollectionData } from '../schema/BlogSchema'
import { type TagSchemaRaw } from '../schema/TagSchema';

export const transformContentCollection = async (contentCollectionData: BlogContentCollectionData): Promise<BlogSchemaTransformed> => {
    const { data: author } = await getEntry(contentCollectionData.data.author)
    const tags = await getEntries(contentCollectionData.data.tags)

    return {
        title: contentCollectionData.data.title,
        description: contentCollectionData.data.description,
        slug: contentCollectionData.slug,
        link: `/blog/${ contentCollectionData.slug }`,
        datePublished: contentCollectionData.data.datePublished.toDateString(),
        imageSrc: contentCollectionData.data.imageSrc satisfies ImageMetadata,
        imageAlt: contentCollectionData.data.imageAlt,
        author,
        isDraft: contentCollectionData.data.isDraft,
        tags: tags.map(tag => tag.data) satisfies Array<TagSchemaRaw>,
        render: contentCollectionData.render,
        id: contentCollectionData.id,
    } satisfies BlogSchemaTransformed;
}