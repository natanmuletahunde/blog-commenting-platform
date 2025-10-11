import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();

    const { title, content, category, image, userMongoId } = await request.json();

    // Validate required fields
    if (!title || !content || !userMongoId) {
      return NextResponse.json(
        { message: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    // Check if user exists and is admin
    const user = await User.findById(userMongoId);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    // Check if post with same slug already exists
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { message: 'A post with this title already exists' },
        { status: 400 }
      );
    }

    // Create new post
    const post = new Post({
      title,
      content,
      category: category || 'uncategorized',
      image: image || null,
      slug,
      authorId: userMongoId,
      authorName: user.username,
    });

    await post.save();

    return NextResponse.json(
      {
        message: 'Post created successfully',
        post: {
          id: post._id,
          title: post.title,
          slug: post.slug,
          category: post.category,
          createdAt: post.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating post:', error);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'A post with this title already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}