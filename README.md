# WheelShare

By Michael Fatemi, Joshua Hsueh, Nitin Kanchinadam, Rushil Umaretiya

(Frontend Repository created with Create React App)

## Inspiration
At TJ, many people are spread around several counties, and transportation becomes a difficult problem. It’s hard to communicate and organize groups for carpooling, and many after-school activities do not offer transportation to go back home. One of our members, Rushil, has a daily commute of about 1 hour and 45 minutes, and he also participates in quite a few sports and extracurriculars. It's always been a struggle to find people who live nearby who commute around the same times, wasting not only gas but parents time as well. We needed a solution to easily connect different people going to different places, so why don't we share?

## What it does
WheelShare allows users to easily and safely organize carpools with other people. Each user can create or join groups with other people. For example, an user could join a group for students at their school or for their little league baseball team. Within each group, users can post requests or offers for carpools that other members of the group can look at. Users can then look at the waypoints for each pool in the group and easily register for the pool that would be most convenient for them. All members of a pool can then interact with each other to further coordinate pick up and drop off using the built-in comments and chat features.

## How we built it
We built this web application with the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS). We decided to implement this stack with Typescript. We also utilized Material UI to style all our components. We implement the Google Maps API and React Google Maps libraries to suggest locations based on the search text as well as display the set addresses on a map.

## Accomplishments that we're proud of
We are proud of integrating the Google Maps API with React and implementing groups, posts, comments, users, and authentication on a serverless setup. To create the WheelShare API, develop the frontend, and give it a good user experience, required a lot of teamwork and collaboration and it was great to be able to pull it off. Some of our members were not familiar with the frameworks we were using, but as we worked together, we were all comfortable with them.

## What we learned
A lot of us were inexperienced with TypeScript and JavaScript frameworks in general. However, with team collaboration and dedication we were able to persevere and learn how to apply Typescript and React efficiently. We also learned a lot about integrating the various features of the Google Maps API with ReactJS. 

## What's next for WheelShare
Although WheelShare provides the capability for users to join pools and groups, currently, the only way for members of a pool to communicate with each other is through the comments of the pool. This method of communication is also available to all people in the group and not just exclusive to the members of the pool. Therefore, one of the next features to be implemented is a group chat features for members of each pool. In addition, we will bring the app to React Native and add different OAuth endpoints to enable sign-in from a variety of places such as GitHub and Google rather than just the TJ Intranet.
