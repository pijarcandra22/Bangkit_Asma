package com.dicoding.capstone

import com.google.gson.annotations.SerializedName

data class ApiResponse(
    @field:SerializedName("status")
    val error: Boolean,

    @field:SerializedName("message")
    val message: String
)
