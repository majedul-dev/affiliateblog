import { PostsGrid } from '@/components/PostsGrid'
import { getAllPosts, getAllTags } from '@/lib/markdown'

export default function Home() {
  const posts = getAllPosts()
  const allTags = getAllTags()

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Product Reviews & Recommendations
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find the best products with our honest, in-depth reviews and buying guides
        </p>
      </section>

      <PostsGrid initialPosts={posts} allTags={allTags} />
    </div>
  )
}
