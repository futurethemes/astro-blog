import { getCollection } from "astro:content"
import { type ArticleSchemaTransformed, type ArticleContentCollectionData } from "../schema/ArticleSchema"
import { transformContentCollection } from "./content-collection"


export async function getArticles() {
    const articlesRaw: Array<ArticleContentCollectionData> = ((await getCollection('blog')) ?? [])

    let blogArticles: Array<ArticleSchemaTransformed> = []
        
    for (const entry of articlesRaw) {
        if (entry.data.isDraft) {
            continue
        }
        
        blogArticles.push(await transformContentCollection(entry as ArticleContentCollectionData))
    }

    return blogArticles
}