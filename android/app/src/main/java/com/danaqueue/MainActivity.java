package com.danaqueue;

import android.content.Intent;

import com.reactnativenavigation.NavigationActivity;


public class MainActivity extends NavigationActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
//        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
