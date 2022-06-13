package com.dicoding.capstone

import android.os.Parcelable
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import kotlinx.parcelize.Parcelize



data class ListTweet(
    val item : ArrayList<Tweets>,

    @field:SerializedName("status")
    val error: Boolean,

    @field:SerializedName("data")
    val data: String
)
data class Tweets(
    val keyword : String,
    val topic : Int
)

data class Paper(
    val title : String,
    val url : String,
    val author : String,
    val abstract : String
)

data class Topic(
    val topic: Int,
    val text : String,
    val datetime : String
)
