// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { remark } from "remark";
// import html from "remark-html";
// import sanitize from "rehype-sanitize";

// const postsDirectory = path.join(process.cwd(), "content/posts");
// const pagesDirectory = path.join(process.cwd(), "content/pages");

// export interface AffiliateLink {
//   name: string;
//   url: string;
// }

// export interface PostData {
//   slug: string;
//   title: string;
//   date: string;
//   coverImage: string;
//   description: string;
//   affiliateLinks: AffiliateLink[];
//   tags: string[];
//   content?: string;
// }

// export interface PageData {
//   slug: string;
//   title: string;
//   content?: string;
// }

// export function getAllPosts(): PostData[] {
//   if (!fs.existsSync(postsDirectory)) {
//     return [];
//   }

//   const fileNames = fs.readdirSync(postsDirectory);
//   const allPostsData = fileNames
//     .filter((fileName) => fileName.endsWith(".md"))
//     .map((fileName) => {
//       const slug = fileName.replace(/\.md$/, "");
//       const fullPath = path.join(postsDirectory, fileName);
//       const fileContents = fs.readFileSync(fullPath, "utf8");
//       const { data } = matter(fileContents);

//       return {
//         slug,
//         title: data.title || "",
//         date: data.date || "",
//         coverImage: data.coverImage || "",
//         description: data.description || "",
//         affiliateLinks: data.affiliateLinks || [],
//         tags: data.tags || [],
//       };
//     });

//   return allPostsData.sort((a, b) => {
//     if (a.date < b.date) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
// }

// export async function getPostBySlug(slug: string): Promise<PostData | null> {
//   try {
//     const fullPath = path.join(postsDirectory, `${slug}.md`);
//     const fileContents = fs.readFileSync(fullPath, "utf8");
//     const { data, content } = matter(fileContents);

//     const processedContent = await remark()
//       .use(html, { sanitize: false })
//       .process(content);
//     const contentHtml = processedContent.toString();

//     return {
//       slug,
//       title: data.title || "",
//       date: data.date || "",
//       coverImage: data.coverImage || "",
//       description: data.description || "",
//       affiliateLinks: data.affiliateLinks || [],
//       tags: data.tags || [],
//       content: contentHtml,
//     };
//   } catch (error) {
//     return null;
//   }
// }

// export async function getPageBySlug(slug: string): Promise<PageData | null> {
//   try {
//     const fullPath = path.join(pagesDirectory, `${slug}.md`);
//     const fileContents = fs.readFileSync(fullPath, "utf8");
//     const { data, content } = matter(fileContents);

//     const processedContent = await remark()
//       .use(html, { sanitize: false })
//       .process(content);
//     const contentHtml = processedContent.toString();

//     return {
//       slug,
//       title: data.title || "",
//       content: contentHtml,
//     };
//   } catch (error) {
//     return null;
//   }
// }

// export function getAllTags(): string[] {
//   const posts = getAllPosts();
//   const tagsSet = new Set<string>();

//   posts.forEach((post) => {
//     post.tags.forEach((tag) => tagsSet.add(tag));
//   });

//   return Array.from(tagsSet).sort();
// }

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface AffiliateLink {
  name: string;
  url: string;
}

export interface PostData {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  description: string;
  affiliateLinks: AffiliateLink[];
  tags: string[];
  content?: string;
}

export interface PageData {
  slug: string;
  title: string;
  content?: string;
}

// === CONFIGURATION ===
const GITHUB_USER = "majedul-dev"; // e.g. "mazedulislamdev"
const GITHUB_REPO = "affiliateblog"; // e.g. "affiliate-blog"
const BRANCH = "master"; // or "master"
const POSTS_PATH = "content/posts";
const PAGES_PATH = "content/pages";

const headers: HeadersInit = process.env.GITHUB_TOKEN
  ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  : {};

// Helper to fetch GitHub JSON
async function fetchGitHubJSON(url: string) {
  const res = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

// === POSTS ===
export async function getAllPosts(): Promise<PostData[]> {
  const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${POSTS_PATH}?ref=${BRANCH}`;
  const files = await fetchGitHubJSON(apiUrl);

  const allPostsData: PostData[] = await Promise.all(
    files
      .filter((f: any) => f.name.endsWith(".md"))
      .map(async (f: any) => {
        const slug = f.name.replace(/\.md$/, "");
        const raw = await fetch(f.download_url, { headers });
        const text = await raw.text();
        const { data } = matter(text);

        return {
          slug,
          title: data.title || "",
          date: data.date || "",
          coverImage: data.coverImage || "",
          description: data.description || "",
          affiliateLinks: data.affiliateLinks || [],
          tags: data.tags || [],
        };
      })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}/${POSTS_PATH}/${slug}.md`;
    const res = await fetch(rawUrl, { headers });
    if (!res.ok) return null;

    const text = await res.text();
    const { data, content } = matter(text);

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      coverImage: data.coverImage || "",
      description: data.description || "",
      affiliateLinks: data.affiliateLinks || [],
      tags: data.tags || [],
      content: contentHtml,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// === PAGES ===
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}/${PAGES_PATH}/${slug}.md`;
    const res = await fetch(rawUrl, { headers });
    if (!res.ok) return null;

    const text = await res.text();
    const { data, content } = matter(text);

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || data.title || "",
      content: contentHtml,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// === TAGS ===
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}
