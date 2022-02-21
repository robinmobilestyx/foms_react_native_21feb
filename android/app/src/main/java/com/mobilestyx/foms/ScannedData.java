package com.mobilestyx.foms;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

public class ScannedData {
    public Promise mPromise;
    public  Callback callback;
    public String mResult;
    boolean flash;
    public ScannedData() {
       //this.mCallback = callback;
    }
    public String getResult(){
        return mResult;
    }
    public void setmResult(String res){
        this.mResult=res;
    }
    public Callback getCallback() {
        return callback;
    }
    public  void  setFlash(boolean flash){this.flash= flash;}
    public boolean getFlash(){
        return flash;
    }
    public void setCallback(Callback callback) {
        this.callback = callback;
    }
}
