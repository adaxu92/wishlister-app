#CRUD APP with REST and API
    -Using Google Shopping API and crud restful routes

##Starting off with '/buy/user' for Users to enter in their username in form
    - If user data does not exist, then there's a link for them to sign up
    - '/createUser' will fill out username: String, buy_products: String
    - when button is clicked, it will res.redirect to router.get('/buy/:id')

### router.get('/buy/:id')
    - When 'Create Button' is clicked, it will res.redirect to '/buy/:id', where router.get a request Google Shopping API
    - In accordance to buy_products, server requests data from Google Shopping and sends json of first 5 items 

### Show page ('/product')
    - Clicking on each product will render a 'show.ejs' page 
    - Generate the api into my schema...then use my schema to access keys and render it into a show.ejs

##Edit
    - Let's edit clients page aka USERNAME

##Update 
    - Update through changing the 'buy_product' to render new results from Google API

##Delete
    - Delete USER



##Notes
- After making merchant or client id, test by creating a get route and info from Etsy or using Postman.
