import { Metadata } from 'next'
import { getPageBySlug } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with AffiliateBlog.',
}

export default async function ContactPage() {
  const page = await getPageBySlug('contact')

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        {page?.title || 'Contact Us'}
      </h1>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: page?.content || '<p>Content coming soon...</p>' }}
      />
    </div>
  )
}
