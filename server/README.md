# Welcome to Mazad PHP Server

This server is designed to power an exciting bidding site where users can create and participate in auctions for various products. It offers a range of features to facilitate the bidding process and provide an engaging user experience.

## Key Features

- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT) for access to protected routes and resources.

- **Product Management**: Create, view, and manage products available for auction, complete with descriptions and images.

- **Auction Management**: Set up auction listings with specified end times and minimum bid prices.

- **Real-time Bidding**: Incorporate real-time bidding capabilities through WebSockets for dynamic auction experiences.

- **Error Handling**: Comprehensive error handling with clear and informative responses.

- **Database Integration**: Seamlessly interact with a MySQL database to store and retrieve user, product, and bid information.

This README provides guidelines and information on how to use this server effectively. If you're a developer looking to integrate this server into your project or want to learn how to make API requests, you've come to the right place!

## Getting Started

### Prerequisites

- PHP
- Composer (for managing PHP dependencies)
- MySQL database

### Installation

1. Clone the repository:
   git clone https://github.com/yourusername/your-php-server.git

2. Install PHP dependencies using Composer:  
   composer install

3. Create a database and configure your environment variables (see .env.example):

   - Duplicate .env.example as .env and update the values.
   - Update database credentials in .env.

4. Migrate the database:
   php artisan migrate

5. Start the server:
   php -S localhost:8000

## Usage

### Starting the Server

To start the server, run the following command from the project's root directory:

php -S localhost:8000

### API Endpoints

NOTE: Every route that is secured requires authentication with a valid access token which is required after logging in.

### `POST /authentication/signup`

- **Description**: Register a new user.
- **Data to Include**:
  - Request Method: POST
  - Request Body: JSON Object
  - Required Fields:
    - `username` (string): The user's desired username.
    - `email` (string): The user's email.
    - `password` (string): The user's password.
    - `address` (string): The user's address.
    - `phoneNumber` (string): The user's phone number.
  - Example Request:
    ```json
    {
      "username": "newuser",
      "email": "newuser@example.com",
      "password": "secretpassword",
      "address": "123 Main St",
      "phoneNumber": "555-555-5555"
    }
    ```
  - Example Response:
    ```json
    {
        "success": true,
        "message": "User created successfully",
        "statusCode": 201,
        "user": {
        "id": 123,
        "name": "User",
        ...
      },
        "token": "your-access-token"
    }
    ```
- **Error Handling**:
  - Handle cases where the email already exists, validation errors, or other potential errors.

### POST REQUESTS

### `POST /authentication/login`

- **Description**: login a user.
- **Data to Include**:
  - Request Method: POST
  - Request Body: JSON Object
  - Required Fields:
    - `email` (string): The user's email.
    - `password` (string): The user's password.
  - Example Request:
    ```json
    {
      "email": "user@example.com",
      "password": "secretpassword"
    }
    ```
  - Example Response:
    ```json
    {
      "success": true,
      "message": "Login successful",
      "statusCode": 200,
      "user": {
        "id": 123,
        "name": "User",
        ...
      },
      "token": "your-access-token"
    }
    ```
- **Error Handling**:

  - Handle invalid email, incorrect password, or other potential errors.

### SECURED `POST /products/manage/add`

**Description**: Add a new product to the system.

**Data to Include**:

- **Request Method**: POST
- **Request Body**: JSON Object
- **Required Fields**:
  - `name` (string): The name of the product.
  - `description` (string): The description of the product.
  - `image` (string): The URL or file path of the product image.
- **Example Request**:

  ```json
  {
    "name": "Sample Product",
    "description": "This is a sample product description.",
    "image": "https://example.com/sample.jpg"
  }
  ```

  - **Example Response**:
    ```json
    {
    "success": true,
    "message": "Product added successfully",
    "statusCode": 201,
    "product": {
    "id": 456,
    "userId": 123,
    "name": "Sample Product",
    "description": "This is a sample product description.",
    "image": "https://example.com/sample.jpg",
    ...
    }
    }
    ```

### SECURED `GET /products/user/get`

## Note you can search the products by setting a search value in the params example: `GET /products/user/get?search=ring`

Retrieve products of a specific user. (each user has his own products collection and no one else can see or manage them unless he add them to a bid)

- **Description**: Retrieve products associated with a specific user.
- **Authentication**: Requires a valid access token.
- **Data to Include**:
  - Request Method: GET
  ```
  GET /products/user/get
  ```
- Example Response:
  ```json
  {
    "success": true,
    "message": "User products retrieved successfully",
    "statusCode": 200,
    "products": [
      {
        "id": 1,
        "name": "Product 1",
        "description": "Description of Product 1",
        "image": "product_image1.jpg",
        ...
      },
      {
        "id": 2,
        "name": "Product 2",
        "description": "Description of Product 2",
        "image": "product_image2.jpg",
        ...
      },
      ...
    ]
  }
  ```
- Error Handling:

  - Handle cases where no products are found for the user.
  - Handle database-related errors if the query fails.

Certainly, here's a description for the `/products/user/:id` route to add to your readme file:

### `GET /products/:id`

- **Description**: Retrieve product by id.
- **Authentication**: Requires a valid access token.
- **Data to Include**:
  - Request Method: GET
  - Request Parameters:
    - `id` (integer): The product's ID.
- Example Request:
  ```
  GET /products/123
  ```
- Example Response:

  ```json
  {
    "success": true,
    "message": "product retrieved successfully",
    "statusCode": 200,
    "product":
      {
        "id": 1,
        "name": "Product 1",
        "description": "Description of Product 1",
        "image": "product_image1.jpg",
        ...
      }

  }
  ```

### SECURED `POST /bids/manage/add`

**Description**: Add a new bid to the system.

**Data to Include**:

- **Request Method**: POST
- **Request Body**: JSON Object
- **Required Fields**:
  - `productId` (integer): The ID of the product for which the bid is placed.
  - `bidderId` (integer): The ID of the user placing the bid.
  - `min_bid` (decimal): The minimum bid amount for the product.
  - `end_time` (datetime): The date and time when the bid will end (ISO 8601 format).
- **Example Request**:

  ````json
  {
    "productId": 123,
    "bidderId": 456,
    "min_bid": 100.00,
    "end_time": "2023-12-31T23:59:59"
  }


  - **Example Response**:
    ```json
    {
  "success": true,
  "message": "Bid added successfully",
  "statusCode": 201,
  "bid": {
    "id": 789,
    "productId": 123,
    "bidderId": 456,
    "min_bid": 100.00,
    "end_time": "2023-12-31T23:59:59",
    ...
  }
  }

  ````

### SECURED `GET /bids`

**Description**: Retrieve all bids that were added by other users (not including the user's own bids).
**Search by Product name and description** `GET /bids?search=hoodie`

**Data to Include**:

- **Request Method**: GET
- **Request URL**: `/bids`

**Example Response**:

```json
{
  "success": true,
  "message": "Bids retrieved successfully",
  "statusCode": 200,
  "bids": [
    {
      "id": 1,
      "productId": 123,
      "bidderId": 456,
      "min_bid": 50.00,
      "created_at": "2023-10-25 14:30:00",
      "end_time": "2023-10-27 16:45:00",
      ...
    },
    {
      "id": 2,
      "productId": 789,
      "bidderId": 123,
      "min_bid": 60.00,
      "created_at": "2023-10-25 15:45:00",
      "end_time": "2023-10-27 18:00:00",
      ...
    },
    ...
  ]
}
```

### SECURED `GET /bids/userBids`

**Description**: Retrieve all bids for the user that is logged in.

**Data to Include**:

- **Request Method**: GET
- **Request URL**: `/bids/userBids`

**Example Response**:

```json
{
  "success": true,
  "message": "Bids retrieved successfully",
  "statusCode": 200,
  "bids": [
    {
      "id": 1,
      "productId": 123,
      "bidderId": 1,
      "min_bid": 50.00,
      "created_at": "2023-10-25 14:30:00",
      "end_time": "2023-10-27 16:45:00",
      ...
    },
    {
      "id": 2,
      "productId": 789,
      "bidderId": 1,
      "min_bid": 60.00,
      "created_at": "2023-10-25 15:45:00",
      "end_time": "2023-10-27 18:00:00",
      ...
    },
    ...
  ]
}
```

### SECURED `POST /bids/place`

**Description**: Place a bid on a specific product (NOTE: if a bid is already placed it will be updated automatically).

**Data to Include**:

- **Request Method**: POST
- **Request Body**: JSON Object
- **Required Fields**:
  - `bidId` (integer): The ID of the bid that the user is placing a bid on.
  - `bidAmount` (decimal): The bid amount placed by the user.
- **Example Request**:

  ```json
  POST /bids/place
  Request Body:
  {
    "bidId": 789,
    "bidAmount": 100.00
  }
  ```

- **Example Response**:

  ```json
  {
    "success": true,
    "message": "Bid placed successfully",
    "statusCode": 201,
    "bid": {
      "id": 789,
      "productId": 123,
      "bidderId": 456,
      "bidAmount": 100.00,
      "created_at": "2023-12-31 14:30:00",
      "end_time": "2023-12-31 16:45:00",
      ...
    }
  }
  ```

### SECURED `POST /bids/getHighestBid`

**Description**: Get the highest bid inserted by a user on a specific bid.

**Data to Include**:

- **Request Method**: POST
- **Request Body**: JSON Object
- **Required Fields**:
  - `bidId` (integer): The ID of the bid.
- **Example Request**:

  ```json
  POST /bids/getHighestBid
  Request Body:
  {
    "bidId": 789,
  }
  ```

- **Example Response**:

  ```json
  {
    "success": false,
    "message": "no bid with this specific ID",
    "statusCode": 404,
    "highestBid": null
  }
  ```

- **Example success Response**:

  ```json
  {
    "success": true,
    "message": "highest bid retrieved successfully",
    "statusCode": 200,
    "highestBid": "130.00"
  }
  ```

## SECURED `POST /users/getById`

- **Method**: POST
- **Description**: Retrieve user information by user ID.
- **Request Example**:

  ```json
  POST /users/getById
  Content-Type: application/json

  {
    "userId": 123
  }
  ```

- **Example Response**:

  ```json
  {
    "success": true,
    "message": "User retrieved successfully",
    "statusCode": 200,
    "user": {
      "id": 123,
      "username": "example_user",
      "email": "user@example.com",
      "address": "123 Main St",
      "phoneNumber": "555-555-5555"
    }
  }
  ```

- **Example Error Response**:

  ```json
  {
    "success": false,
    "message": "User not found",
    "statusCode": 404
  }
  ```

## Authentication

Our server uses JSON Web Tokens (JWT) for user authentication. To obtain and use these tokens, we use the "firebase/php-jwt" library, which is a PHP library for working with JWTs.

### Obtaining an Authentication Token

To obtain an authentication token, you need to make a successful login request. Once you log in, the server will generate a token and return it in the response. This token is essential for accessing protected routes and resources.

### Using the Authentication Token

To use the authentication token, you should include it in the "Authorization" header of your HTTP requests using the "Bearer" scheme. For example:

Make sure to replace "your-access-token" with the actual token obtained during the login process.

### Example Authentication Flow

1. **Login**: Send a POST request to `/authentication/login` with your login credentials (email and password). On successful login, you will receive an access token in the response.

2. **Protected Routes**: When accessing routes or resources that require authentication, include the obtained token in the "Authorization" header.

Please note that tokens have an expiration time for security purposes. If a token expires, you will need to re-authenticate to obtain a new one.

### Library Used: firebase/php-jwt

Our server uses the "firebase/php-jwt" library to generate and verify JWTs. For more details on how the library works, you can refer to the library's documentation.

## Error Handling

Describe how your server handles errors. Include information about the response format for errors and how to interpret error codes.

## Database

Provide details about your database structure, including tables, relationships, and example queries.

## Websockets

If your server supports Websockets, explain how to use them and provide sample code or applications that demonstrate Websocket functionality.

## Contributing

Encourage other developers to contribute to your project. Explain how they can submit issues, propose new features, or make pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

Feel free to replace the placeholder text with your project-specific information. You can also add more sections or details as needed for your project's documentation.

```

```

```
