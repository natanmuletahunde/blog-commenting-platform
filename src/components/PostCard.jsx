import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 overflow-hidden rounded-xl sm:w-[430px] transition-all duration-300 bg-slate-950">
      <Link href={`/post/${post.slug}`}>
        <div className="relative w-full h-[280px] bg-slate-900 flex items-center justify-center overflow-hidden">
          <img
            src={post.image}
            alt={post.title || "post cover"}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2 text-slate-100">
          {post.title}
        </p>
        <span className="italic text-sm text-slate-400">
          {post.category}
        </span>

        <Link
          href={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
