package com.dicoding.capstone

import retrofit2.Call
import retrofit2.http.Field
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface ApiService {
    @GET("tweets/")
    fun getTopic(): Call<TweetResponse>

    @GET("paper/{topicId}")
    fun getPaper(
        @Query("title") title: String,
        @Query("url") url: String,
        @Query("author") author: String,
        @Query("abstract") abstract: String
    ): Call<ArrayList<Paper>>

    @GET("topic/{topicId}")
    fun getTweet(
        @Query("topic") topic: Int,
        @Query("text") text: String,
        @Query("datetime") datetime: String
    ):  Call<ArrayList<Tweets>>
}