
The backend folder contains the server-side code, including models for Category, SubCategory, and Item, along with routes for each entity and the main server file `index.js`. The frontend folder contains the client-side code, which is not implemented yet.

## Implemented API Endpoints

### Category Endpoints

- **GET /categories**: Retrieves all categories.
- **GET /categories/:categoryId**: Retrieves a category by its ID.
- **POST /categories**: Creates a new category.
- **PUT /categories/:categoryId**: Updates a category.
- **DELETE /categories/:categoryId**: Deletes a category.

### Subcategory Endpoints

- **GET /subcategories**: Retrieves all subcategories.
- **GET /subcategories/:subCategoryId**: Retrieves a subcategory by its ID.
- **POST /subcategories**: Creates a new subcategory.
- **PUT /subcategories/:subCategoryId**: Updates a subcategory.
- **DELETE /subcategories/:subCategoryId**: Deletes a subcategory.

### Item Endpoints

- **GET /items**: Retrieves all items.
- **GET /items/:itemId**: Retrieves an item by its ID.
- **POST /items**: Creates a new item.
- **PUT /items/:itemId**: Updates an item.
- **DELETE /items/:itemId**: Deletes an item.
- **GET /items/search?name=itemName**: Searches for items by name.

## Getting Started

To run the backend server:

1. Navigate to the `backend` directory.
2. Install dependencies using `npm install`.
3. Start the server using `npm start`.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose


## Short Answers

- **Which database you have chosen and why?**
  - MongoDB: MongoDB was chosen for its flexibility and scalability, especially when dealing with nested data structures like categories, subcategories, and items. Its document-oriented approach allows for easy representation of hierarchical data, making it suitable for this project.

- **3 things that you learned from this assignment?**
  1. Understanding and implementing RESTful API endpoints using Node.js and Express.js.
  2. Working with MongoDB and Mongoose for database operations and schema definition.
  3. Organizing project structure and modularizing code for better maintainability.

- **What was the most difficult part of the assignment?**
  - The most difficult part was handling the nested relationships between categories, subcategories, and items, especially when designing the API endpoints and data models to ensure efficient querying and updating.

- **What you would have done differently given more time?**
  - If I had more time, I  have spent it refining my understanding of the concepts involved and practicing writing cleaner and more efficient code. Additionally, I  have sought out more resources and tutorials to improve my skills in building backend systems using Node.js, Express.js, and MongoDB.
