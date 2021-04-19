---
title: Subjects
legacy: true
order: 5
---

Whenever a resource is created a separate header called X-External-Subject-ID needs to be passed to indicate to which subject the resource belongs to. We don't care about how this subject id looks like or if it is related to a real existing person or not - it fully depends on your use case. The following page lists requests related to external subjects.

Available scopes for Subjects:

* connctd.subjects.read

## Retrieve Subjects

> **Request**<br>
> GET https://api.connctd.io/api/v1/subjects<br>
> *Headers:*<br>
> &nbsp;Authorization:YOUR TOKEN<br>
> *Body:* empty<br>


> **Response**<br>
> *Code:* 200<br>
> *Body:* List of subject references. See example below

```json
[
  {
    "href": "https://api.connctd.io/api/v1/subjects/432ak3k5s-422das"
  }, ...
]
```

The linked subject id currently points to nothing. In the future we might support storing additional information per subject. Right now this endpoint only gives you the possibility to enlist all subject ids you have ever created a resource for.

Required scope: `connctd.subjects.read`
