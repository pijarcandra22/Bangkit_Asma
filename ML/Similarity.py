import re
import numpy as np
import pandas as pd
import tensorflow as tf
from statistics import mean
from ast import literal_eval

class FinalSimilarity:
    def __init__(self,journalData,tweetData):
        self.journalData = pd.read_csv(journalData)
        self.tweetData   = pd.read_csv(tweetData)
        self.data = None
    
    def StringToArray(self,embeding):
        try:
            strtweeet = re.sub("\s+|dtype=float32\)|array\(", "", embeding)
            strtweeet = strtweeet.replace(",,", ",")
            x = literal_eval(strtweeet)
            y = np.array(x)
            return tf.constant(y)
        except:
            return None

    def similarity(self, a, b):
        return np.matmul(a, np.transpose(b))

    def GenerateSimilarity(self, embed):
        try:
            result = [np.max(self.similarity(self.data['embeds'][x], embed)) for x in range(len(self.data))]
            return mean(result)
        except:
            return None
        
    def getSimilarity(self,idTopik):
        self.journalData['embeds'] = self.journalData['embeds'].apply(self.StringToArray)
        self.tweetData['embeds'] = self.tweetData['embeds'].apply(self.StringToArray)
        self.data = self.tweetData[self.tweetData.Topik == idTopik].reset_index()
        self.journalData['Similarity'] = self.journalData['embeds'].apply(self.GenerateSimilarity)
        self.journalData.to_csv('FinalDataUse.csv')
        self.journalData.to_json('FinalDataUse.json')