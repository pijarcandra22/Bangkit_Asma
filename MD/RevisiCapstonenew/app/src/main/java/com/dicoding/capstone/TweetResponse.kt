package com.dicoding.capstone

import com.google.gson.annotations.SerializedName

data class TweetResponse(

	val items : ArrayList<TweetsItem>,

	@field:SerializedName("data")
	val data: Data,

	@field:SerializedName("status")
	val status: String
)

data class TweetsItem(

	@field:SerializedName("topic")
	val topic: String,

	@field:SerializedName("keyword")
	val keyword: String
)

data class Data(

	@field:SerializedName("count")
	val count: Int,

	@field:SerializedName("tweets")
	val tweets: List<TweetsItem>
)
