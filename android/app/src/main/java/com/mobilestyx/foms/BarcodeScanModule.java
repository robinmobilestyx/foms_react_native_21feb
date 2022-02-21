package com.mobilestyx.foms;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Parcelable;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.core.app.ActivityCompat;

//import com.connectsdk.discovery.DiscoveryManager;
//import com.facebook.react.PackageList;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

public class BarcodeScanModule extends ReactContextBaseJavaModule implements PermissionListener {
    public String dob;
    public ReactApplicationContext context;
    private  Promise promise;
    private  Callback callback;
    //private final DiscoveryManager manager = DiscoveryManager.getInstance();
    public static final ScannedData scannedData = new ScannedData();
    private  PermissionAwareActivity activity ;

    public BarcodeScanModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context=reactContext;
    }
    public BarcodeScanModule(){}

    @ReactMethod
    public void callDeviceDiscovery(boolean flash, Callback successCallback, Callback errorCallback)
    {
        try
        {
             activity = (PermissionAwareActivity) getCurrentActivity();
            if (activity == null) {
                // Handle null case
                Toast.makeText(getReactApplicationContext(),"Unable to open scanner !",Toast.LENGTH_LONG).show();
            }
            scannedData.setCallback(successCallback);
            scannedData.setFlash(flash);
            activity.requestPermissions(new String[] {Manifest.permission.CAMERA},100, this);




        }
        catch (Exception e)
        {


            errorCallback.invoke(e.getMessage());
        }
    }

    public void onActivityResult(String result) {
        //some code
        try{
            Log.e("TAG", "onResult module" + result);
            callback = scannedData.getCallback();
            callback.invoke(result);


        }
        catch (Exception e)
        {
            Log.e("TAG","on sending result"+e.getMessage());
        }
    }

private void permRrational(){
        AlertDialog.Builder  builder = new AlertDialog.Builder(getReactApplicationContext())
        .setCancelable(false)
        .setTitle("Permission Required")
        .setMessage("Camera permission is required to use this feature!")
        .setPositiveButton("OK", new DialogInterface.OnClickListener() {

            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.dismiss();
            Intent intent = new Intent( Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
            }
        });
        AlertDialog dialog = builder.create();
        dialog.show();

}

    @Override
    public void initialize() {
        super.initialize();
    }

    @NonNull
    @Override
    public String getName() {
        return "BarcodeScanModule";
    }

    @Override
    public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {

        if(requestCode == 100 && grantResults.length >0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
            Intent intent = new Intent(context, Scanner.class);
            intent.putExtra("useFlash", scannedData.getFlash());
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
            return true;
        }
        else if(!ActivityCompat.shouldShowRequestPermissionRationale(getCurrentActivity(),Manifest.permission.CAMERA))
        {
//            if(ActivityCompat.shouldShowRequestPermissionRationale((Activity) activity,Manifest.permission.CAMERA))
//            {
//               // activity.requestPermissions(new String[] {Manifest.permission.CAMERA},100, this);
//                permRrational();
//
//            }
//            else
//            {
//
//            }
            Toast.makeText(getReactApplicationContext(),"Permission has been blocked, enable it from the  app setting",Toast.LENGTH_LONG).show();
//            new AlertDialog.Builder(getReactApplicationContext())
//                    .setCancelable(false)
//                    .setPositiveButton("SETTING", new DialogInterface.OnClickListener() {
//                        @Override
//                        public void onClick(DialogInterface dialogInterface, int i) {
//                            dialogInterface.dismiss();
//                            getReactApplicationContext().startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.fromParts("package",getReactApplicationContext().getPackageName(),null)));
//                        }
//                    })
//                    .setMessage("Camera Permission is require")
//                    .setTitle("Permission").show();

        }
//        else
//            Toast.makeText(getReactApplicationContext(),"Permission denied",Toast.LENGTH_LONG).show();

        return false;

    }
}
