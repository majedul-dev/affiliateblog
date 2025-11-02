// "use client";

// import { useState, useMemo } from "react";
// import { PostCard } from "./PostCard";
// import type { PostData } from "@/lib/markdown";

// interface PostsGridProps {
//   initialPosts: PostData[];
//   allTags: string[];
// }

// export function PostsGrid({ initialPosts, allTags }: PostsGridProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedTag, setSelectedTag] = useState<string>("");

//   const filteredPosts = useMemo(() => {
//     return initialPosts.filter((post) => {
//       const matchesSearch =
//         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.description.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
//       return matchesSearch && matchesTag;
//     });
//   }, [initialPosts, searchQuery, selectedTag]);

//   return (
//     <>
//       <div className="mb-8 space-y-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <input
//             type="text"
//             placeholder="Search posts..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <select
//             value={selectedTag}
//             onChange={(e) => setSelectedTag(e.target.value)}
//             className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Tags</option>
//             {allTags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag}
//               </option>
//             ))}
//           </select>
//         </div>
//         {(searchQuery || selectedTag) && (
//           <p className="text-gray-600 dark:text-gray-400">
//             Found {filteredPosts.length} post
//             {filteredPosts.length !== 1 ? "s" : ""}
//           </p>
//         )}
//       </div>

//       {filteredPosts.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-600 dark:text-gray-400 text-lg">
//             No posts found. Try adjusting your search or filters.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPosts.map((post) => (
//             <PostCard key={post.slug} post={post} />
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// "use client";

// import { useState, useMemo } from "react";
// import { PostCard } from "./PostCard"; // Optional if you still want a reusable card
// import type { PostData } from "@/lib/markdown";
// import Image from "next/image";
// import Link from "next/link";

// interface PostsGridProps {
//   initialPosts: PostData[];
//   allTags: string[];
// }

// export function PostsGrid({ initialPosts, allTags }: PostsGridProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedTag, setSelectedTag] = useState<string>("");

//   const filteredPosts = useMemo(() => {
//     return initialPosts.filter((post) => {
//       const matchesSearch =
//         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.description.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
//       return matchesSearch && matchesTag;
//     });
//   }, [initialPosts, searchQuery, selectedTag]);

//   return (
//     <section className="w-full max-w-5xl mx-auto">
//       {/* Search + Filter */}
//       <div className="mb-10 space-y-4">
//         <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
//           <input
//             type="text"
//             placeholder="🔍 Search posts..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-1 px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//           />
//           <select
//             value={selectedTag}
//             onChange={(e) => setSelectedTag(e.target.value)}
//             className="px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//           >
//             <option value="">All Tags</option>
//             {allTags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag.charAt(0).toUpperCase() + tag.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>

//         {(searchQuery || selectedTag) && (
//           <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
//             Found <span className="font-semibold">{filteredPosts.length}</span>{" "}
//             post{filteredPosts.length !== 1 ? "s" : ""}
//           </p>
//         )}
//       </div>

//       {/* Posts List */}
//       {filteredPosts.length === 0 ? (
//         <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
//           <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
//             No posts found 😔
//           </p>
//           <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
//             Try a different search or tag filter.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-10">
//           {filteredPosts.map((post) => (
//             <article
//               key={post.slug}
//               className="
//                 group flex flex-col sm:flex-row gap-6
//                 items-start p-6 rounded-2xl border border-gray-200 dark:border-gray-800
//                 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-shadow duration-300
//               "
//             >
//               {/* Image */}
//               {post.image && (
//                 <Link href={`/blog/${post.slug}`} className="sm:w-1/3 w-full">
//                   <div className="relative w-full h-56 sm:h-48 overflow-hidden rounded-xl">
//                     <Image
//                       src={post.image}
//                       alt={post.title}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                 </Link>
//               )}

//               {/* Content */}
//               <div className="flex flex-col justify-between sm:w-2/3 space-y-4">
//                 <header>
//                   <Link href={`/blog/${post.slug}`}>
//                     <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                       {post.title}
//                     </h2>
//                   </Link>
//                   <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
//                     {new Date(post.date).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </header>

//                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
//                   {post.description}
//                 </p>

//                 <div className="flex flex-wrap items-center gap-2">
//                   {post.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>

//                 <div>
//                   <Link
//                     href={`/blog/${post.slug}`}
//                     className="inline-block mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
//                   >
//                     Read more →
//                   </Link>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// "use client";

// import { useState, useMemo, useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import type { PostData } from "@/lib/markdown";
// import { PostCard } from "./PostCard";

// interface PostsGridProps {
//   initialPosts: PostData[];
//   allTags: string[];
// }

// export function PostsGrid({ initialPosts, allTags }: PostsGridProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedTag, setSelectedTag] = useState<string>("");
//   const [visibleCount, setVisibleCount] = useState(3); // Load first 6 posts
//   const loaderRef = useRef<HTMLDivElement | null>(null);

//   // Filter posts by search and tag
//   const filteredPosts = useMemo(() => {
//     return initialPosts.filter((post) => {
//       const matchesSearch =
//         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.description.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
//       return matchesSearch && matchesTag;
//     });
//   }, [initialPosts, searchQuery, selectedTag]);

//   // Infinite scroll logic
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         if (entry.isIntersecting) {
//           setVisibleCount((prev) => prev + 6); // Load 6 more
//         }
//       },
//       { root: null, rootMargin: "200px", threshold: 0.1 }
//     );

//     if (loaderRef.current) observer.observe(loaderRef.current);
//     return () => {
//       if (loaderRef.current) observer.unobserve(loaderRef.current);
//     };
//   }, [filteredPosts]);

//   const visiblePosts = filteredPosts.slice(0, visibleCount);

//   return (
//     <section className="w-full max-w-5xl mx-auto">
//       {/* Search + Filter */}
//       <div className="mb-10 space-y-4">
//         <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
//           <input
//             type="text"
//             placeholder="🔍 Search posts..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-1 px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//           />
//           <select
//             value={selectedTag}
//             onChange={(e) => setSelectedTag(e.target.value)}
//             className="px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//           >
//             <option value="">All Tags</option>
//             {allTags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag.charAt(0).toUpperCase() + tag.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>

//         {(searchQuery || selectedTag) && (
//           <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
//             Found <span className="font-semibold">{filteredPosts.length}</span>{" "}
//             post{filteredPosts.length !== 1 ? "s" : ""}
//           </p>
//         )}
//       </div>

//       {/* Posts List */}
//       {visiblePosts.length === 0 ? (
//         <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
//           <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
//             No posts found 😔
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-10">
//           {visiblePosts.map((post) => (
//             <PostCard post={post} key={post.slug} />
//           ))}
//         </div>
//       )}

//       {/* Infinite Scroll Loader */}
//       {visibleCount < filteredPosts.length && (
//         <div
//           ref={loaderRef}
//           className="flex justify-center items-center py-10 text-gray-500 dark:text-gray-400"
//         >
//           <span className="animate-pulse">Loading more posts...</span>
//         </div>
//       )}
//     </section>
//   );
// }
"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import type { PostData } from "@/lib/markdown";
import { PostCard } from "./PostCard";

interface PostsGridProps {
  initialPosts: PostData[];
  allTags: string[];
}

export function PostsGrid({ initialPosts, allTags }: PostsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(6); // Load first 6 posts
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Filter posts by search and tag
  const filteredPosts = useMemo(() => {
    const postsArray = Array.isArray(initialPosts) ? initialPosts : [];
    const query = searchQuery.toLowerCase();

    return postsArray.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query);
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [initialPosts, searchQuery, selectedTag]);

  const visiblePosts = useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount]
  );

  // Infinite scroll logic
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setVisibleCount((prev) => {
          if (prev < filteredPosts.length) return prev + 6;
          return prev;
        });
      }
    },
    [filteredPosts.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "300px",
      threshold: 0,
    });
    const node = loaderRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [handleIntersection]);

  return (
    <section className="w-full max-w-5xl mx-auto">
      {/* 🔍 Search + Filter */}
      <div className="mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="🔍 Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">All Tags</option>
            {Array.isArray(allTags) && allTags.length > 0 ? (
              allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))
            ) : (
              <option disabled>No tags</option>
            )}
          </select>
        </div>

        {(searchQuery || selectedTag) && (
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
            Found <span className="font-semibold">{filteredPosts.length}</span>{" "}
            post{filteredPosts.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* 📰 Posts List */}
      {visiblePosts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
            No posts found 😔
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {visiblePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Infinite Scroll Loader */}
      {visibleCount < filteredPosts.length && (
        <div
          ref={loaderRef}
          className="flex justify-center items-center py-10 text-gray-500 dark:text-gray-400"
        >
          <span className="animate-pulse">Loading more posts...</span>
        </div>
      )}
    </section>
  );
}
