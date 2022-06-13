package com.dicoding.capstone

import android.content.ContentValues.TAG
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.http.Query

class MainViewModel : ViewModel() {

    val listTwt = MutableLiveData<ArrayList<TweetsItem>>()

    fun setListTweet(){
        ApiConfig.getApiService()
            .getTopic()
            .enqueue(object :Callback<TweetResponse> {
                override fun onResponse(
                    call: Call<TweetResponse>,
                    response: Response<TweetResponse>
                ){
                    if(response.isSuccessful){
                        listTwt.postValue(response.body()?.data?.tweets as ArrayList<TweetsItem>?)
                    }else{
                        Log.e(TAG,"onFailure: ${response.message()}")
                    }
                }

                override fun onFailure(call: Call<TweetResponse>, t: Throwable) {
                    Log.e(TAG, "onFailure: ${t.message}")
                }
            })
    }
    fun getListTweets(): LiveData<ArrayList<TweetsItem>>{
        return listTwt
    }
}