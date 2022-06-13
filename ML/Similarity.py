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
        self.topik = 0
    
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
            return 0
        
    def GetTopikSimilarity(self, embed):
        self.data = self.tweetData[self.tweetData.Topik == self.topik].reset_index()
        sim = self.GenerateSimilarity(embed)
        return sim
                

    def getSimilarity(self):
        self.journalData['embeds'] = self.journalData['embeds'].apply(self.StringToArray)
        self.tweetData['embeds'] = self.tweetData['embeds'].apply(self.StringToArray)
        for i in range(len(self.tweetData['Topik'].value_counts())):
            self.journalData['Topik_'+str(i)] = np.nan
        for i in range(len(self.tweetData['Topik'].value_counts())):
            self.topik = i
            self.journalData['Topik_'+str(i)] = self.journalData['embeds'].apply(self.GetTopikSimilarity)
        self.journalData.to_csv('FinalDataUse.csv')
        self.journalData.to_json('FinalDataUse.json')