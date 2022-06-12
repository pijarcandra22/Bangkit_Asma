import pandas as pd
from google.cloud import storage
storage_client = storage.Client()
bucket = storage_client.get_bucket('createbucket123')
blob = bucket.blob('twitterData1.csv.csv')
path = "gs://asma_bucket/data_prep/twitterData1.csv"
a = pd.read_csv(path)