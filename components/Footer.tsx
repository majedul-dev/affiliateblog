export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} AffiliateBlog. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Disclosure: This site contains affiliate links. We may earn a commission if you make a purchase.
          </p>
        </div>
      </div>
    </footer>
  )
}
