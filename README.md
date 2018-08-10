# Node Assignment

#Apis!
# EndPoint : http://13.232.223.216:8000/api

### A) Student APi's
# Create Student
```sh
url: /students/
method: POST
body:
        name : String(30), admissionDate: Date(YYYY-MM-DD)
```
Request Example
```json
{
    "name":"Vinod",
    "admissionDate":"2016-03-21"
}
```
Response
```json
{
   "status": true,
   "response": {
      "id": 1,
      "name": "Vinod",
      "rollNo": 1,
      "admissionDate": "2016-03-21T00:00:00.000Z",
      "active": true,
      "createdAt": "2018-08-10T21:36:16.105Z",
      "updatedAt": "2018-08-10T21:36:16.242Z",
      "SemesterClassId": null
   }
}
```

# Update Student

```sh
url: /students/:id
method: PATCH
params:
        id : Integer
```
Request Example: /students/1
```json
{
    "name":"Vinod Singh"
}
```
Response
```json
{
   "status": true,
   "message": "Student updated successfully."
}
```
# Get Student Info

```sh
url: /students/:id
method: GET
params:
        id : Integer
Request Example: /students/1
```
Response
```json
{
   "status": true,
   "message": "Student updated successfully."
}
```

# Create Professor

```sh
url: /professor/
method: POST
params:
        name : String(30), deisgnation: String(30)
```
Request Example
```json
{ 
    "name":"Sameer",
    "designation":"Applied Science"
}
```
Response

```json
{
   "status": true,
   "response": {
      "id": 11,
      "name": "Sameer",
      "universityStaffNo": "11",
      "designation": "Applied Science",
      "createdAt": "2018-08-10T21:30:15.173Z",
      "updatedAt": "2018-08-10T21:30:15.177Z"
   }
}
