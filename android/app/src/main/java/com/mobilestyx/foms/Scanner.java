package com.mobilestyx.foms;

import static androidx.camera.core.ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.camera.core.Camera;
import androidx.camera.core.CameraSelector;
import androidx.camera.core.ImageAnalysis;
import androidx.camera.core.ImageCapture;
import androidx.camera.core.ImageProxy;
import androidx.camera.core.Preview;
import androidx.camera.lifecycle.ProcessCameraProvider;
import androidx.camera.view.PreviewView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentManager;
import androidx.lifecycle.LifecycleOwner;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.media.Image;
import android.os.Bundle;
import android.util.Log;
import android.util.Size;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageButton;



import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.mlkit.vision.barcode.Barcode;
import com.google.mlkit.vision.barcode.BarcodeScanner;
import com.google.mlkit.vision.barcode.BarcodeScannerOptions;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import com.google.mlkit.vision.common.InputImage;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Scanner extends AppCompatActivity {
    private ListenableFuture cameraProviderFeature;
    private ExecutorService cameraExecutor;
     private  PreviewView previewView;
    private MyImageAnalyser imageAnalyser;

    private ImageButton switchCamera;

    private  Camera camera;

    private  CameraSelector cameraSelector ;
    private AlertDialog.Builder builder;
    private boolean useFlash;
    HashMap<String, String> myData = new HashMap<String, String>();
    public final String New_DL_CustomerFirstName = "DAC", New_DL_CustomerMiddleName = "DAD", Customer_Family_Name = "DCS",
            Customer_Given_Name = "DCT", Name_Suffix = "DCU",
            Street_Address_1 = "DAG", City = "DAI", Jurisdction_Code = "DAJ", Postal_Code = "DAK",
            Country_Identification = "DCG", Customer_Id_Number = "DAQ", Class = "DCA", Restrictions = "DCB",
            Endorsements = "DCD", Document_Discriminator = "DCF", Vehicle_Code = "DCH", Expiration_Date = "DBA",
            Date_Of_Birth = "DBB", Sex = "DBC", Issue_Date = "DBD", Height = "DAU", Weight = "DCE", Eye_Color = "DAY",
            Control_Number = "ZWA", WA_SPECIFIC_ENDORSMENT = "ZWB", Transaction_Types = "ZWC", Under_18_Until = "ZWD",
            Under_21_Until = "ZWE", Revision_Date = "ZWF", Customer_Full_Name = "DAA", Customer_First_Name = "DAC",
            Customer_Middle_Name = "DAD", Street_Address_2 = "DAH", Street_Address_1_optional = "DAL",
            Street_Address_2_optional = "DAM";
    ArrayList<String> allKeys = new ArrayList<String>(Arrays.asList(Customer_Family_Name, Customer_Given_Name, New_DL_CustomerFirstName,  New_DL_CustomerMiddleName, Name_Suffix, Street_Address_1, City,
            Jurisdction_Code, Postal_Code, Country_Identification, Customer_Id_Number, Class, Restrictions, Date_Of_Birth, Sex, Issue_Date));


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        setContentView(R.layout.activity_scanner);
        previewView = findViewById(R.id.preview);
        switchCamera = findViewById(R.id.barcode_scanner_switch);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        cameraSelector =  new CameraSelector.Builder().requireLensFacing(CameraSelector.LENS_FACING_BACK).build();
        cameraExecutor = Executors.newSingleThreadExecutor();
        cameraProviderFeature = ProcessCameraProvider.getInstance(getApplicationContext());
        imageAnalyser = new MyImageAnalyser(getSupportFragmentManager());
        useFlash = getIntent().getBooleanExtra("useFlash", false);

        switchCamera.setOnClickListener(new View.OnClickListener() {
            @SuppressLint("RestrictedApi")
            @Override
            public void onClick(View view) {
                try {
                    if (cameraSelector.getLensFacing() == 1) {
                        cameraSelector = new CameraSelector.Builder().requireLensFacing(CameraSelector.LENS_FACING_FRONT).build();
                        provider(false);

                    } else {

                        cameraSelector = new CameraSelector.Builder().requireLensFacing(CameraSelector.LENS_FACING_BACK).build();
                        provider(useFlash);
                    }
                }
                 catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        cameraProviderFeature.addListener(new Runnable() {
            @Override
            public void run() {
                try {


                    if(ActivityCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.CAMERA) == PackageManager.PERMISSION_DENIED)
                    {
                        ActivityCompat.requestPermissions(Scanner.this,new String[] {Manifest.permission.CAMERA},100);
                    }
                    else
                    {
                        provider(useFlash);
                    }
                }
                catch (Exception e){
                    e.printStackTrace();
                }
            }
        }, ContextCompat.getMainExecutor(Scanner.this));
    }
    private  void provider(final boolean useFlash){
    try {
        ProcessCameraProvider processCameraProvider = (ProcessCameraProvider) cameraProviderFeature.get();
        bindPreview(processCameraProvider,useFlash);
    } catch (ExecutionException e) {
        e.printStackTrace();
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
//private  void requestDialog(){
//
//    new AlertDialog.Builder(Scanner.this)
//              .setTitle("Permission Required")
//              .setMessage("Camera permission is required to use this feature!")
//              .setPositiveButton("ok", new DialogInterface.OnClickListener() {
//                  @Override
//                  public void onClick(DialogInterface dialogInterface, int i) {
//                      dialogInterface.dismiss();
//                      ActivityCompat.requestPermissions(Scanner.this,new String[] {Manifest.permission.CAMERA},100);
//                  }
//              }).setCancelable(false).show();
//     //AlertDialog alertDialog = builder.create();
//     //alertDialog.show();
//
//}
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode == 100 && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
          //  ProcessCameraProvider processCameraProvider = null;
           provider(useFlash);
        }

    }

    @SuppressLint("RestrictedApi")
    private void bindPreview(ProcessCameraProvider processCameraProvider,boolean useFlash) {

        Preview preview = new Preview.Builder().build();
        preview.setSurfaceProvider(previewView.getSurfaceProvider());
        ImageCapture imageCapture  = new ImageCapture.Builder().build();

        ImageAnalysis imageAnalysis =  new ImageAnalysis.Builder()
                .setTargetResolution(new Size(600,100))
                .setBackpressureStrategy(STRATEGY_KEEP_ONLY_LATEST).build();
        imageAnalysis.setAnalyzer(cameraExecutor,imageAnalyser);


        processCameraProvider.unbindAll();
        camera =  processCameraProvider.bindToLifecycle(this,cameraSelector,preview,imageCapture,imageAnalysis);
        camera.getCameraControl().enableTorch(useFlash);



    }
    public  class  MyImageAnalyser implements ImageAnalysis.Analyzer {
        private FragmentManager fragmentManager;


        public MyImageAnalyser(FragmentManager fragmentManager) {
            this.fragmentManager = fragmentManager;
        }

        @Override
        public void analyze(@NonNull ImageProxy image) {
            scanBarcode(image);
        }
    }

    private void scanBarcode(ImageProxy image) {
        @SuppressLint({"UnsafeOptInUsageError", "UnsafeExperimentalUsageError"})
        Image image1 = image.getImage();
        assert image1 != null;
        InputImage inputImage = InputImage.fromMediaImage(image1,image.getImageInfo().getRotationDegrees());
        BarcodeScannerOptions barcodeScannerOptions = new BarcodeScannerOptions.Builder()
                .setBarcodeFormats(Barcode.TYPE_DRIVER_LICENSE,Barcode.FORMAT_PDF417)
                .build();
        BarcodeScanner scanner = BarcodeScanning.getClient(barcodeScannerOptions);
        Task<List<Barcode>> result = scanner.process(inputImage);
               result .addOnSuccessListener(new OnSuccessListener<List<Barcode>>() {
                    @Override
                    public void onSuccess(List<Barcode> barcodes) {
                        Log.e("TAG","barcode size"+barcodes.size());
                        if(barcodes.size()>0)
                        {
                            readBarcodeData(barcodes);
                        }

                        // Task completed successfully
                        // ...
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.e("TAG","barcode exception"+e.getMessage());
                        // Task failed with an exception
                        // ...
                    }
                })
                .addOnCompleteListener(new OnCompleteListener<List<Barcode>>() {
                    @Override
                    public void onComplete(@NonNull Task<List<Barcode>> task) {
                        Log.e("TAG","barcode on Result"+task.getResult());
                        image.close();


                    }
                });
    }


    private void readBarcodeData(List<Barcode> barcodes) {
        Log.e("TAg","barcode size"+barcodes.size());
        String barcodeRowValues = null;
        for(Barcode barcode: barcodes)
        {
            barcodeRowValues = barcode.getRawValue().toString();
            Log.e("TAg","RAW value"+barcodeRowValues);
        }
        ArrayList<String> result = new ArrayList<>();
        String[] lines = barcodeRowValues.split("\\r?\\n");
        for (String line : lines) {
            if(!line.isEmpty()){
                result.add(line.trim());
            }

        }
        final String res = Arrays.toString(result.toArray());
        new BarcodeScanModule().onActivityResult(res);
        finish();



    }
    public void getBarcodeRowValues(String rawValues){
        ArrayList<String> result = new ArrayList<>();
        String lines[] = rawValues.split("\\r?\\n");
        for (int i = 0; i < lines.length; i++) {
            String str = lines[i];
            result.add(str.trim());
            if (str.contains("ANSI")) {
                str = str.substring(str.indexOf("DL"));
                String str1[] = str.split("DL");
                if (str1.length > 1) {
                    str = str1[str1.length - 1];
                }
            }
            if (str.length() > 3) {
                String key = str.substring(0, 3);
                String value = str.substring(3);
                if (allKeys.contains(key)) {
                    //allKeys.add();
                    if (!value.equalsIgnoreCase("None")) {
                        myData.put(allKeys.get(allKeys.indexOf(key)), value);

                    }
                }
            }
            Log.e("RESULT ", "<<>>" + lines[i]);

        }
        Log.d("TAG", "users family name: " + myData.get(Customer_Family_Name));



    }

    @Override
    public void onBackPressed() {
        Scanner.this.finish();
    }
}