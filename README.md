![5](https://github.com/futurethemes/astro-blog-plugin/assets/7649031/41985bbf-db1c-4c10-b479-073d8959330a)

# Astro Blog
The fastest way to get a blog started in Astro 🚀

`astro-blog` automatically adds several routes, and provides several schemas to get your blog up and running in minutes, not hours.

With built-in pagination, specifying author profiles, creating tags for your articles, and also support for draft articles. `astro-blog` should cover everything you need to get creating content for your website.

Demo here: [astro-blog.futurethemes.io](https://astro-blog.futurethemes.io)

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
- Allows setting a Featured Post when you set `featured: true` in a blog post!

![Screenshot 2024-01-16 085233](https://github.com/futurethemes/astro-blog-plugin/assets/7649031/e7d12968-4e8b-46db-b6fa-7eda5b23b73a)

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
    site: 'https://www.mysite.com',
    integrations: [
        ...,
+       AstroBlog({
+           title: 'My Blog',
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

### Set up Tailwind

Install Tailwind if you don't already have it installed `astro add tailwind`.

Then in your `tailwind.config.mjs` import the content paths from `astro-blog`:

```diff
+ import { AstroBlogTailwindPaths } from 'astro-blog'

/** @type {import('tailwindcss').Config} */
export default {
	content: [
        './src/**/*.{astro,html,js,jsx,ts,tsx}',
+        ...AstroBlogTailwindPaths, // Very important to spread these as it's an array!
    ],
    ...
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

### Config Options

#### Title

Title for your website. Will be used in metadata and as browser tab title.

```ts
AstroBlog({
    title: 'My Site',
})
```

#### blogRoot

These options will get used on your blog root page: `/blog`

##### blogRoot.seo

An object containing config for Astro SEO. 

```ts
AstroBlog({
    blogRoot: {
        seo: {
            description: 'A really cool description full of key words!',
        },
    },
})
```


##### blogRoot.description

Description metadata for your website. Can be used in page metadata.

```ts
AstroBlog({
    blogRoot: {
        description: 'A really cool description full of key words!',
    },
})
```

#### layoutComponent

Your standard layout component.

```ts
AstroBlog({
    layoutComponent: './src/components/layouts/Layout.component',
})
```

#### logo

A string of a path to your logo image.
Or you can specify a light and dark version of your logo

```ts
AstroBlog({
    logo: {
        src: './src/path/to/image.png',
    }
})
```

OR

```ts
AstroBlog({
    logo: {
        light: './src/path/to/image.png',
        dark: './src/path/to/dark-image.png',
    }
})
```

#### paginateSize

_default: 9_

How many blog posts should be visible per page.

```ts
AstroBlog({
    paginateSize: 6,
})
```

#### prerender

_default: true_

Specify whether you want your blog pages to be prerendered. Useful for SSR/Hybrid environments.

```ts
AstroBlog({
    prerender: true,
})
```

### License

MIT - 2024-present, jdtjenkins
