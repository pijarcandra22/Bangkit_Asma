package com.dicoding.capstone

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.dicoding.capstone.databinding.RowItemBinding

class TweetAdapter : RecyclerView.Adapter<TweetAdapter.TweetViewHolder>(){

    private val listReview = ArrayList<TweetsItem>()
    private var onItemClickCallback : OnItemClickCallback? = null

    fun setOnItemClickCallback(onItemClickCallback: OnItemClickCallback) {
        this.onItemClickCallback = onItemClickCallback

    }


    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): TweetViewHolder {
        val view = RowItemBinding.inflate(LayoutInflater.from(viewGroup.context),viewGroup,false)
        return TweetViewHolder((view))

    }

    override fun onBindViewHolder(viewHolder: TweetViewHolder, position: Int) {
        viewHolder.bind(listReview[position])
    }

    override fun getItemCount() = listReview.size

    fun setList(tweet: ArrayList<TweetsItem>){
        listReview.clear()
        listReview.addAll(tweet)
        notifyDataSetChanged()
    }


    inner class TweetViewHolder(val binding: RowItemBinding) : RecyclerView.ViewHolder(binding.root){
        fun bind(TweetItem : TweetsItem){
            binding.root.setOnClickListener {
                onItemClickCallback?.onItemClicked(TweetItem)
            }
            binding.apply {
                tvKeyword.text = TweetItem.keyword
                tvTopic.text = TweetItem.topic
            }
        }

    }

    interface OnItemClickCallback {
        fun onItemClicked(data: TweetsItem)
    }
}