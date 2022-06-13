package com.dicoding.capstone

import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.viewpager2.adapter.FragmentStateAdapter

class SectionsPagerAdapter(activity: AppCompatActivity) : FragmentStateAdapter(activity) {

    override fun createFragment(position: Int): Fragment {
        var fragment: Fragment? = null
        when (position) {
            0 -> fragment = TweetTerkaitFrag()
            1 -> fragment = JournalTerkaitFrag()
        }
        return fragment as Fragment
    }

    override fun getItemCount(): Int {
        return 2
    }
}