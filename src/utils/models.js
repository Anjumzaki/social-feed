// const SocialFeedSchema = {
//     name: 'SocialFeed',
//     properties: {
//       foreign_id: 'int',
//       origin: 'string',
//       text: 'string',
//       time: "date",
//       attachments: {
//         images: "array",
//         videos: "array",
//       },
//       target: 'string',
//       // REACTIONS
//       own_reactions: {
//         comment: [
//           {
//             children_counts: {
//               like: 'int',
//             },
//             parent: 'string',
//             created_at: "date",
//             data: {
//               text: 'string',
//             },
//             activity_id: 'string',
//             user: {
//               created_at: "date",
//               updated_at: "date",
//               id: 'string',
//               data: {
//                 coverImage: 'string',
//                 desc: 'string',
//                 name: 'string',
//                 profileImage: 'string',
//                 url: 'string',
//               },
//             },
//             user_id: 'string',
//             kind: 'string', // comment
//             updated_at: "date",
//             latest_children: {
//               like: [
//                 {
//                   children_counts: {},
//                   parent: 'string',
//                   created_at: 'string',
//                   data: {},
//                   activity_id: 'string',
//                   user: {
//                     created_at: "date",
//                     updated_at: "date",
//                     id: 'string',
//                     data: {
//                       coverImage: 'string',
//                       desc: 'string',
//                       name: 'string',
//                       profileImage: 'string',
//                       url: 'string',
//                     },
//                   },
//                   user_id: 'string',
//                   kind: 'string', // like
//                   updated_at: "date",
//                   latest_children: {},
//                   id: 'string',
//                 },
//               ],
//             },
//             id: 'string',
//           },
//           {
//             children_counts: {
//               like: 0,
//             },
//             parent: '',
//             created_at: "date",
//             data: {
//               text: 'string',
//             },
//             activity_id: 'string',
//             user: {
//               created_at: "date",
//               updated_at: "date",
//               id: 'string',
//               data: {
//                 coverImage:
//                   'string',
//                 desc: 'string',
//                 name: 'string',
//                 profileImage:
//                   'string',
//                 url: 'string',
//               },
//             },
//             user_id: 'string',
//             kind: 'string', // comment
//             updated_at: "date",
//             latest_children: {},
//             id: 'string',
//           },
//         ],
//         like: [
//           {
//             children_counts: {},
//             parent: '',
//             created_at: "date",
//             data: {},
//             activity_id: 'string',
//             user: {
//               created_at: "date",
//               updated_at: "date",
//               id: 'string',
//               data: {
//                 coverImage:
//                   'string',
//                 desc: 'string',
//                 name: 'string',
//                 profileImage:
//                   'string',
//                 url: 'string',
//               },
//             },
//             user_id: 'string',
//             kind: 'string', // like
//             updated_at: "date",
//             latest_children: {},
//             id: 'string',
//           },
//         ],
//       },
//       // USER
//       user: {
//         created_at: "date",
//         updated_at: "date",
//         id: 'string',
//         data: {
//           coverImage: 'string',
//           desc: 'string',
//           name: 'string',
//           profileImage: 'string',
//           url: 'string',
//         },
//       },
//       // TOTAL REACTION COUNT
//       reaction_counts: {
//         comment: 'int',
//         like: 'int',
//       },
//       id: 'string',
//       verb: 'string',
//       object: 'string',

//       // _id: 'int',
//       // name: 'string',
//       // status: 'string?',
//       // title: 'string?',
//       // timestamp: 'string?',
//       // description: 'string?',
//       // profilePicture: 'string?',
//       // media: 'string?',
//       // mediaType: 'string?',
//     },
//     primaryKey: '_id',
//   };