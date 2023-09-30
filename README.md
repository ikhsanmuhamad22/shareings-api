# API Usage Documentation for shareings-api

This is an API for My Shareings App, built with Express JS and using the prisma or and postgres on its database side.

## Main Endpoint
**auth:** `/auth/[endpoint]`<br>
**pot:** `/api/[endpoint]`<br>
**comment:** `/api/[endpoint]`<br>
**like:** `/api/[endpoint]`<br>

## Endpoint Description


**Method:** `HTTP Method` (GET/POST/PUT/DELETE)

### auth
It is used for user login and register processes

**POST:** `/auth/register`<br>
**POST:** `/auth/login`<br>

### post
for post data calls and to manipulate such data

**POST:** `/post/createPost`<br>
**GET:** `/post/getAllPost`<br>
**GET:** `/post/getPostBylikes`<br>
**DELETE:** `/post/deletePostByid`<br>

### comment 
to create comment data and manipulate that data

**POST:** `/comment/createComment/:postId`<br>
**DELETE:** `/comment/deleteCommentById/:id`<br>

###likes

for data like purposes

**GET:** `/like/getLikePost/:postId`<br>


