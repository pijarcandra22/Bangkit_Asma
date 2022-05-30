from keras.preprocessing import text
import tensorflow_hub as hub
import tensorflow_text as texting
from keras import utils
import tensorflow as tf
import pandas as pd
import numpy as np
import emoji
import re
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory
from sklearn.preprocessing import LabelEncoder
import translators as ts
ts._google.language_map

class Preprocessing:
    def __init__(self):
        self.factory   = StemmerFactory()
        self.stemmer   = self.factory.create_stemmer()
        self.stopWords = self.getStopWordList()
        self.preprocessor = hub.KerasLayer('https://tfhub.dev/google/universal-sentence-encoder-cmlm/multilingual-preprocess/2')
        self.encodering = hub.KerasLayer('https://tfhub.dev/google/universal-sentence-encoder-cmlm/multilingual-base-br/1')

    def give_emoji_free_text(self,text):
        """Menghilangkan Emoji Pada Tweet"""
        emoji_list = [c for c in text if c in emoji.UNICODE_EMOJI]
        clean_text = ' '.join([str for str in text.split() if not any(i in str for i in emoji_list)])
        return clean_text

    def url_free_text(self,text):
        """Menghilangkan Url Tweet"""
        text = re.sub(r'http\S+', '', text)
        return text

    def username_free_text(self,text):
        """Menghilangkan Username User"""
        result = re.sub(r'@\S+','', text)
        v = re.sub(r"^[b\',b\'RT]+",'', result)
        return v
    
    def replaceTwoOrMore(self,s):
        """Menghilangkan Karakter Berulang"""
        pattern = re.compile(r"(.)\1{1,}", re.DOTALL)
        return pattern.sub(r"\1\1", s)

    def getStopWordList(self):
        """Mengambil Stopword dari Library Sastrawi"""
        stopWords = StopWordRemoverFactory()
        more_stopword = ['dengan', 'ia','bahwa','oleh','AT_USER','URL','di','yg','dari','ke','ini','bgmn','tmn2','dr','pt','dg']
        data = stopWords.get_stop_words()+more_stopword
        return data
    
    def steaming_text(self,sentence):
        """Stemming Pada Text"""
        return self.stemmer.stem(sentence)
    
    def getFeatureVector(self,tweet):
        """Melakukan Tokenisasi"""
        featureVector = []
        words = tweet.split()
        for w in words:
            w = self.replaceTwoOrMore(w)
            w = w.strip('\'"?,.').lower()
            val = re.search(r"^[a-zA-Z][a-zA-Z0-9]*$", w)
            if(w in self.stopWords or val is None):
                continue
            else:
                featureVector.append(w)
        return featureVector

    def normalization(self,embeds):
        norms = np.linalg.norm(embeds, 2, axis=1, keepdims=True)
        return embeds/norms

    def embedingTweet(self,tweet):
        tweeting = tf.constant([tweet])
        return self.normalization(self.encodering(self.preprocessor(tweeting))['default'])

    def EmbedToList(self,tweet):
        return list(self.embedingTweet(tweet).numpy())

class PreprocessingText(Preprocessing):
    def __init__(self,csvFile):
        Preprocessing.__init__(self)
        """Data yang di Inputkan merupakan nama file csv tempat tweet disimpan"""
        self.csvFile   = pd.read_csv(csvFile) #File Utama
        self.csvFile.columns = ["datetime", "text"]

        max_words = 10000
        self.tokenize = text.Tokenizer(num_words=max_words, char_level=False)
        self.encoder = LabelEncoder()
        self.x_train = None
        self.y_train = None
        self.model = tf.keras.models.load_model('Model_Klasifikasi_Topik.h5')
        
    def prepareClasificationModel(self):
        df = pd.read_csv('final_data.csv')
        df = df[['Text', 'Dominant_Topic']]
        df = df[pd.notnull(df['Text'])]
        df['Dominant_Topic'] = df['Dominant_Topic'].apply(str)
        train_size = int(len(df) * .8)
        train_text = df['Text'][:train_size]
        train_product = df['Dominant_Topic'][:train_size]

        self.tokenize.fit_on_texts(train_text) # only fit on train
        self.x_train = self.tokenize.texts_to_matrix(train_text)

        self.encoder.fit(train_product)
        self.y_train = self.encoder.transform(train_product)

        num_classes = np.max(self.y_train) + 1
        self.y_train = utils.to_categorical(self.y_train, num_classes)

    def GenerateTopik(self):
        x_test = self.tokenize.texts_to_matrix(self.csvFile['cleanTweet'])
        text_labels = self.encoder.classes_ 
        self.csvFile['Topik'] = np.nan
        for i in range(len(self.csvFile)):
            prediction = self.model.predict(np.array([x_test[i]]))
            predicted_label = text_labels[np.argmax(prediction)]
            self.csvFile['Topik'][i] = predicted_label
        self.csvFile.to_csv('TweetDataUse.csv', sep='\t')
        self.csvFile.to_json('TweetDataUse.json')
        print('Data Berhasil Disimpan')
            
    def processingTweet(self):
        call_emoji_free = lambda x: self.give_emoji_free_text(x)
        self.csvFile['cleanTweet'] = self.csvFile['text'].apply(call_emoji_free)
        self.csvFile['cleanTweet'] = self.csvFile['cleanTweet'].apply(self.url_free_text)
        self.csvFile['cleanTweet'] = self.csvFile['cleanTweet'].apply(self.username_free_text)
        self.csvFile['cleanTweet'] = self.csvFile['cleanTweet'].apply(self.getFeatureVector)
        self.csvFile['cleanTweet'] = [' '.join(map(str, l)) for l in self.csvFile['cleanTweet']]
        self.csvFile['cleanTweet'] = self.csvFile['cleanTweet'].apply(self.steaming_text)
        self.csvFile.dropna()
        self.csvFile['embeds'] = self.csvFile['cleanTweet'].apply(self.EmbedToList)
        self.prepareClasificationModel()

class PreprocessingJournal(Preprocessing):
    def __init__(self,tsvFile):
        Preprocessing.__init__(self)
        self.tsvFile = pd.read_csv(tsvFile, sep='\t')
        self.parameter = 0
    
    def listToString(self,s): 
        str1 = "" 
        for ele in s: 
            str1 += ' ' + ele  
        return str1+'.'

    def text_to_sentences(self,text_abs):
        result = re.sub(r'(\S)\.(\S)', r'\1$\2', text_abs) # mengganti (.) yang bukan sebagai pemisah kalimat dengan ($)
        result = re.findall(r'\S[^\.]*\.', result) # memisahkan paragraf menjadi kalimat
        result = [re.sub(r'(\S)\$(\S)', r'\1.\2', r) for r in result] # mengganti ($) kembali ke (.)
        dataIndo = []
        for i in result:
            try:
                dataIndo.append(ts.google(i, from_language='en', to_language='id'))
            except:
                dataIndo.append('')
        print("translate dokumen ",self.parameter)
        self.parameter += 1
        return dataIndo

    def text_to_sentences2(self,text_abs):
        result = re.sub(r'(\S)\.(\S)', r'\1$\2', text_abs) # mengganti (.) yang bukan sebagai pemisah kalimat dengan ($)
        result = re.findall(r'\S[^\.]*\.', result) # memisahkan paragraf menjadi kalimat
        result = [re.sub(r'(\S)\$(\S)', r'\1.\2', r) for r in result] # mengganti ($) kembali ke (.)
        return result

    def getFeatureVectorJournal(self,journal):
        journalset = self.text_to_sentences2(str(journal))
        sentence_list = []
        for i in journalset:
            vektor = self.getFeatureVector(i)
            sentence_list.append(self.steaming_text(self.listToString(vektor))+'.')
        return sentence_list

    def Embedem(self,abstrak):
        journal = tf.constant(abstrak)
        try:
            embedded_journal = self.normalization(self.encodering(self.preprocessor(journal))['default'])
            return embedded_journal
        except:
            return None

    def EmbedToList2(self,abstrak):
        try:
            return list(self.Embedem(abstrak).numpy())
        except:
            return ''

    def processingJournal(self):
        self.tsvFile["AbsIndo"] = self.tsvFile['Abstrak'].apply(self.text_to_sentences)
        print("Translate Done")
        self.tsvFile['AbsIndo'] = [' '.join(map(str, l)) for l in self.tsvFile['AbsIndo']]
        self.tsvFile['CleanAbs'] = self.tsvFile['AbsIndo'].apply(self.getFeatureVectorJournal)
        self.tsvFile['embeds'] = self.tsvFile['CleanAbs'].apply(self.EmbedToList2)
        self.tsvFile.to_csv('JournalDataUse.csv', sep='\t')
        self.tsvFile.to_json('JournalDataUse.json')
        print('Data Berhasil Disimpan')