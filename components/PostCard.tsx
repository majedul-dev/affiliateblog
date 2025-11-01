import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import type { PostData } from '@/lib/markdown'

interface PostCardProps {
  post: PostData
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {format(new Date(post.date), 'MMMM dd, yyyy')}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {post.description}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
