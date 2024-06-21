# Run the following command to setup:

```
npm install express jsonwebtoken dotenv morgan helmet
```

# Generate test SSL certificate:

```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

# Run the following command to run:

```
node server.js
```

# This is the API cURL as follows:

## 1. For Login based on role and username to generate JWT based Access-token:

```
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","role":"admin"}' https://localhost:3000/login --insecure
```

## 2. For Root end point:

#### For an admin user

```
curl -H "Authorization: Bearer your_generated_jwt_token" https://localhost:3000/ --insecure
```

## 2. Accessing the Admin Endpoint (/admin)

#### For an admin user

```
curl -H "Authorization: Bearer your_generated_jwt_token" https://localhost:3000/admin --insecure
```

#### For a regular user, i.e. if you have logged-in with user role (expected to fail with 403 Forbidden)

```
curl -H "Authorization: Bearer your_generated_jwt_token" https://localhost:3000/admin --insecure
```

## 3. Accessing the User Endpoint (/user)

#### For a regular user, i.e. if you have logged-in with user role

```
curl -H "Authorization: Bearer your_generated_jwt_token" https://localhost:3000/user --insecure
```

#### For an admin user (expected to fail with 403 Forbidden)

```
curl -H "Authorization: Bearer your_generated_jwt_token" https://localhost:3000/user --insecure
```
