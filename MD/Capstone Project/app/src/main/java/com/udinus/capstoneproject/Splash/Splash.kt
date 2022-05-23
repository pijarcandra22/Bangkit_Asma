package com.udinus.capstoneproject.Splash

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.AppCompatDelegate
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import androidx.lifecycle.ViewModelProvider
import com.udinus.capstoneproject.MainActivity
import com.udinus.capstoneproject.R
import com.udinus.capstoneproject.setting.SettingPreference
import com.udinus.capstoneproject.setting.SettingViewModel
import com.udinus.capstoneproject.setting.ViewModelFactory

class Splash : AppCompatActivity() {
    private val splashTimeOut = 3000L
    private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)


        Handler().postDelayed({
            startActivity(Intent(this, MainActivity::class.java))
            finish()
            val pref = SettingPreference.getInstance(dataStore)
            val settingViewModel = ViewModelProvider(this, ViewModelFactory(pref)).get(
                SettingViewModel::class.java
            )
            settingViewModel.getThemeSettings().observe(this,
                { isDarkModeActive: Boolean ->
                    if (isDarkModeActive) {
                        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
                    } else {
                        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
                    }
                })
        }, splashTimeOut)
    }
}