import Post from '../../../../lib/models/post.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';
import { currentUser } from '@clerk/nextjs/server';

export const PUT = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();

    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const post = await Post.findById(data.postId);
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    const authorId = user.publicMetadata?.userMongoId || user.id;
    if (String(post.userId) !== String(authorId)) {
      return new Response('Unauthorized', { status: 401 });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      data.postId,
      {
        $set: {
          title: data.title,
          content: data.content,
          category: data.category,
          image: data.image,
        },
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedPost), {
      status: 200,
    });
  } catch (error) {
    console.log('Error updating post:', error);
    return new Response('Error updating post', {
      status: 500,
    });
  }
};
