# Run the following command to setup:

```
npm install express basic-auth dotenv morgan helmet
```

# Run the following command to run:

```
node server.js
```

# This is the API cURL as follows:

## 1. For Root end point:

#### For an admin user

```
curl -u admin:adminpassword http://localhost:3000/
```

#### For a regular user

```
curl -u user:userpassword http://localhost:3000/
```

## 2. Accessing the Admin Endpoint (/admin)

#### For an admin user

```
curl -u admin:adminpassword http://localhost:3000/admin
```

#### For a regular user (expected to fail with 403 Forbidden)

```
curl -u user:userpassword http://localhost:3000/admin
```

## 3. Accessing the User Endpoint (/user)

#### For a regular user

```
curl -u user:userpassword http://localhost:3000/user
```

#### For an admin user (expected to fail with 403 Forbidden)

```
curl -u admin:adminpassword http://localhost:3000/user
```
