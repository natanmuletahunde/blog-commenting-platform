import CallToAction from '../../../components/CallToAction';
import RecentPosts from '../../../components/RecentPosts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function PostPage({ params }) {
  // ✅ FIX: Await params before using
  const resolvedParams = await params;

  let post = null;
  try {
    const result = await fetch(process.env.URL + '/api/post/get', {
      method: 'POST',
      body: JSON.stringify({ slug: resolvedParams.slug }), // ✅ fixed line
      cache: 'no-store',
    });
    const data = await result.json();
    post = data.posts[0];
  } catch (error) {
    post = { title: 'Failed to load post' };
  }

  if (!post || post.title === 'Failed to load post') {
    return (
      <main className='p-3 flex flex-col items-center justify-center max-w-6xl mx-auto min-h-screen'>
        <h2 className='text-3xl mt-10 p-3 text-center font-serif text-gray-300 bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-lg border border-gray-600 max-w-2xl mx-auto lg:text-4xl'>
          Post not found
        </h2>
      </main>
    );
  }

  return (
    <main className='p-5 flex flex-col max-w-6xl mx-auto min-h-screen'>
      {/* 🏷️ Post Title */}
      <h1 className='text-4xl font-bold mt-10 p-3 text-center font-serif max-w-3xl mx-auto lg:text-5xl text-gray-100'>
        {post && post.title}
      </h1>

      {/* 🔗 Category Tag */}
      <Link
        href={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button
          className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md text-white'
          pill
          size='sm'
        >
          {post && post.category}
        </Button>
      </Link>

      {/* 🖼️ Post Image */}
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover rounded-2xl shadow-lg border border-gray-700'
      />

      {/* 📅 Meta Info */}
      <div className='flex justify-between p-3 border-b border-gray-700 mx-auto w-full max-w-2xl text-sm text-gray-400 mt-4'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post?.content?.length / 1000).toFixed(0)} min read
        </span>
      </div>

      {/* 📝 Post Content */}
      <div
        className='p-5 mt-6 bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg max-w-3xl mx-auto w-full text-gray-200 leading-relaxed post-content'
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>

      {/* 🚀 Call To Action */}
      <div className='max-w-4xl mx-auto w-full mt-10'>
        <CallToAction />
      </div>

      {/* 📰 Recent Posts */}
      <div className='mt-10'>
        <RecentPosts limit={3} />
      </div>
    </main>
  );
}
