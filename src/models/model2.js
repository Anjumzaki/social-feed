import Realm from 'realm';

// Post Schema
class PostSchema extends Realm.Object { }
PostSchema.schema = {
  name: 'Post',
  properties: {
    id: 'int',
    createdTime: 'int',
    postType: 'string',
    postMedia: '{}',
    postDescription: 'string',
    reactionCount: '{}',
    postActivities: '{}',
    user: 'User',
    likes: 'Like[]',
    comments: 'Comment[]'
  },
  primaryKey: 'id',
};

class LikeSchema extends Realm.Object { }
LikeSchema.schema = {
  name: 'Like',
  properties: {
    id: 'int',
    userId: 'int',
    postId: 'int'
  },
  primaryKey: 'id',
};


// User schema
class UserSchema extends Realm.Object { }
UserSchema.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    firstName: 'string',
    lastName: 'string',
    username: 'string',
    profilePicture: 'string',
    aboutMe: 'string',
    pass: 'string'
  },
};

// Comment schema
class CommentSchema extends Realm.Object { }
CommentSchema.schema = {
  name: 'Comment',
  primaryKey: 'id',
  properties: {
    id: 'int',
    date: 'int',
    message: 'string',
    replies: 'Reply[]',
    user: "User",
    post: "Post",
    postId: 'int',
    likes: 'LikeComment[]'
  },
};
class LikeCommentSchema extends Realm.Object { }
LikeCommentSchema.schema = {
  name: 'LikeComment',
  primaryKey: 'id',
  properties: {
    id: 'int',
    date: 'int',
    postId: 'int',
    commentId: 'int',
    userId: 'int'
  },
};
class LikeReplySchema extends Realm.Object { }
LikeReplySchema.schema = {
  name: 'LikeReply',
  primaryKey: 'id',
  properties: {
    id: 'int',
    date: 'int',
    postId: 'int',
    commentId: 'int',
    userId: 'int'
  },
};
class ReplySchema extends Realm.Object { }
ReplySchema.schema = {
  name: 'Reply',
  primaryKey: 'id',
  properties: {
    id: 'int',
    date: 'int',
    message: 'string',
    postId: 'int',
    commentId: 'int',
    userId: 'int',
    user: "User",
    likes: 'LikeReply[]'
  },
};

// Create realm
let realm = new Realm({
  schema: [PostSchema, UserSchema, CommentSchema, LikeSchema, ReplySchema, LikeCommentSchema, LikeReplySchema],
  schemaVersion: 67,
});

// Return all posts
let getAllPosts = () => {
  // realm.write(() => {
  //   realm.deleteAll()
  // })
  return realm.objects('Post');

};

// Add a single post using parameters
let addPost = (
  _id,
  _createdTime,
  _postType,
  _postMedia,
  _postDescription,
  _reactionCount,
  _postActivities,
  _user,
) => {
  realm.write(() => {
    realm.create('Post', {
      id: _id,
      createdTime: _createdTime,
      postType: _postType,
      postMedia: _postMedia,
      postDescription: _postDescription,
      reactionCount: _reactionCount,
      postActivities: _postActivities,
      user: _user,
    });
  });
};

// Post comment in post using parameters
let postComment = (_id, _date, _message, _user, _post, _postId) => {
  realm.write(() => {
    realm.create('Comment', {
      id: _id,
      date: _date,
      message: _message,
      user: _user,
      post: _post,
      postId: _postId
    });
  });
};

// Post comment in post using parameters
let postCommentLike = (_id, _date, _userId, _postId, _commentId) => {
  realm.write(() => {
    let data = realm.objectForPrimaryKey('Comment', _commentId);
    data.likes.push({ id: new Date().getTime() + Math.random(), date: new Date().getTime(), userId: _userId, postId: _postId, commentId: _commentId })
  });
};
let postReplyCommentLike = (_id, _date, _userId, _postId, _commentId) => {
  realm.write(() => {
    let data = realm.objectForPrimaryKey('Reply', _commentId);
    // console.log(_userId)
    data.likes.push({ id: new Date().getTime() + Math.random(), date: new Date().getTime(), userId: _userId, postId: _postId, commentId: _commentId })
  });
};

let postCommentReply = (_id, _date, _userId, _postId, _commentId, _message, _user) => {
  realm.write(() => {
    let data = realm.objectForPrimaryKey('Comment', _commentId);
    console.log(_user)
    data.replies.push({ id: new Date().getTime() + Math.random(), date: new Date().getTime(), userId: _userId, postId: _postId, commentId: _commentId, message: _message, user: _user })
  });
};

// Remove all posts from Realm database
let deleteAllPosts = () => {
  realm.write(() => {
    realm.delete(getAllPosts());
  });
};

// Update all posts that have a null value as edition and update it to 1
let updateAllPostEditions = () => {
  realm.write(() => {
    let posts = getAllPosts();
    posts.map((item, index) => {
      if (item.edition === null) {
        item.edition = 1;
      }
    });
  });
};

let postLike = (id, like) => {
  realm.write(() => {
    let data = realm.objectForPrimaryKey('Post', id);
    data.likes.push({ id: new Date().getTime() + Math.random(), userId: like, postId: id })
  });
};

// Get all posts with more than 400 pages using .filtered()
let getBigPosts = () => {
  return realm.objects('Post').filtered('pages > 400');
};

// Get all users
let getAllUsers = () => {
  return realm.objects('User');
};

// Get all comments
let getAllComments = () => {
  return realm.objects('Comment');
};

// Add a single user using parameters (With a auto increment ID. Read the Tips chapter in the blog post)
let addUser = (
  _id,
  _firstName,
  _lastName,
  _username,
  _profilePicture,
  _aboutMe,
  _pass
) => {
  realm.write(() => {
    const post = realm.create('User', {
      id: _id,
      firstName: _firstName,
      lastName: _lastName,
      username: _username,
      profilePicture: _profilePicture,
      aboutMe: _aboutMe,
      pass: _pass
    });
  });
};

// Remove all users from Realm database
let deleteAllAuthors = () => {
  realm.write(() => {
    realm.delete(getAllUsers());
  });
};

// Get user by index in the array
let getUserById = _id => {
  return realm.objects('User').filtered(`id = ${_id}`);
};

// Get post comments by index in the array
let getCommentById = _id => {
  return realm.objects('Comment').filtered(`postId = ${_id}`);
};

// Get user by index in the array
let getPostById = _id => {
  return realm.objects('Post').filtered(`id = ${_id}`);
};

// Exports
// Export the realm so other files can access it
export default realm;

// Export other functions so other files can access it
export {
  getAllPosts,
  addPost,
  deleteAllPosts,
  updateAllPostEditions,
  getBigPosts,
  getAllUsers,
  addUser,
  getUserById,
  PostSchema,
  UserSchema,
  postLike,
  getPostById,
  postComment,
  getAllComments,
  getCommentById,
  postCommentLike,
  postCommentReply,
  postReplyCommentLike
};
