import { getEntry, getEntries } from 'astro:content';
import { type ArticleSchemaTransformed, type ArticleContentCollectionData } from '../schema/ArticleSchema'
import { type TagSchemaRaw } from '../schema/TagSchema';

export const transformContentCollection = async (contentCollectionData: ArticleContentCollectionData): Promise<ArticleSchemaTransformed> => {

    const { data: author } = await getEntry('author', contentCollectionData.data.author)
    const tags = await getEntries(contentCollectionData.data.tags.map(slug => ({ collection: 'tag', slug, })))

    return {
        title: contentCollectionData.data.title,
        description: contentCollectionData.data.description,
        slug: contentCollectionData.slug,
        link: `/blog/${ contentCollectionData.slug }`,
        datePublished: contentCollectionData.data.datePublished.toDateString(),
        imageSrc: contentCollectionData.data.imageSrc !== undefined ? contentCollectionData.data.imageSrc satisfies ImageMetadata : undefined,
        imageAlt: contentCollectionData.data.imageAlt,
        author,
        isDraft: contentCollectionData.data.isDraft,
        tags: tags.map(tag => tag.data) satisfies Array<TagSchemaRaw>,
        render: contentCollectionData.render,
        id: contentCollectionData.id,
        seo: contentCollectionData.data.seo,
        featured: contentCollectionData.data.featured,
    } satisfies ArticleSchemaTransformed;
}