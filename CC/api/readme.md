# API SPECS

## Topic
### get topic from tweets
Request
this is where you make a request to get data that already process by model
- method: GET
- endpoint: https://asma-app-anedstf2sq-et.a.run.app/api/v1/tweets/

Response
- body: 
    ```json
        "status": "string",
        "data": [
            {
                "count": "integer",
                "tweets": [
                    {
                        "keyword": "string",
                        "topic": "integer"
                    }
                ]   
            }
        ]
    ```
## Topic
### get paper by topic id
Request

- method: GET
- endpoint: https://asma-app-anedstf2sq-et.a.run.app/api/v1/paper/{topicId}

Response
- body: 
    ```json
        "status": "string",
        "count": "integer",
        "jurnals": [
            {
                "title":"string",
                "url": "string",
                "author": "string",
                "abstract": "string",
            }
        ]
    ```

### get tweet based on topik 
this api for getting the data about tweet taht corespond to topik

Request
- method: GET
- endpoint: https://asma-app-anedstf2sq-et.a.run.app/api/v1/topic/{topicId}

Response
- body:
    ```json
        {
            "status": "string",
            "data": {
                "count": "Integer",
                "topic": [
                    {
                        "topic": "Integer",
                        "text": "string",
                        "datetime": "string"
                    }
                ]
            }
        }
    ```


