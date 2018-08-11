# Node Assignment:- Apis

# EndPoint : http://13.232.223.216:8000/api

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
e.g:GET http://13.232.223.216:8000/api/students?admissionYearAfter=2015&admissionYearBefore=2018&active=true&classes[]=1&classes=2&pageNumber=1&pageSize=10   

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
url: /classes/{id}/professor
method: POST
params:
        studentIds : Array
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
   "message": "Student updated successfully."
}
```

# Add Professor to Class

```sh
url: /classes/{id}/professor
method: POST
params:
        professor_id : Integer
```
Request Example
```json
{
"professor_id":1
}
```
Response

```json
{
   "status": true,
   "message": "Professor updated successfully."
}
```

# List Classes

```sh
url: /classes/
method: GET
filter available:
    pageSize: Integer(Elements per page. default:20)
    pageNumber: Integer(default:1)
```

Response

```json
{
   "status": true,
   "response": [
      {
         "id": 5,
         "title": "Five",
         "createdAt": "2018-08-10T23:50:21.162Z",
         "updatedAt": "2018-08-11T05:21:06.118Z",
         "ProfessorId": 5,
         "Professor": {
            "id": 5,
            "name": "Sameer",
            "universityStaffNo": "5",
            "designation": "Applied Science",
            "createdAt": "2018-08-10T21:29:36.819Z",
            "updatedAt": "2018-08-10T21:29:36.823Z"
         }
      },
      {
         "id": 4,
         "title": "Four",
         "createdAt": "2018-08-10T23:50:15.838Z",
         "updatedAt": "2018-08-11T05:20:58.836Z",
         "ProfessorId": 4,
         "Professor": {
            "id": 4,
            "name": "Sameer",
            "universityStaffNo": "4",
            "designation": "Applied Science",
            "createdAt": "2018-08-10T21:29:32.422Z",
            "updatedAt": "2018-08-10T21:29:32.426Z"
         }
      },
      {
         "id": 3,
         "title": "Three",
         "createdAt": "2018-08-10T23:50:08.920Z",
         "updatedAt": "2018-08-11T05:20:50.438Z",
         "ProfessorId": 3,
         "Professor": {
            "id": 3,
            "name": "Sameer",
            "universityStaffNo": "3",
            "designation": "Applied Science",
            "createdAt": "2018-08-10T21:29:27.739Z",
            "updatedAt": "2018-08-10T21:29:27.826Z"
         }
         .
         .
         .
    }
```

# Get Class Students

```sh
url: /students/:id/classes
method: GET
filter available:
        id: Integer(Class id )
        pageSize: Integer(Elements per page. default:20)
        pageNumber: Integer(default:1)
example:  /api/students/2/classes    
```
Response

```json
{
   "status": true,
   "response": [
      {
         "id": 2,
         "title": "Two",
         "createdAt": "2018-08-10T23:50:03.717Z",
         "updatedAt": "2018-08-11T05:20:41.807Z",
         "ProfessorId": 2,
         "Professor": {
            "id": 2,
            "name": "Sameer",
            "universityStaffNo": "2",
            "designation": "Applied Science",
            "createdAt": "2018-08-10T21:27:45.425Z",
            "updatedAt": "2018-08-10T21:27:45.431Z"
         },
         "Students": [
            {
               "id": 2,
               "name": "Akshay",
               "rollNo": 2,
               "admissionDate": "2016-04-15T00:00:00.000Z",
               "active": true,
               "createdAt": "2018-08-10T21:38:25.878Z",
               "updatedAt": "2018-08-11T05:30:44.970Z",
               "SemesterClassId": 2
            },
            {
               "id": 4,
               "name": "Tarun",
               "rollNo": 4,
               "admissionDate": "2016-05-03T00:00:00.000Z",
               "active": true,
               "createdAt": "2018-08-10T21:38:58.552Z",
               "updatedAt": "2018-08-11T05:30:44.970Z",
               "SemesterClassId": 2
            },
            {
               "id": 8,
               "name": "Himanshu",
               "rollNo": 8,
               "admissionDate": "2016-05-19T00:00:00.000Z",
               "active": true,
               "createdAt": "2018-08-10T21:40:11.140Z",
               "updatedAt": "2018-08-11T05:30:44.970Z",
               "SemesterClassId": 2
            }
         ]
      }
   ]
}
```
# List Professors

```sh
url: /professors/
method: GET
filter available:
    pageSize: Integer(Elements per page. default:20)
    pageNumber: Integer(default:1)
```
Response
```json
{
   "status": true,
   "response": [
      {
         "id": 12,
         "name": "Sameer",
         "universityStaffNo": "12",
         "designation": "Applied Science",
         "createdAt": "2018-08-10T21:32:10.131Z",
         "updatedAt": "2018-08-10T21:32:10.156Z"
      },
      {
         "id": 11,
         "name": "Sameer",
         "universityStaffNo": "11",
         "designation": "Applied Science",
         "createdAt": "2018-08-10T21:30:15.173Z",
         "updatedAt": "2018-08-10T21:30:15.177Z"
      },
      {
         "id": 10,
         "name": "Sameer",
         "universityStaffNo": "10",
         "designation": "Applied Science",
         "createdAt": "2018-08-10T21:30:08.170Z",
         "updatedAt": "2018-08-10T21:30:08.174Z"
      },
      .
      .
      .
  }
  ```
  # Get Professor Info

```sh
url: /professors/:id
method: GET
params:
        id : Integer
Request Example: /professors/1
```
Response
```json
{
   "status": true,
   "response": {
      "id": 1,
      "name": "Sameer Singh",
      "universityStaffNo": "1",
      "designation": "Applied Science",
      "createdAt": "2018-08-10T21:27:32.567Z",
      "updatedAt": "2018-08-10T21:27:32.618Z"
   }
}
```
