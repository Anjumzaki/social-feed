import Realm from 'realm';

// BookSchema => PostSchema
// AuthorSchema => UserSchema

// Declare Post Schema
class PostSchema extends Realm.Object {}
PostSchema.schema = {
  name: 'Post',
  primaryKey: 'id',
  properties: {
    id: 'int',
    user: 'User?',
    description: 'string',
    attachments: 'data',
    createdTime: 'int?',
    own_reactions: 'data',
    total_reaction_count_in_post: 'data',
  },
};

// User schema
class UserSchema extends Realm.Object {}
UserSchema.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    username: 'string',
    firstName: 'string',
    lastName: 'string',
    createdTime: 'int?',
    dp: 'string',
    about: 'string',
  },
};

// Create realm
let realm = new Realm({schema: [PostSchema, UserSchema], schemaVersion: 4});

// Functions
// Return all posts
let getAllPosts = () => {
  return realm.objects('Post');
};

// Add a single post using parameters
let addPost = (
  _id,
  _user,
  _description,
  _attachments,
  _createdTime,
  _own_reactions,
  _total_reaction_count_in_post,
) => {
  realm.write(() => {
    const post = realm.create('Post', {
      id: _id,
      user: _user,
      description: _description,
      attachments: _attachments,
      createdTime: _createdTime,
      own_reactions: _own_reactions,
      total_reaction_count_in_post: _total_reaction_count_in_post,
    });
  });
};

// Remove all posts from Realm database
let deleteAllPosts = () => {
  realm.write(() => {
    realm.delete(getAllPosts());
  });
};

// Update all books that have a null value as edition and update it to 1
let updateAllPostEditions = () => {
  realm.write(() => {
    let books = getAllPosts();
    books.map((item, index) => {
      if (item.edition === null) {
        item.edition = 1;
      }
    });
  });
};

// Get all books with more than 400 pages using .filtered()
let getBigPosts = () => {
  return realm.objects('Post').filtered('pages > 400');
};

// Get all authors
let getAllUsers = () => {
  return realm.objects('User');
};

// Add a single user using parameters (With a auto increment ID. Read the Tips chapter in the blog post)
let addUser = (
  _id,
  _username,
  _firstName,
  _lastName,
  _createdTime,
  _dp,
  _about,
) => {
  realm.write(() => {
    const post = realm.create('User', {
      id: _id,
      username: _username,
      firstName: _firstName,
      lastName: _lastName,
      createdTime: _createdTime,
      dp: _dp,
      about: _about
    });
  });
};

// Get user by index in the array
let getAuthorById = _id => {
  return realm.objects('User').filtered(`id = ${_id}`);
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
  getAuthorById,
};
