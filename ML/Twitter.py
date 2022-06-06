import tweepy
import csv
from datetime import datetime, timedelta

class TakeTwitterData:
    def __init__(self):
        consumer_key="D7k58ayokrLKHEzK3aeqPnPiq"
        consumer_secret="VWHqDqaUtmNBu4maJ9MuTHAumK88Cgr35iCUfjAwBZnZIiaHjU"
        access_token="1444570961450209287-TfvonZE4A0bR6h2pdCOGy4JTgFACrL"
        access_token_secret="Q2dpoX3IzMdxWxR1gyngln1k1SXlCn0DXP91cUVz2SC8v"
        #AAAAAAAAAAAAAAAAAAAAAJJSUQEAAAAA2QoJeIxQpVOABhyCZbeoMD8JF4c%3D0Pnw9CAJZkhMTfC3yROabHN4xvJCeuXL7VWlxxeOm0QQyHvyRb
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        self.api = tweepy.API(auth)

    def UpdateTweet(self,topik,):
        tweet_total = 0
        tweet_count = 0
        today = datetime.today()
        yesterday = datetime.today() - timedelta(days=1)
        for tweet in tweepy.Cursor(self.api.search, q = topik,
                                since = datetime.strftime(yesterday, '%Y-%m-%d'),
                                until = datetime.strftime(today, '%Y-%m-%d'),
                                wait_on_rate_limit=True,
                                tweet_mode='extended',
                                lang = "id").items():

            # Write a row to the CSV file. I use encode UTF-8
            if tweet_total == 0:
                twitterData = open('twitterData'+str(tweet_count)+'.xlsx', 'w')
                csvWriter = csv.writer(twitterData)
            tweet_total += 1
            csvWriter.writerow([tweet.created_at, tweet._json["full_text"].encode('utf-8')])
            print (tweet.created_at, tweet._json["full_text"])
            if tweet_total >10000:
                twitterData.close()
                tweet_total = 0
                tweet_count += 1
