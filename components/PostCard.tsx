import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { PostData } from "@/lib/markdown";

interface PostCardProps {
  post: PostData;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article
      key={post.slug}
      className="flex flex-col sm:flex-row gap-6 items-center bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
    >
      <div className="relative w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={post.coverImage || "/placeholder.png"}
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
            {post.description}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
