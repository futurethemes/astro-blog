![5](https://github.com/futurethemes/astro-blog-plugin/assets/7649031/41985bbf-db1c-4c10-b479-073d8959330a)

# Astro Blog
The fastest way to get a blog started in Astro 🚀

`astro-blog` automatically adds several routes, and provides several schemas to get your blog up and running in minutes, not hours.

With built-in pagination, specifying author profiles, creating tags for your articles, and also support for draft articles. `astro-blog` should cover everything you need to get creating content for your website.

## Installation

### Astro Add

`astro-blog` supports installing via the `astro add` command for super easy install:

```bash
## Astro
astro add astro-blog
```

### Manual Install
Or if you'd prefer to instal manually

```bash
## npm
npm install astro-blog

## pnpm
pnpm install astro-blog
```

Then add the integration to your `astro.config.mjs`

```diff
+ import AstroBlog from 'astro-blog'

export default defineConfig{
    integrations: [
        ...,
+       AstroBlog({
+           site: 'https://www.mysite.com',
+       })
    ]
}
```

### Set up schemas

Just one last step before you can start adding content is to set up your content collection schemas.

`astro-blog` provides schemas for Articles, Authors and Tags. So we can easily add definitions in the `src/content/config.ts`:

```ts
import { defineCollection } from 'astro:content'
import { ArticleSchema, AuthorSchema, TagSchema } from 'astro-blog/schema'

export const collections = {
    blog: defineCollection({
        type: 'content',
        schema: ArticleSchema,
    }),


    author: defineCollection({
        type: 'content',
        schema: AuthorSchema,
    }),

    tag: defineCollection({
        type: 'content',
        schema: TagSchema,
    }),
}
```

Now you're all set up to start adding content! 🔥🙌

### Creating content

Now you can create authors in your `content/author` folder, tags in your `content/tag` folder, and finally articles in your `content/blog` folder.

```md
# content/author/jacob.md
---
name: Jacob Jenkins
description: Just some dude, doin some stuff
imageSrc: '../assets/jacob.png'
imageAlt: 'One hell of a guy'
---
```

```md
# content/tag/space.md
---
tag: Space
---
```

```md
# content/blog/andromeda.md
---
title: Andromeda - The Majestic Galaxy
description: It's a galaxy... From outer space!
datePublished: 2023-11-20T22:58:27.197Z
isDraft: false
author: jacob
tags: [space]
imageSrc: './images/andromeda.jpg'
imageAlt: 'Andromeda'
---

# 🌌✨ Meet Andromeda
## The majestic galaxy that's not just a pretty face in the cosmic crowd! 🚀🌠
...
```

## Routes

`astro-blog` add 3 routes to your app:

1) `/blog` this will be the home of all your articles. By default it will show as many articles as specified by your `paginationSize` (default 9). And if you have more than 9 articles, it'll show the pagination buttons.
2) `/blog/:page` these pages are your pagination pages for if you have more than `paginationSize` articles.
3) `/blog/:article-slug` This is your article!

## Features

`astro-blog` is packed with great features to help you get going asap!

- Support for articles, authors and tags
- Automatic pagination support with customisable config option `paginationSize`
    - This also includes generating `/blog/1`, `/blog/2` pages as the pages of posts
- A simple default layout
    - This includes amazing SEO support out-of-the-box with `astro-seo`!
- Great SEO support per page, and also for your `/blog` page itself!
- Ability to add your own page Layout component. BYOLC... Bring your own Layout Component 👀
- Great support for images out-of-the-box with Astro `<Image>`

### Config Options

... I'll do this tomorrow, I'm tired!

### License

MIT - 2024-present, jdtjenkins
