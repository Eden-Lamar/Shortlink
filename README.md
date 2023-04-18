# Prerequisites

Before running the solution, make sure you have the following software installed on your machine:

- Node.js (version 12 or higher)
- npm (version 6 or higher)
- Postman (for testing the endpoints)

## Steps

1. Clone the repository to your local machine:

```
git clone https://github.com/Eden-Lamar/Shortlink.git
```

2. Navigate to the project directory:

```
cd Shortlink
```

3. Install the dependencies:

```
npm install or npm i
```

4. Start the server:

```
npm start
```

5. The server should now be running on http://localhost:3000. You can test the API endpoints using Postman or any other HTTP client.

## API endpoints

- POST /encode: Encodes a URL to a short URL
- POST /decode: Decodes a short URL to its original URL
- GET /statistic/:id: Gets basic statistics of a short URL
- GET /s/:id: Redirect you from the short URL to the original URL

## Sample requests

**POST /encode**

### Request

To encode a URL, make a POST request to http://localhost:3000/encode with a JSON payload containing the URL:

```POST http://localhost:3000/encode
Content-Type: application/json

{
    "url": "https://www.google.com"
}
```

### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "shortUrl": "http://localhost:3000/s/xxxxxxx"
}
```

**POST /decode**

### Request

To decode a short URL, make a POST request to http://localhost:3000/decode with a JSON payload containing the short URL:

```
POST http://localhost:3000/decode
Content-Type: application/json

{
    "shortUrl": "http://localhost:3000/s/xxxxxxx"
}
```

### Response

```HTTP/1.1 200 OK
Content-Type: application/json

{
    "url": "https://www.google.com"
}
```

**GET /statistic/:id**

### Request

To get statistics for a short URL, make a GET request to http://localhost:3000/statistic/:id, where :id is the ID portion of the short URL (e.g. ab1de3g in http://localhost:3000/s/ab1de3g).
The response will contain the original URL and the number of visits:

```
GET http://localhost:3000/statistic/3qZz1pM
```

### Response

```HTTP/1.1 200 OK
Content-Type: application/json

{
    "url": "https://www.google.com",
    "visits": 1
}
```

## SOLID Approach

**Single Responsibility Principle:**

-The **server.js** file has the single responsibility of setting up the server and configuring middleware.
-The **routes.js** file is responsible for defining the API endpoints and mapping them to the corresponding controller methods.
-The **shortLinkCtrl.js** file contains the controller methods for the API endpoints, each with a single responsibility: encoding, decoding, getting link stats, or redirecting URLs.

**Dependency Inversion Principle:**

-The **routes.js** file uses the **shortLinkCtrl** module by importing and using its exported methods. This makes it easy to swap out the implementation of the **shortLinkCtrl** methods without changing the code in **routes.js**.

## Conclusion

ShortLink is a tool that can be used to create short, easy-to-remember URLs. It can be used in a variety of applications, from social media marketing to e-commerce, and can help improve user experience by reducing the length of URLs and making them more shareable. The app is built using Node.js and the Express framework, and uses nanoid for generating unique IDs. It follows best practices and SOLID principles, and is designed with clean code in mind. By following the instructions outlined in this documentation, you can easily set up and run the app on your local machine or a web server. With this app, you can create and manage short links for your website, track the number of clicks and visits to those links, and improve the overall performance and user experience of your website.

While it currently uses an in-memory object to store the URLs, it can be improved by adding a database to persist the data for better reliability and scalability.

For users who want to integrate the app with a frontend, the app's endpoints can be easily connected to a frontend framework such as React or Vue.js.
