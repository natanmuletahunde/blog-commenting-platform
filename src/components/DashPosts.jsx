'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';

export default function DashPosts() {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user?.publicMetadata?.userMongoId,
          }),
        });
        const data = await res.json();
        if (res.ok) setUserPosts(data.posts);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (user?.publicMetadata?.isAdmin) fetchPosts();
  }, [user?.publicMetadata?.isAdmin, user?.publicMetadata?.userMongoId]);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch('/api/post/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: postIdToDelete,
          userId: user?.publicMetadata?.userMongoId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserPosts(userPosts.filter((post) => post._id !== postIdToDelete));
        setPostIdToDelete('');
      } else console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className='flex flex-col items-center justify-center h-full w-full py-7'>
        <h1 className='text-2xl font-semibold'>You are not an admin!</h1>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center'>
        Posts Management
      </h1>

      {userPosts.length > 0 ? (
        <div className='shadow-xl rounded-2xl overflow-hidden border dark:border-gray-700 bg-white dark:bg-gray-800 max-w-6xl mx-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date Updated</TableHead>
                <TableHead>Post Image</TableHead>
                <TableHead>Post Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Delete</TableHead>
                <TableHead>Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPosts.map((post) => (
                <TableRow key={post._id} className='hover:bg-purple-50 dark:hover:bg-purple-800 transition-colors'>
                  <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link href={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-24 h-14 object-cover rounded-lg border border-purple-200 dark:border-purple-700'
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='font-semibold text-gray-900 dark:text-gray-100 hover:underline'
                      href={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className='text-purple-600 dark:text-purple-300 font-medium'>{post.category}</TableCell>
                  <TableCell>
                    <span
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                    >
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='text-teal-500 hover:underline font-medium'
                      href={`/dashboard/update-post/${post._id}`}
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className='text-center mt-10 text-gray-500 dark:text-gray-300 text-lg'>
          You have no posts yet!
        </p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className='text-center p-4'>
          <HiOutlineExclamationCircle className='h-16 w-16 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
          <h3 className='mb-5 text-lg text-gray-600 dark:text-gray-300 font-medium'>
            Are you sure you want to delete this post?
          </h3>
          <div className='flex justify-center gap-4'>
            <Button variant='destructive' onClick={handleDeletePost}>
              Yes, I'm sure
            </Button>
            <Button variant='outline' onClick={() => setShowModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
