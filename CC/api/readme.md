# API SPECS

## Topic
### get data from topic
Request
this is where you make a request to get data that already process by model
- method: GET
- endpoint: /api/v1/topic

Response
- body: 
    ```json
        "status": "string",
        "data": [
            {
                "topic":"string",
                "keyword": "string",
                "text": "text",
            }
        ]
    ```
## Topic
### get paper by topic id
Request

- method: GET
- endpoint: /api/v1/topic/{topicId}

Response
- body: 
    ```json
        "status": "string",
        "data": [
            {
                "topic":"string",
                "title": "string",
                "url": "string",
                "author": "string",
                "abstract": "text"
            }
        ]
    ```

### post data to database
this api for model to store the data output to database 

Request
- method: POST
- endpoint: /api/v1/topic
- body: 
    ```json
       {
           "name": "string",
           "dominant_topic": "number",
           "Topic_perc": "double",
           "keywords": "string",
           "text":"string"
       }
    ```
Response
- body:
    ```json
        {
            "status": "string",
            "data": {
                "topic_id": "string"
            }
        }
    ```

### post paper url 

Request
- method: POST
- endpoint: api/v1/paper/{topicId}
- body: 
    ```json
        {
            "title": "string",
            "url": "string",
            "author": "string",
            "abstract": "string"
        }
    ```
Response
- body: 
    ```json
        {
            "status": "string",
            "message": "string"
        }
    ```



