import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import sanitize from 'rehype-sanitize'

const postsDirectory = path.join(process.cwd(), 'content/posts')
const pagesDirectory = path.join(process.cwd(), 'content/pages')

export interface AffiliateLink {
  name: string
  url: string
}

export interface PostData {
  slug: string
  title: string
  date: string
  coverImage: string
  description: string
  affiliateLinks: AffiliateLink[]
  tags: string[]
  content?: string
}

export interface PageData {
  slug: string
  title: string
  content?: string
}

export function getAllPosts(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        coverImage: data.coverImage || '',
        description: data.description || '',
        affiliateLinks: data.affiliateLinks || [],
        tags: data.tags || [],
      }
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      coverImage: data.coverImage || '',
      description: data.description || '',
      affiliateLinks: data.affiliateLinks || [],
      tags: data.tags || [],
      content: contentHtml,
    }
  } catch (error) {
    return null
  }
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const fullPath = path.join(pagesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || '',
      content: contentHtml,
    }
  } catch (error) {
    return null
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}
