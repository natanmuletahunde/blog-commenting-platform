'use client';

import { Button } from '@/components/ui/button';
import { Input as TextInput } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { useTheme } from 'next-themes';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // only render theme-aware UI on client
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch('/api/post/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          limit: 9,
          order: sortFromUrl || 'desc',
          category: categoryFromUrl || 'uncategorized',
          searchTerm: searchTermFromUrl,
        }),
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
      setShowMore(data.posts.length === 9);
    };
    fetchPosts();
  }, [searchParams]);

  const handleChange = (e) => {
    if (e.target?.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('searchTerm', sidebarData.searchTerm || '');
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('startIndex', startIndex);
    const res = await fetch('/api/post/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        limit: 9,
        order: sidebarData.sort,
        category: sidebarData.category,
        searchTerm: sidebarData.searchTerm,
        startIndex,
      }),
    });
    if (!res.ok) return;
    const data = await res.json();
    setPosts([...posts, ...data.posts]);
    setShowMore(data.posts.length === 9);
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen text-white ${mounted && theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100 text-gray-900'}`}>
      {/* 🌟 Sidebar with glassmorphism & glow */}
      <div className={`p-7 md:w-72 md:min-h-screen border-b md:border-r border-gray-700/40 backdrop-blur-xl shadow-xl md:sticky md:top-0 flex flex-col justify-between
        ${mounted && theme === 'dark' ? 'bg-gray-900/10' : 'bg-white/5'}`}>
        <form
          className={`flex flex-col gap-6 rounded-2xl p-5 border shadow-[0_0_15px_rgba(0,255,255,0.2)] backdrop-blur-md
            ${mounted && theme === 'dark' ? 'border-gray-600/40 bg-gray-800/50' : 'border-gray-600/40 bg-white/10'}`}
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-teal-400 text-center drop-shadow-md mb-2">
            Filter & Search
          </h2>

          {/* 🔍 Search Term */}
          <div className="flex flex-col gap-2">
            <label className={`font-semibold text-sm ${mounted && theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Search Term
            </label>
            <TextInput
              placeholder="Type to search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className={`border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all
                ${mounted && theme === 'dark' ? 'bg-gray-900/60 border-teal-500/50 text-white' : 'bg-gray-100/60 border-teal-500/50 text-black'}`}
            />
          </div>

          {/* 🔽 Sort */}
          <div className="flex flex-col gap-2">
            <label className={`font-semibold text-sm ${mounted && theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Sort</label>
            <Select
              value={sidebarData.sort}
              onValueChange={(value) =>
                setSidebarData({ ...sidebarData, sort: value })
              }
            >
              <SelectTrigger className={`w-full rounded-xl focus:ring-2 focus:ring-teal-400 transition-all
                ${mounted && theme === 'dark' ? 'bg-gray-900/60 border-teal-500/50 text-white' : 'bg-gray-100/60 border-teal-500/50 text-black'}`}
              >
                <SelectValue placeholder="Select sort order" />
              </SelectTrigger>
              <SelectContent className={`border rounded-md ${mounted && theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white text-gray-900 border-gray-300'}`}>
                <SelectItem value="desc">Latest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 🏷️ Category */}
          <div className="flex flex-col gap-2">
            <label className={`font-semibold text-sm ${mounted && theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Category
            </label>
            <Select
              value={sidebarData.category}
              onValueChange={(value) =>
                setSidebarData({ ...sidebarData, category: value })
              }
            >
              <SelectTrigger className={`w-full rounded-xl focus:ring-2 focus:ring-teal-400 transition-all
                ${mounted && theme === 'dark' ? 'bg-gray-900/60 border-teal-500/50 text-white' : 'bg-gray-100/60 border-teal-500/50 text-black'}`}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className={`border rounded-md ${mounted && theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white text-gray-900 border-gray-300'}`}>
                <SelectItem value="uncategorized">Uncategorized</SelectItem>
                <SelectItem value="reactjs">React.js</SelectItem>
                <SelectItem value="nextjs">Next.js</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 🧭 Apply Filters Button */}
          <Button
            type="submit"
            className="bg-teal-600 hover:bg-teal-500 transition-all duration-300 text-white font-semibold py-2 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]"
          >
            Apply Filters
          </Button>
        </form>
      </div>

      {/* 📰 Main content area */}
      <div className="w-full">
        <h1 className="text-3xl font-bold border-b border-gray-600/50 p-5 mt-5 text-center md:text-left text-teal-300">
          Posts Results
        </h1>
        <div className="p-7 flex flex-wrap justify-center md:justify-start gap-6">
          {!loading && posts.length === 0 && (
            <p className={`text-lg ${mounted && theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No posts found.</p>
          )}
          {loading && (
            <p className={`text-lg ${mounted && theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</p>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-400 text-lg hover:underline hover:text-teal-300 p-5 w-full text-center font-medium"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
