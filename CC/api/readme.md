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
        "status": "success",
        "data": [
            {
                "topic":"string",
                "keyword": "string",
                "text": "text",
                "paper": [
                    {
                        "name" : "string",
                        "url" : "string"
                    }
                ]
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
            "status": "success",
            "data": {
                "topic_id": "string"
            }
        }
    ```

### post paper url 

Request
- method: POST
- endpoint: api/v1/paper/{topicId:string}
- body: 
    ```json
        {
            "name": "string",
            "url": "string",
        }
    ```
Response
- body: 
    ```json
        {
            "status": "success",
            "message": "string"
        }
    ```


