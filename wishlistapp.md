# Wishlist App 
    Using:
    - CRUD and Rest
    - Esty API
    - Mongodb
    - Node.js
    - Node dependencies: Morgan, Express, Body-parser, Method-override, Mongoose, Cookie-parser


## /wishlist/createUser
    - User creates their username and places in their 'wish'

## /wishlist/
    - Index page which takes the 'wish' and using Etsy's api, wishlist-app's server requests 5 active listings
    - With the response, product title's are displayed
    - User can also edit their account info

## /wishlist/etsy/:listingid
    - Clicking on any of these products will show their product title, listing id, description, price, quantity and a link to that product on Etsy's page

## /wishlist/:id
    - The edit page changes their username handle & plan
    - There is a link to go back to previous results

## /wishlist/:id/edit
    - Once the info is updated, it will display the results
    - User can also delete their account which will redirect back to /wishlist/create


