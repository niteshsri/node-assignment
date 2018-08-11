# Node Assignment

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
# Delete Student (Make student inactive)

```sh
url: /students/:id
method: DELETE
params:
        id : Integer
Request Example: /students/1
```
Response
```json
{
   "status": true,
   "message": "Student deleted successfully."
}
```
again check student info using /student/1
```json
{
   "status": true,
   "response": {
      "id": 1,
      "name": "Vinod Singh",
      "rollNo": 1,
      "admissionDate": "2016-03-21T00:00:00.000Z",
      "active": false,
      "createdAt": "2018-08-10T21:36:16.105Z",
      "updatedAt": "2018-08-10T22:43:42.038Z",
      "SemesterClassId": null
   }
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
   "response": {
      "id": 1,
      "name": "Vinod Singh",
      "rollNo": 1,
      "admissionDate": "2016-03-21T00:00:00.000Z",
      "active": false,
      "createdAt": "2018-08-10T21:36:16.105Z",
      "updatedAt": "2018-08-10T22:43:42.038Z",
      "SemesterClassId": null
   }
}
```
# Get Students List

```sh
url: /students/
method: GET
filter available:
    pageSize: Integer(Elements per page. default:20)
    pageNumber: Integer(default:1)
    classes : Array of Semester Classes example ?classes[]=1&classes[]=2
    admissionYearAfter: Year (YYYY) : filters students whose admissionDate is in or after the given year.
    admissionYearBefore: Year (YYYY): filters students whose admissionDate is before the given year.
        (if admissionYearAfter and admissionYearBefore both are present 
          then admissionYearAfter should be < admissionYearBefore e.g. result after 2017 and before 2018)
    active: Boolean
e.g: /students?admissionYearAfter=2017&admissionYearBefore=2018&active=true&classes[]=1&classes[]=2&pageNumber=1&pageSize=10    
Request Example: /students/1
```
Response

```json
{
   "status": true,
   "response": [
      {
         "id": 8,
         "name": "Himanshu",
         "rollNo": 8,
         "admissionDate": "2016-05-19T00:00:00.000Z",
         "active": true,
         "createdAt": "2018-08-10T21:40:11.140Z",
         "updatedAt": "2018-08-10T21:40:11.290Z",
         "SemesterClassId": null,
         "SemesterClass": null
      },
      {
         "id": 7,
         "name": "Gaurav",
         "rollNo": 7,
         "admissionDate": "2016-05-17T00:00:00.000Z",
         "active": true,
         "createdAt": "2018-08-10T21:39:39.516Z",
         "updatedAt": "2018-08-10T21:39:39.520Z",
         "SemesterClassId": null,
         "SemesterClass": null
      },
      {
         "id": 6,
         "name": "Nikhil",
         "rollNo": 6,
         "admissionDate": "2016-05-13T00:00:00.000Z",
         "active": true,
         "createdAt": "2018-08-10T21:39:28.170Z",
         "updatedAt": "2018-08-10T21:39:28.204Z",
         "SemesterClassId": null,
         "SemesterClass": null
      },
      .
      .
      .
      
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
```
# Create Classes

```sh
url: /classes/
method: POST
params:
        title : String
```
Request Example
```json
{
"title":"Seven"
}
```
Response

```json
{
   "status": true,
   "response": {
      "id": 7,
      "title": "Seven",
      "updatedAt": "2018-08-10T23:51:35.689Z",
      "createdAt": "2018-08-10T23:51:35.689Z",
      "ProfessorId": null
   }
}
```
# Add Student to Class

```sh
url: /classes/{id}/students
method: POST
params:
        studentIds : Array of Student Id e.g.[3,5,6]
```
Request Example
```json
{
"studentIds":[3,5,6]
}
```
Response

```json
{
   "status": true,
   "response": [
      {
         "id": 6,
         "name": "Nikhil",
         "rollNo": 6,
         "admissionDate": "2016-05-13T00:00:00.000Z",
         "active": true,
         "createdAt": "2018-08-10T21:39:28.170Z",
         "updatedAt": "2018-08-11T00:13:32.923Z",
         "SemesterClassId": 1,
         "SemesterClass": {
            "id": 1,
            "title": "One",
            "createdAt": "2018-08-10T23:49:56.758Z",
            "updatedAt": "2018-08-10T23:49:56.758Z",
            "ProfessorId": null
         }
      },
      {
         "id": 5,
         "name": "Tushar",
         "rollNo": 5,
         "admissionDate": "2016-05-09T00:00:00.000Z",
         "active": true,
         "createdAt": "2018-08-10T21:39:11.349Z",
         "updatedAt": "2018-08-11T00:13:32.923Z",
         "SemesterClassId": 1,
         "SemesterClass": {
            "id": 1,
            "title": "One",
            "createdAt": "2018-08-10T23:49:56.758Z",
            "updatedAt": "2018-08-10T23:49:56.758Z",
            "ProfessorId": null
         }
      },
      {
         "id": 3,
         "name": "Vipin",
         "rollNo": 3,
         "admissionDate": "2016-04-01T00:00:00.000Z",
         "active": true,
         "createdAt": "2018-08-10T21:38:46.016Z",
         "updatedAt": "2018-08-11T00:13:32.923Z",
         "SemesterClassId": 1,
         "SemesterClass": {
            "id": 1,
            "title": "One",
            "createdAt": "2018-08-10T23:49:56.758Z",
            "updatedAt": "2018-08-10T23:49:56.758Z",
            "ProfessorId": null
         }
         .
         .
         .
}
```
