package com.dicoding.capstone

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.annotation.StringRes
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.get
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.viewpager2.widget.ViewPager2
import com.dicoding.capstone.databinding.ActivityMainBinding
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator

class MainActivity : AppCompatActivity(){
    private lateinit var binding: ActivityMainBinding
    private lateinit var adapter: TweetAdapter
    private lateinit var viewModel : MainViewModel


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)


        adapter = TweetAdapter()
        adapter.notifyDataSetChanged()

        adapter.setOnItemClickCallback(object : TweetAdapter.OnItemClickCallback {
            override fun onItemClicked(data: TweetsItem) {
                Intent(this@MainActivity, DetailActivity::class.java)
                startActivity(intent)
            }
        })

        viewModel = ViewModelProvider(
            this,
            ViewModelProvider.NewInstanceFactory()
        ).get(MainViewModel::class.java)

        binding.apply {
            rvTweet.layoutManager = LinearLayoutManager(this@MainActivity)
            rvTweet.setHasFixedSize(true)
            rvTweet.adapter = adapter
        }

        viewModel.setListTweet()

        viewModel.getListTweets().observe(this) {
            if (it != null) {
                adapter.setList(it)
                showLoading(false)
            }
        }

    }



    private fun showLoading(state: Boolean) {
        if (state) {
            binding.progressBar.visibility = View.VISIBLE
        } else {
            binding.progressBar.visibility = View.GONE
        }

    }
}
